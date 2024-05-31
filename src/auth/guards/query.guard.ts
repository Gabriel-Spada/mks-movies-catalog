import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../../user/services/user.service";

@Injectable()
export class QueryTokenGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
                private userService: UserService,
    ) {
    }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.query.token as string;

        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.userService.findOne(decoded.id );
            request.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Unauthorized');
        }
    }
}