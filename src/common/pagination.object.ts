import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsPositive} from "class-validator";


export class BasePagination {

    @ApiProperty({
        description: "Total results",
        example: 120
    })
    total: Number;


    @ApiProperty({
        description: "Results per page",
        example: 10
    })
    size: Number;


    @ApiProperty({
        description: "Current page",
        example: 2
    })
    current: Number;


    @ApiProperty({
        description: "Total pages",
        example: 12
    })
    pages: Number;


    @ApiProperty({
        description: "Previous page",
        example: true
    })
    previous: boolean;


    @ApiProperty({
        description: "Next page",
        example: true
    })
    next: boolean;
}


export class BasePaginationInput {
    @ApiProperty({
        description: "Page number",
        example: 1,
        default: 1
    })
    @IsOptional()
    @IsNumber()
    @IsPositive({message: "A página deve ser maior que zero."})
    page?: number;

    @ApiProperty({
        description: "Page number",
        example: 10,
        default: 10
    })
    @IsOptional()
    @IsNumber()
    @IsPositive({message: "O tamanho da página deve ser maior que zero."})
    size?: number;
}
