import {ApiProperty} from "@nestjs/swagger";


export class AuthInput{
    @ApiProperty({example: 'mail@example.com', description: 'Email do usuário'})
    email: string;

    @ApiProperty({example: '!Qwerty123', description: 'Senha do usuário'})
    password: string;
}