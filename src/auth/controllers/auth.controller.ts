import {Body, Controller, Post} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthService} from "../service/auth.service";
import {LoggerService} from "../../common/helpers/logger/logger.service";
import {ErrorHandler} from "@nestjs/common/interfaces";
import {AuthType} from "../dto/auth.type";
import {AuthInput} from "../dto/auth.input";

@ApiTags('Auth')
@Controller({
    version: '1',
    path: 'auth'
})
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {
    }



    @Post('login')
    @ApiOperation({ description: 'Login user' })
    @ApiOkResponse({
        description: 'Login efetuado com sucesso!',
        type: AuthType
    })
    async login(@Body() data: AuthInput): Promise<AuthType> {
        return this.authService.validateUser(data);
    }
}
