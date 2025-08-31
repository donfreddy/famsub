import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_NODE_ENV || 'dev',
  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
  http: {
    host: process.env.APP_HOST || 'localhost',
    port: parseInt(process.env.APP_PORT || '3000', 10),
  },
  debug: process.env.APP_DEBUG === 'true',
  name: process.env.APP_NAME || 'Jointly',
  logDirectory: process.env.APP_LOG_DIR,
  //url: process.env.APP_URL,
  timeZone: process.env.APP_TZ,
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
}));
