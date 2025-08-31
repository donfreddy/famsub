import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ApiResponse, SwaggerApiResponse } from '../../common/decorators';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from './entities/user.entity';

@ApiTags('me')
@ApiSecurity('api-key')
@Controller({ path: 'me', version: '1' })
export class MeController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: '' })
  @ApiOperation({ summary: 'Retrieve the current user profile' })
  @Get()
  async profile(@GetUser() user: User) {
    return await this.userService.findProfile(user.id);
  }
}
