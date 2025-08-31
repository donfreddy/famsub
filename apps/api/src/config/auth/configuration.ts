import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  key: {
    publicKeyPath: process.env.AUTH_PUBLIC_KEY_PATH,
    privateKeyPath: process.env.AUTH_PRIVATE_KEY_PATH,
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
  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
  },
}));
