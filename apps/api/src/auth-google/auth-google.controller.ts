import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthGoogleService } from './auth-google.service';
import { AuthService } from '../auth/auth.service';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';
import { Public } from '../auth/decorators/public.decorator';
import { ApiResponse, SwaggerApiResponse } from '../common/decorators';
import { ApiBody, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserAuthDto } from '../auth/dto/user-auth.dto';
import { AuthProvider, PublicRequest } from '../common/helpers';

@ApiTags('auth')
@ApiSecurity('api-key')
@Controller('auth/google')
export class AuthGoogleController {
  constructor(
    private readonly authService: AuthService,
    private readonly authGoogleService: AuthGoogleService,
  ) {}

  @Public()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Login a user with google', type: AuthGoogleLoginDto })
  @ApiResponse({ key: 'auth.success.login' }, HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in a user with google' })
  @Post('login')
  async login(@Req() req: PublicRequest, @Body() inputs: AuthGoogleLoginDto): Promise<UserAuthDto> {
    const socialData = await this.authGoogleService.getProfileByToken(inputs);
    const deviceInfo = await this.authService.extractDeviceInfo(req);

    const { user, tokens } = await this.authService.validateSocialLogin(AuthProvider.GOOGLE, socialData, deviceInfo);
    return new UserAuthDto(user, tokens);
  }
}
