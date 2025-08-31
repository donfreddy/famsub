import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { resolve } from 'path';
import { AppConfigService } from '../../config';

@Injectable()
export class WinstonLogger implements LoggerService {
  private readonly logger: winston.Logger;

  constructor(private readonly appConfig: AppConfigService) {
    const logsPath = resolve(__dirname, '../..', appConfig.logDirectory);
    const logLevel = appConfig.env === 'dev' ? 'warn' : 'error';

    const dailyRotateFile = new DailyRotateFile({
      level: logLevel,
      dirname: logsPath,
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      handleExceptions: true,
      maxSize: '20m',
      maxFiles: '14d',
    });

    this.logger = winston.createLogger({
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.prettyPrint(),
      ),
      transports: [
        new winston.transports.Console({
          level: logLevel,
          format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.prettyPrint()),
        }),
        dailyRotateFile,
      ],
      exitOnError: false, // do not exit on handled exceptions
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    if (trace) {
      this.logger.error(`${message}\n${trace}`, trace);
    } else {
      this.logger.error(message);
    }
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
