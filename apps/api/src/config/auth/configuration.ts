import { registerAs } from '@nestjs/config';
import process from 'node:process';
import { join } from 'path';

export default registerAs('auth', () => {
  const resolveKeyPath = (filename: string): string => {
    if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
      if (filename === 'public.pem' && process.env.AUTH_PUBLIC_KEY_PATH) {
        return process.env.AUTH_PUBLIC_KEY_PATH;
      }
      if (filename === 'private.pem' && process.env.AUTH_PRIVATE_KEY_PATH) {
        return process.env.AUTH_PRIVATE_KEY_PATH;
      }
      // Fallback: utiliser le dossier /app/keys monté par Docker
      return `/app/keys/${filename}`;
    }
    return join(process.cwd(), 'keys', filename);
  };

  return {
    key: {
      publicKeyPath: resolveKeyPath('public.pem'),
      privateKeyPath: resolveKeyPath('private.pem'),
    },
    token: {
      accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC),
      refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC),
      issuer: process.env.TOKEN_ISSUER || '1d',
      audience: process.env.TOKEN_AUDIENCE || '1d',
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  };
});
