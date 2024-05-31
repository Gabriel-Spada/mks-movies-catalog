import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {compareSync} from 'bcrypt';

import {AuthInput} from '../dto/auth.input';
import {AuthType} from '../dto/auth.type';
import {UserService} from "../../user/services/user.service";
import {User} from "../../user/entities/user.entity";
import {SimpleUser} from "../../user/dto/simplified-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {
    }

    async validateUser(data: AuthInput): Promise<AuthType> {
        let user = await this.userService.findByEmail(data.email);

        const validPassword = compareSync(data.password, user.password);

        if (!validPassword) {
            throw new BadRequestException('Usuário ou senha inválida.');
        }

        const token = await this.jwtToken(user);
        let {password, ...simpleUser} = user;

        return {
            user: simpleUser,
            token
        };
    }

    private async jwtToken(user: User): Promise<string> {
        const payload = {
            name: user.name,
            id: user.id,
        };
        return this.jwtService.signAsync(payload);
    }
}
