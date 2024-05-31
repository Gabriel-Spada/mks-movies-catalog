import {Injectable} from '@nestjs/common';
import {InjectRedis} from "@nestjs-modules/ioredis";
import Redis from "ioredis";
import {LoggerService} from "../../common/helpers/logger/logger.service";
import {CacheEventDto} from "../dto/cache-event.dto";
import {ErrorHandler} from "../../common/helpers/logger/error-handling";
import {OnEvent} from "@nestjs/event-emitter";

@Injectable()
export class CacheService {
    constructor(
        @InjectRedis()
        private readonly redis: Redis,
        private logger: LoggerService,
        private error: ErrorHandler,
    ) {

    }

    @OnEvent('handle-cache',{async:true})
    async handleCache(input: CacheEventDto) {
        try {
            switch(input.event){
                case 'read':
                    await this.redis.set(input.key, JSON.stringify(input.data));
                    break;
                case 'delete':
                    await this.redis.del(input.key);
                    break;
            }

            return input.data;
        } catch (e) {
            this.error.onError(e.status, e);
        }
    }



    async getCache(key: string) {
        try {
            const cache = await this.redis.get(key);

            if (cache)
                return JSON.parse(cache);
            return null;
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    async removeCache(key: string) {
        try {
            await this.redis.del(key);
            return;
        } catch (e) {
            this.logger.error(e);
            return
        }
    }


}
