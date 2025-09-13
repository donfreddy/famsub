import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { readFile } from 'fs/promises';
import { AuthConfigService } from '../../config';

@Injectable()
export class TokenFactory implements JwtOptionsFactory {
  constructor(private readonly authConfig: AuthConfigService) {}

  async createJwtOptions(): Promise<JwtModuleOptions> {
    try {
      const publicKey = await readFile(this.authConfig.publicKeyPath, 'utf8');
      const privateKey = await readFile(this.authConfig.privateKeyPath, 'utf8');

      console.log('✅ JWT keys loaded successfully');

      return {
        publicKey,
        privateKey,
        signOptions: {
          algorithm: 'RS256',
        },
      };
    } catch (error) {
      console.error('❌ Error loading JWT keys:', error);
      console.log('🔍 Attempted paths:');
      console.log('- Public key:', this.authConfig.publicKeyPath);
      console.log('- Private key:', this.authConfig.privateKeyPath);

      throw new Error(`Failed to load JWT keys: ${error.message}`);
    }
  }
}
