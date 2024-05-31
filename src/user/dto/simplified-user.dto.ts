import {ApiProperty} from "@nestjs/swagger";
import {randomUUID} from "crypto";


export class SimpleUser {
    @ApiProperty({
        description: 'User Id', example: randomUUID()
    })
    id: string;

    @ApiProperty({
        description: 'User name', example: "John"
    })
    name: string;

    @ApiProperty({
        description: 'User email', example: "mail@example.com"
    })
    email: string;

    @ApiProperty({
        description: 'Data de criação do usuário', example: new Date().toISOString()
    })
    createdAt: Date;


    @ApiProperty({
        description: 'Data de exclusão do usuário', example: null
    })
    deletedAt?: Date;
}
