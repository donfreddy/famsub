import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ApiResponse, GetRoute, GetUser, SwaggerApiPagedResponse, SwaggerApiResponse } from '../../common/decorators';
import { User } from './entities/user.entity';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../../common/constants';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Role, UserStatus } from '../../common/helpers';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { FindOptionsWhere } from 'typeorm';

@ApiTags('users')
@ApiSecurity('api-key')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly userService: UserService) {}

  //@Roles(RoleCode.ADMIN, RoleCode.SUPER_ADMIN)
  @ApiBearerAuth()
  @SwaggerApiResponse()
  @SwaggerApiPagedResponse()
  @ApiResponse({ key: '' })
  @ApiOperation({ summary: 'Returns all users' })
  @ApiQuery({ name: 'role', enum: Role, required: false })
  @ApiQuery({ name: 'status', enum: UserStatus, required: false })
  @Get()
  async findAll(
    @GetRoute() route: string,
    @Query('page', new DefaultValuePipe(DEFAULT_PAGE), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(DEFAULT_LIMIT), ParseIntPipe) limit: number,
    @Query() filter: FindUsersQueryDto,
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;

    if (filter.status) {
      const queryParams = [];
      if (filter.role) queryParams.push(`role=${filter.role}`);
      if (filter.status) queryParams.push(`status=${filter.status}`);
      route = `${route}?${queryParams.join('&')}`;
    }

    const where: FindOptionsWhere<User> = {};
    if (filter.role) where.role = filter.role;
    if (filter.status) where.status = filter.status;

    return this.userService.findAll({ page, limit, route }, where);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: '' })
  @ApiOperation({ summary: 'Validate pin code for a user' })
  @ApiQuery({ name: 'pin_code', description: 'Pin code for validation' })
  @Post('pin_codes/validation')
  async validatePinCode(@GetUser() user: User, @Query('pin_code') pinCode: string) {
    // return await this.userService.findProfile(userId);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiOperation({ summary: 'Get a single user by ID' })
  @ApiParam({ name: 'user_id', description: 'ID of the user' })
  @ApiResponse({ key: '' })
  @Get(':user_id')
  async findOne(@Param('user_id', ParseIntPipe) userId: number) {
    return await this.userService.findProfile(userId);
  }
}
