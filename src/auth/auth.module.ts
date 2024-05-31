import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './guards/jwt.strategy';
import {AuthService} from './service/auth.service';
import {UserModule} from "../user/user.module";
import {AuthController} from "./controllers/auth.controller";


@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {expiresIn: '30d'}
            })
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {
}
