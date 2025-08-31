import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const parser = new UAParser(req.headers['user-agent']);
    req['deviceInfo'] = {
      browser: `${parser.getBrowser().name} on ${parser.getOS().name}`,
      device: parser.getDevice().model,
    };
    next();
  }
}
