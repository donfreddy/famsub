import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ServiceService } from './service.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/create-service.dto';
import { ApiResponse, SwaggerApiResponse } from '../../common/decorators';
import { ProtectedRequest, Role } from '../../common/helpers';
import { Service } from './entities/service.entity';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CreatePlanDto, UpdatePlanDto } from './dto/create-plan.dto';
import { Plan } from './entities/plan.entity';
import { Faq } from './entities/faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';

@ApiTags('services')
@ApiSecurity('api-key')
@Roles(Role.SUPER_ADMIN, Role.ADMIN)
@Controller({ path: 'service', version: '1' })
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Create a new service', type: CreateServiceDto })
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Create a new service' })
  @Post()
  async create(@Request() request: ProtectedRequest, @Body() inputs: CreateServiceDto): Promise<Service> {
    return await this.serviceService.create(request.user, inputs);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Update a service', type: CreateServiceDto })
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Update a service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() inputs: UpdateServiceDto): Promise<Service> {
    return await this.serviceService.update(id, inputs);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Delete a service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<object> {
    await this.serviceService.remove(id);
    return { deleted: true };
  }

  //get all plans of a service
  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Get all plans of a service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @Get(':id/plans')
  async getPlans(@Param('id') serviceId: string): Promise<Plan[]> {
    return await this.serviceService.findPlansByServiceId(serviceId);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Add plan to service', type: CreatePlanDto })
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Add plan to service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @Post(':id/plan')
  async addPlan(@Param('id') id: string, @Body() inputs: CreatePlanDto): Promise<Plan> {
    return await this.serviceService.addPlan(id, inputs);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Update plan of service', type: UpdatePlanDto })
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Update plan of service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiParam({ name: 'planId', description: 'Plan ID' })
  @Put(':id/plan/:plan_id')
  async updatePlan(
    @Param('id') id: string,
    @Param('plan_id') planId: string,
    @Body() inputs: UpdatePlanDto,
  ): Promise<Plan> {
    return await this.serviceService.updatePlan(id, planId, inputs);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Delete plan of service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiParam({ name: 'plan_id', description: 'Plan ID' })
  @Delete(':id/plan/:plan_id')
  async deletePlan(@Param('id') id: string, @Param('plan_id') planId: string): Promise<object> {
    await this.serviceService.removePlan(id, planId);
    return { deleted: true };
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Add FAQ to service', type: CreateFaqDto })
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Add FAQ to service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @Post(':id/faq')
  async addFaq(@Param('id') id: string, @Body() inputs: CreateFaqDto): Promise<Faq> {
    return await this.serviceService.addFaq(id, inputs);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Update FAQ of service', type: CreateFaqDto })
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Update FAQ of service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiParam({ name: 'faq_id', description: 'FAQ ID' })
  @Put(':id/faq/:faq_id')
  async updateFaq(@Param('id') id: string, @Param('faq_id') faqId: string, @Body() inputs: CreateFaqDto): Promise<Faq> {
    return await this.serviceService.updateFaq(id, faqId, inputs);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Delete FAQ of service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiParam({ name: 'faq_id', description: 'FAQ ID' })
  @Delete(':id/faq/:faq_id')
  async deleteFaq(@Param('id') id: string, @Param('faq_id') faqId: string): Promise<object> {
    await this.serviceService.removeFaq(id, faqId);
    return { deleted: true };
  }
}
