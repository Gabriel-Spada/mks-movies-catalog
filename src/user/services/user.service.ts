import {Injectable} from '@nestjs/common';
import {CreateUserDto} from "../dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../entities/user.entity";
import {LoggerService} from "../../common/helpers/logger/logger.service";
import {ErrorHandler} from "../../common/helpers/logger/error-handling";
import {SimpleUser} from "../dto/simplified-user.dto";
import {DefaultMessage} from "../../common/default-message";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
        private logger: LoggerService,
        private error: ErrorHandler
    ) {
    }

    async create(data: CreateUserDto) {
        try {
            const userExists = await this.repository.findOne({where: {email: data.email}});
            if (userExists) {
                throw new Error('O email já está em uso');
            }
            const entity = this.repository.create(data);
            if (!entity) {
                throw new Error('Ocorreu um erro inesperado!');
            }
            const user = await this.repository.save(entity);

            //Considerando implementar o automapper para resolver esse problema (saudade do graphql)
            const {password, ...userWithoutPassword} = user;
            return userWithoutPassword as SimpleUser;
        } catch (e) {
            this.error.onError(e.status, e.message);
        }
    }

    async findOne(id: string) {
        try {
            const entity = await this.repository.findOne({where: {id}});

            if (!entity) {
                throw new Error('Usuário não encontrado');
            }

            return entity;

        } catch (e) {
            this.error.onError(e.status, e.message);
        }
    }

    async remove(id: string) {
        try {
            const entity = await this.findOne(id);
            await this.repository.softDelete(id);
            return new DefaultMessage(200, 'Usuário excluído com sucesso!')
        } catch (e) {
            this.error.onError(e.status, e.message);
        }
    }

    async findByEmail(email: string) {
        try {
            const entity = await this.repository.findOne({where: {email: email}});

            if (!entity) {
                throw new Error('Usuário não encontrado');
            }

            return entity;

        } catch (e) {
            this.error.onError(e.status, e.message);
        }
    }
}
