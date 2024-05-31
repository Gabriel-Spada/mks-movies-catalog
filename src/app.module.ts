import {Module} from '@nestjs/common';
import {AppController} from "./default/controllers/app.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {ConfigModule} from "@nestjs/config";
import {LoggerModule} from "./common/helpers/logger/logger.module";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from './user/user.module';
import {AutomapperModule} from "@automapper/nestjs";
import {classes} from "@automapper/classes";
import {MoviesModule} from './movies/movies.module';
import {RedisModule} from "@nestjs-modules/ioredis";
import {CacheModuleClass} from "./cache/cache.module";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AutomapperModule.forRoot({
            strategyInitializer: classes()
        }),
        RedisModule.forRootAsync({
            useFactory: () => ({
                type: 'single',
                url: process.env.REDIS_URL,
                options: {
                    password: process.env.REDIS_PASSWORD,
                },
                ttl: 300,
                reconnectOnError: false,
                retryStrategy: false
            }),
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: false,
            // logger: 'file',
            retryAttempts: 1,
            retryDelay: 5000,
            timezone: 'Z'
        }),
        EventEmitterModule.forRoot({
            ignoreErrors: true,
            maxListeners: 15,
            wildcard: true
        }),
        AuthModule,
        UserModule,
        LoggerModule,
        MoviesModule,
        CacheModuleClass],
    controllers: [AppController],

})
export class AppModule {
}
