import { Injectable, BadRequestException } from '@nestjs/common';
import { SelectQueryBuilder, SortDirection } from 'typeorm';

// Define filter operators
export enum FilterOperator {
  EQUALS = 'eq',
  NOT_EQUALS = 'ne',
  GREATER_THAN = 'gt',
  GREATER_THAN_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_EQUALS = 'lte',
  LIKE = 'like',
  IN = 'in',
}

export interface FilterCondition {
  field: string;
  operator: FilterOperator;
  value: any;
}

export interface SortOptions {
  field: string;
  direction: SortDirection;
}

@Injectable()
export class FilterService {
  /**
   * Parse filter string into a filter condition object
   * @param filterString Format: field:operator:value or field:value
   */
  parseFilter(filterString: string): FilterCondition | null {
    if (!filterString) return null;

    const parts = filterString.split(':');

    // Handle different filter formats
    if (parts.length === 2) {
      // Simple format: field:value (assumes equals operator)
      return {
        field: parts[0],
        operator: FilterOperator.EQUALS,
        value: this.parseValue(parts[1]),
      };
    } else if (parts.length === 3) {
      // Advanced format: field:operator:value
      const operator = this.validateOperator(parts[1]);
      if (!operator) return null;

      return {
        field: parts[0],
        operator,
        value: this.parseValue(parts[2]),
      };
    }

    return null;
  }

  /**
   * Apply filter condition to a TypeORM query builder
   * @param queryBuilder TypeORM query builder
   * @param filter Filter condition
   */
  applyFilterToQuery<T>(queryBuilder: SelectQueryBuilder<T>, filter: FilterCondition): SelectQueryBuilder<T> {
    const { field, operator, value } = filter;

    // Determine the proper field reference (support for relations)
    const fieldPath = this.getFieldPath(queryBuilder, field);

    switch (operator) {
      case FilterOperator.EQUALS:
        return queryBuilder.andWhere(`${fieldPath} = :value`, { value });
      case FilterOperator.NOT_EQUALS:
        return queryBuilder.andWhere(`${fieldPath} != :value`, { value });
      case FilterOperator.GREATER_THAN:
        return queryBuilder.andWhere(`${fieldPath} > :value`, { value });
      case FilterOperator.GREATER_THAN_EQUALS:
        return queryBuilder.andWhere(`${fieldPath} >= :value`, { value });
      case FilterOperator.LESS_THAN:
        return queryBuilder.andWhere(`${fieldPath} < :value`, { value });
      case FilterOperator.LESS_THAN_EQUALS:
        return queryBuilder.andWhere(`${fieldPath} <= :value`, { value });
      case FilterOperator.LIKE:
        return queryBuilder.andWhere(`${fieldPath} LIKE :value`, { value: `%${value}%` });
      case FilterOperator.IN:
        const values = value.split(',');
        return queryBuilder.andWhere(`${fieldPath} IN (:...values)`, { values });
      default:
        return queryBuilder;
    }
  }

  /**
   * Apply sorting to a TypeORM query builder
   * @param queryBuilder TypeORM query builder
   * @param sortOptions Sort options (field and direction)
   */
  applySortingToQuery<T>(queryBuilder: SelectQueryBuilder<T>, sortOptions: SortOptions): SelectQueryBuilder<T> {
    if (!sortOptions || !sortOptions.field) {
      return queryBuilder;
    }

    const { field, direction } = sortOptions;

    // Determine the proper field reference (support for relations)
    const fieldPath = this.getFieldPath(queryBuilder, field);

    // Apply the order by clause
    return queryBuilder.orderBy(fieldPath);
  }

  /**
   * Get the proper field path for query builder (supporting relations)
   * @param queryBuilder The TypeORM query builder
   * @param field The field name, possibly with dot notation for relations
   */
  private getFieldPath<T>(queryBuilder: SelectQueryBuilder<T>, field: string): string {
    // Check if the field column exists in the entity
    const entityMetadata = queryBuilder.connection.getMetadata(queryBuilder.expressionMap.mainAlias?.target);
    const column = entityMetadata?.columns.find((col) => col.propertyName === field);
    if (!column) {
      throw new BadRequestException(`Field '${field}' does not exist in the entity`);
    }

    if (field.includes('.')) {
      // Handle relation field (e.g., 'user.name')
      return field;
    }

    // Get the main alias from the query builder
    const mainAlias = queryBuilder.expressionMap.mainAlias?.name;

    if (!mainAlias) {
      throw new BadRequestException('Query builder has no main alias');
    }

    return `${mainAlias}.${field}`;
  }

  /**
   * Parse value string to appropriate type
   */
  private parseValue(value: string): any {
    // Try to parse as a number
    const num = Number(value);
    if (!isNaN(num)) return num;

    // Check for boolean
    if (value === 'true') return true;
    if (value === 'false') return false;

    // Return as string by default
    return value;
  }

  /**
   * Validate operator string
   */
  private validateOperator(operator: string): FilterOperator | null {
    const operators = Object.values(FilterOperator);
    const normalizedOperator = operator.toLowerCase();

    if (operators.includes(normalizedOperator as FilterOperator)) {
      return normalizedOperator as FilterOperator;
    }

    return null;
  }
}
