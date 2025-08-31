import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { AuthConfigService } from '../../config';

@Injectable()
export class TokenFactory implements JwtOptionsFactory {
  constructor(private readonly authConfig: AuthConfigService) {}

  async createJwtOptions(): Promise<JwtModuleOptions> {
    const publicKey = await readFile(join(__dirname, '../../../', this.authConfig.publicKeyPath), 'utf8');
    const privateKey = await readFile(join(__dirname, '../../../', this.authConfig.privateKeyPath), 'utf8');

    return {
      publicKey,
      privateKey,
      signOptions: {
        algorithm: 'RS256',
      },
    };
  }
}
