import {HttpException, Injectable} from "@nestjs/common";
import {LoggerService} from "src/common/helpers/logger/logger.service";

@Injectable()
export class ErrorHandler {
    constructor(
        private loggerService: LoggerService
    ) {
    }

    onError(status: number, trace: string | Record<string, any>) {
        this.loggerService.error(trace['response']?.data ?? trace);

        throw new HttpException(trace, 400, {cause: new Error()});
    }

}