import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {hashPasswordTransform} from "../../common/helpers/crypto";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({description: 'The unique identifier of the movie.', example: '3fa85f64-5717-4562-b3fc-2c963f66afa6'})
    id: string;

    @Column()
    @ApiProperty({description: 'The name of the movie.', example: 'Inception'})
    name: string;

    @Column({nullable: true})
    @ApiProperty({description: 'Movie director name.', example: 'Christopher Nolan'})
    director?: string;

    @Column('text', {nullable: true})
    @ApiProperty({
        description: 'The description of the movie.',
        example: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        required: false
    })
    description?: string;

    @Column('varchar', {nullable: true, length: 500})
    @ApiProperty({
        description: 'The URL of the movie poster.',
        example: 'https://example.com/inception.jpg',
        required: false
    })
    imageUrl?: string;

    @Column({type: 'int', nullable: true})
    @ApiProperty({description: 'The release year of the movie.', example: 2010, required: false})
    year?: number;

    @Column({type: 'decimal', precision: 3, scale: 1, nullable: true})
    @ApiProperty({description: 'The IMDb score of the movie.', example: 8.8, required: false})
    imdbScore?: number;

    @Column({type: 'time', nullable: true})
    @ApiProperty({description: 'The duration of the movie.', example: '02:28:00', required: false})
    duration?: string;

    @CreateDateColumn()
    @ApiProperty({description: 'The date when the movie was added.', example: '2022-01-01T00:00:00Z'})
    createdAt: Date;

    @DeleteDateColumn({nullable: true})
    @ApiProperty({
        description: 'The date when the movie was deleted.',
        example: '2022-01-02T00:00:00Z',
        required: false
    })
    deletedAt?: Date;
}
