import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthFacebookService } from './auth-facebook.service';
import { ApiBody, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { ApiResponse, SwaggerApiResponse } from '../common/decorators';
import { Public } from '../auth/decorators/public.decorator';
import { AuthProvider, PublicRequest } from '../common/helpers';
import { UserAuthDto } from '../auth/dto/user-auth.dto';
import { AuthFacebookLoginDto } from './dto/auth-facebook-login.dto';

@ApiTags('auth')
@ApiSecurity('api-key')
@Controller('auth/facebook')
export class AuthFacebookController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFacebookService: AuthFacebookService,
  ) {}

  @Public()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Login a user with facebook', type: AuthFacebookLoginDto })
  @ApiResponse({ key: 'auth.success.login' }, HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in a user with facebook' })
  @Post('login')
  async login(@Req() req: PublicRequest, @Body() inputs: AuthFacebookLoginDto): Promise<UserAuthDto> {
    const socialData = await this.authFacebookService.getProfileByToken(inputs);
    const deviceInfo = await this.authService.extractDeviceInfo(req);

    const { user, tokens } = await this.authService.validateSocialLogin(AuthProvider.FACEBOOK, socialData, deviceInfo);
    return new UserAuthDto(user, tokens);
  }
}
