import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ErrorHandler } from './error-handling';

@Global()
@Module({
  providers: [LoggerService,ErrorHandler],
  exports: [LoggerService,ErrorHandler],
})
export class LoggerModule {}
