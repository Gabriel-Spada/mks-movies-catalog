import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsPositive, Max, Min} from "class-validator";
import {BasePaginationInput} from "../../common/pagination.object";

export class PageMovieInput extends BasePaginationInput {

    @ApiProperty({
        description: "Search by movie name",
        example: "Lord of the Rings"
    })
    @IsOptional()
    name?: string;

    @ApiProperty({
        description: "Minimum IMDb score filter",
        example: null
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    minScore?: number;

    @ApiProperty({
        description: "Maximum IMDb score filter",
        example: null
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    maxScore?: number;

    @ApiProperty({
        description: "Minimum release year filter",
        example: null
    })
    @IsOptional()
    @IsNumber()
    minYear?: number;

    @ApiProperty({
        description: "Maximum release year filter",
        example: null
    })
    @IsOptional()
    @IsNumber()
    maxYear?: number;

    @ApiProperty({
        description: "Search by director name",
        example: null
    })
    @IsOptional()
    directorName?: string;
}