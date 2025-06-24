import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || 'No user agent provided';
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const duration = Date.now() - start;

      let statusCodeColor: string;
      if (statusCode >= 200 && statusCode < 300) {
        statusCodeColor = '\x1b[32m';
      } else if (statusCode >= 400 && statusCode < 500) {
        statusCodeColor = '\x1b[33m';
      } else {
        statusCodeColor = '\x1b[31m';
      }

      let callTypeColor: string;
      if (method === 'GET') {
        callTypeColor = '\u001b[38;5;99m';
      } else if (method === 'POST') {
        callTypeColor = '\x1b[34m';
      } else if (method === 'PATCH') {
        callTypeColor = '\u001b[38;5;220m';
      } else if (method === 'DELETE') {
        callTypeColor = '\x1b[31m';
      } else {
        callTypeColor = '\x1b[37m';
      }

      let contentLengthColor: string;
      if (Number(contentLength) >= 1000000) {
        contentLengthColor = '\x1b[31m';
      } else if (
        Number(contentLength) >= 100000 &&
        Number(contentLength) < 1000000
      ) {
        contentLengthColor = '\x1b[33m';
      } else {
        contentLengthColor = '\x1b[32m';
      }

      this.logger.log(
        `${callTypeColor}${method}\x1b[0m | ${originalUrl} | ${statusCodeColor}${statusCode}\x1b[0m | ${contentLengthColor}${contentLength} bytes\x1b[0m | ${ip} | ${userAgent} | \x1b[33m+${duration}ms`,
      );
    });

    next();
  }
}
