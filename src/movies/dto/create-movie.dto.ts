import { ApiProperty } from '@nestjs/swagger';
import {IsOptional, IsPositive, Max, MaxLength, Min} from "class-validator";

export class CreateMovieDto {
    @ApiProperty({ description: 'The name of the movie.', example: 'Inception' })
    @MaxLength(255,{message: 'O nome do filme deve ter menos que 255 caracteres.'})
    name: string;

    @ApiProperty({ description: 'The director of the movie.', example: 'Christopher Nolan' })
    @IsOptional()
    @MaxLength(255,{message: 'O nome do diretor deve ter menos que 255 caracteres.'})
    director?: string;

    @ApiProperty({ description: 'The description of the movie.', example: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', required: false })
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'The URL of the movie poster.', example: 'https://example.com/inception.jpg', required: false })
    @IsOptional()
    @MaxLength(500,{message: 'A URL da imagem deve ter menos que 500 caracteres.'})
    imageUrl?: string;

    @ApiProperty({ description: 'The release year of the movie.', example: 2010, required: false })
    @IsOptional()
    @IsPositive({message: 'O ano de lançamento deve ser positivo.'})
    year?: number;

    @ApiProperty({ description: 'The IMDb score of the movie.', example: 8.8, required: false })
    @IsOptional()
    @Min(0,{message: 'A avaliação deve ser maior ou igual a 0.'})
    @Max(10,{message: 'A avaliação deve ser menor ou igual a 10.'})
    imdbScore?: number;

    @ApiProperty({ description: 'The duration of the movie.', example: '02:28:00', required: false })
    @IsOptional()
    duration?: string;
}