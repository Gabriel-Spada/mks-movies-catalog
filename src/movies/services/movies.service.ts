import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateMovieDto} from "../dto/create-movie.dto";
import {UpdateMovieDto} from "../dto/update-movie.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Movie} from "../entities/movie.entity";
import {Not, Repository} from "typeorm";
import {LoggerService} from "../../common/helpers/logger/logger.service";
import {ErrorHandler} from "../../common/helpers/logger/error-handling";
import {PageMovieInput} from "../dto/page-movie.input";
import {DefaultMessage} from "../../common/default-message";
import {EventEmitter2} from "@nestjs/event-emitter";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private repository: Repository<Movie>,
        private logger: LoggerService,
        private error: ErrorHandler,
        private eventEmitter: EventEmitter2,
    ) {
    }

    async create(data: CreateMovieDto) {
        try {
            const validate = await this.repository.findOne({name: data.name});
            if (validate) {
                throw new BadRequestException('Já existe um filme cadastrado com o mesmo nome.');
            }

            const entity = this.repository.create(data);
            const save = await this.repository.save(entity);
            if (!save) {
                throw new BadRequestException('Ocorreu um erro ao criar o filme.');
            }

            return this.findOne(save.id);
        } catch (e) {
            this.error.onError(e.status, e.message);
        }
    }

    async findAll() {
        try {
            return await this.repository.find();

        } catch (e) {
            this.error.onError(e.status, e.message);
        }
    }

    async findOne(id: string) {
        try {
            const entity = await this.repository.findOne(id);
            if (!entity) {
                throw new BadRequestException('Filme não encontrado.');
            }
            this.eventEmitter.emit('handle-cache', {key: `movie-${entity.id}`, data: entity, event: 'read'});

            return entity;
        } catch (e) {
            this.error.onError(e.status, e.message);
        }
    }

    

    async update(id: string, data: UpdateMovieDto) {
        try {
            const entity = await this.findOne(id);
            const validate = await this.repository.findOne({name: data.name, id: Not(entity.id)});
            if (validate) {
                throw new BadRequestException('Já existe um filme cadastrado com o mesmo nome.');
            }

            await this.repository.save({...entity, ...data});

            return this.findOne(id);
        } catch (e) {
            this.error.onError(e.status, e.message);
        }
    }

    async remove(id: string) {
        try {
            const entity = await this.findOne(id);
            const result = await this.repository.softDelete(id);
            this.eventEmitter.emit('handle-cache', {key: `movie-${entity.id}`, data: result, event: 'delete'});

            return new DefaultMessage(200, 'Filme removido com sucesso.');
        } catch (e) {
            this.error.onError(e.status, e.message);
        }
    }

    async page(data: PageMovieInput) {
        try {
            const query = this.repository.createQueryBuilder('movies')
                //Só quem sabe, sabe essa aq
                .where('movies.deletedAt IS NULL');

            if (data.name) {
                query.andWhere(`movies.name ILIKE '%${data.name}%'`);
            }

            if (data.directorName)
                query.andWhere(`movies.director ILIKE '%${data.directorName}%'`);

            if (data.minYear)
                query.andWhere(`movies.year >= ${data.minYear}`);

            if (data.maxYear)
                query.andWhere(`movies.year <= ${data.maxYear}`);

            if (data.minScore)
                query.andWhere(`movies.imdbScore >= ${data.minScore}`);

            if (data.maxScore)
                query.andWhere(`movies.imdbScore <= ${data.maxScore}`);

            const currentPage = data.page;

            const totalCount = await query.getCount();
            const pageSize = data.size;
            const totalPage = totalCount > 0 ? Math.ceil(totalCount / pageSize) : 0;
            const previousPage = data.page > 0 ? true : false;
            const nextPage = currentPage < totalPage ? true : false;

            const result = await query
                .skip((data.page - 1) * pageSize)
                .take(pageSize)
                .getMany();

            return {
                size: pageSize,
                current: currentPage,
                pages: totalPage,
                previous: previousPage,
                next: nextPage,
                total: totalCount,
                results: result
            };


        } catch (e) {
            this.error.onError(e.status, e.message);
        }
    }
}
