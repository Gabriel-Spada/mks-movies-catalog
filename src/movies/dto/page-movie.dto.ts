import {BasePagination} from "../../common/pagination.object";
import {Movie} from "../entities/movie.entity";
import {ApiProperty} from "@nestjs/swagger";

export class PageMovie extends BasePagination {
    @ApiProperty({
        description:"Movies list",
        example: [Movie],
    })
    results: Movie[];
}