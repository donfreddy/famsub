import { join } from 'path';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';

/**
 * Generates a new feature module with the given template name.
 *
 * @param {string} featureTemplate - The name of the feature template.
 */
async function generateFeature(featureTemplate: string) {
  if (!featureTemplate || typeof featureTemplate !== 'string') {
    console.log('feature name should be non empty string');
    return;
  }

  // Check if feature name is in kebab case
  if (!/^[a-z]+(-[a-z]+)*$/.test(featureTemplate)) {
    console.log('feature name should be in kebab case, e.g. feature-name');
    return;
  }

  const featureName = featureTemplate.toLowerCase();
  const featureDir = join(__dirname, '../src/models', featureName);
  if (existsSync(featureDir)) {
    console.log(featureName, 'already exists');
    return;
  }

  await mkdir(featureDir);
  await Promise.all([
    generateDto(featureDir, featureName),
    generateEntities(featureDir, featureName),
    generateService(featureDir, featureName),
    generateController(featureDir, featureName),
    generateModule(featureDir, featureName),
  ]);
}

/**
 * Generates a module file for the feature.
 *
 * @param {string} featureDir - The directory of the feature.
 * @param {string} featureName - The name of the feature.
 */
async function generateModule(featureDir: string, featureName: string) {
  const featureCaps = toPascalCase(featureName);
  const modulePath = join(featureDir, `${featureName}.module.ts`);

  const template = `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${featureCaps}} from './entities/${featureName}.entity';
import { ${featureCaps}Controller } from './${featureName}.controller';
import { ${featureCaps}Service } from './${featureName}.service';

@Module({
  imports: [TypeOrmModule.forFeature([${featureCaps}])],
  controllers: [${featureCaps}Controller],
  providers: [${featureCaps}Service],
  exports: [${featureCaps}Service],
})
export class ${featureCaps}Module {}
`;

  await writeFile(modulePath, template);
}

/**
 * Generates a service file for the feature.
 *
 * @param {string} featureDir - The directory of the feature.
 * @param {string} featureName - The name of the feature.
 */
async function generateService(featureDir: string, featureName: string) {
  const featureCaps = toPascalCase(featureName);
  const featureNameVar = toPascalCase(featureName, false);
  const servicePath = join(featureDir, `${featureName}.service.ts`);

  const template = `import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ${featureCaps} } from './entities/${featureName}.entity';
import { Create${featureCaps}Dto } from './dto/create-${featureName}.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ${featureCaps}Service {
  private ${featureNameVar}Repository: Repository<${featureCaps}>;

  constructor(private dataSource: DataSource) {
    this.${featureNameVar}Repository = this.dataSource.getRepository(${featureCaps});
  }

  async create(user: User, inputs: Create${featureCaps}Dto): Promise<${featureCaps}> {
    return await this.${featureNameVar}Repository.save({inputs, user: user});
  }
}
`;

  await writeFile(servicePath, template);
}

/**
 * Generates a controller file for the feature.
 *
 * @param {string} featureDir - The directory of the feature.
 * @param {string} featureName - The name of the feature.
 */
async function generateController(featureDir: string, featureName: string) {
  const featureCaps = toPascalCase(featureName);
  const featureNameVar = toPascalCase(featureName, false);
  const controllerPath = join(featureDir, `${featureName}.controller.ts`);

  const template = `import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { ${featureCaps}Service } from './${featureName}.service';
import { Create${featureCaps}Dto } from './dto/create-${featureName}.dto';
import { ApiResponse, SwaggerApiResponse } from '../../common/decorators';
import { ProtectedRequest } from '../../common/helpers';
import { ${featureCaps} } from './entities/${featureName}.entity';

@ApiSecurity('api-key')
@Controller('${featureName}')
export class ${featureCaps}Controller {
  constructor(private readonly ${featureNameVar}Service: ${featureCaps}Service) {}

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Create a new ${featureName}', type: Create${featureCaps}Dto })
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Create a new ${featureName}' })
  @Post()
  async create(
    @Request() request: ProtectedRequest,
    @Body() inputs: Create${featureCaps}Dto,
  ): Promise<${featureCaps}> {
    return await this.${featureNameVar}Service.create(request.user, inputs);
  }
}
`;

  await writeFile(controllerPath, template);
}

/**
 * Generates entity files for the feature.
 *
 * @param {string} featureDir - The directory of the feature.
 * @param {string} featureName - The name of the feature.
 */
async function generateEntities(featureDir: string, featureName: string) {
  const schemasDirPath = join(featureDir, 'entities');
  await mkdir(schemasDirPath);

  const featureCaps = toPascalCase(featureName);
  const schemaPath = join(featureDir, `entities/${featureName}.entity.ts`);

  const template = `import { Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({ name: '${featureName}s' })
export class ${featureCaps} {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne((): typeof User  => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ default: true })
  status: boolean;
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
`;

  await writeFile(schemaPath, template);
}

/**
 * Generates DTO files for the feature.
 *
 * @param {string} featureDir - The directory of the feature.
 * @param {string} featureName - The name of the feature.
 */
async function generateDto(featureDir: string, featureName: string) {
  const dtoDirPath = join(featureDir, 'dto');
  await mkdir(dtoDirPath);

  const featureCaps = toPascalCase(featureName);
  const dtoPath = join(featureDir, `dto/create-${featureName}.dto.ts`);

  const template = `import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Create${featureCaps}Dto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'property1 example' })
  readonly property1: string;

  @IsNotEmpty()
  @MaxLength(1000)
  @ApiProperty({ type: 'string', example: 'property2 example' })
  readonly property2: string;
}
`;

  await writeFile(dtoPath, template);
}

/**
 * Converts a string to Pascal case.
 *
 * @param {string} str - The string to convert.
 * @param {boolean} capitalizeFirst - Whether to capitalize the first letter.
 * @returns {string} - The Pascal case string.
 */
function toPascalCase(str: string, capitalizeFirst: boolean = true): string {
  const text = str.replace(/(^\w|-\w)/g, (match) => match.replace(/-/, '').toUpperCase()).replace(/-/g, '');
  return capitalizeFirst ? text : text.charAt(0).toLowerCase() + text.slice(1);
}

/**
 * Main function to generate a feature module.
 */
async function main(): Promise<void> {
  const featureName = process.argv[2];
  await generateFeature(featureName);
}

void main();
