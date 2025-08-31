import { Injectable, NestInterceptor, ExecutionContext, CallHandler, mixin, Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, IMessage } from '../interfaces';
import { I18nService } from 'nestjs-i18n';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { StatusCode } from '../helpers';

type InterceptApiResponse<T> = NestInterceptor<T, ApiResponse<T>>;

export function ApiResponseInterceptor<T>(msg: IMessage): Type<InterceptApiResponse<T>> {
  @Injectable()
  class ApiResponseInterceptorMixin implements InterceptApiResponse<T> {
    constructor(private readonly i18n: I18nService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<ApiResponse<T>>> {
      const ctx: HttpArgumentsHost = context.switchToHttp();
      const lang = ctx.getRequest().i18nLang as string;
      const message = await this.i18n.t(msg.key || 'response.success', { lang, args: msg.args });

      return next.handle().pipe(
        map((data: T) => ({
          status_code: StatusCode.SUCCESS,
          message,
          data: this.convertToSnakeCase(this.translateFields(data, lang)),
        })),
      );
    }

    // This method translates the fields of the data object based on the provided language.
    private translateFields(data: any, lang: string): any {
      if (data instanceof Date) {
        return data;
      }
      if (Array.isArray(data)) {
        return data.map((item) => this.translateFields(item, lang));
      } else if (data !== null && typeof data === 'object') {
        const result = {};
        for (const key of Object.keys(data)) {
          const value = data[key];

          // If value is an object with language keys (fr, en, etc.), we extract the correct one.
          if (
            value &&
            typeof value === 'object' &&
            !Array.isArray(value) &&
            !(value instanceof Date) &&
            Object.keys(value).some((k) => ['fr', 'en'].includes(k))
          ) {
            result[key] = value[lang] || value['en'];
          } else {
            result[key] = this.translateFields(value, lang);
          }
        }
        return result;
      }
      return data;
    }

    // This method converts the keys of the data object to snake_case.
    private convertToSnakeCase(data: any): any {
      if (data instanceof Date) {
        return data.toISOString().split('T')[0]; // Formats the date in the format `YYYY-MM-DD`
      }
      if (Array.isArray(data)) {
        return data.map((item) => this.convertToSnakeCase(item));
      } else if (data !== null && typeof data === 'object') {
        const result = {};
        for (const key of Object.keys(data)) {
          if (['password', 'pin_code'].includes(key)) continue; // Excludes sensitive fields

          const snakeKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
          result[snakeKey] = this.convertToSnakeCase(data[key]);
        }
        return result;
      }
      return data;
    }
  }

  return mixin(ApiResponseInterceptorMixin);
}
