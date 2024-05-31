import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { format, transports } from 'winston';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    let transp: Array<any> = []
    transp.push(new transports.Console())


    this.logger = winston.createLogger({
      level: 'info',
      format: format.json(),
      transports: transp,
    });
  }

  log(message: string | any) {
    if (typeof message == 'object')
      message = JSON.stringify(message);

    this.logger.log('info', message);
  }

  error(trace: string | Record<string, any>) {
    // if (typeof trace != "string")
    //   trace = trace.message;

    this.logger.error(trace);
  }
}
