import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, Matches, MinLength} from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'John'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'email do usuário',
        example: 'mail@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'senha de acesso',
        example: '123456'
    })
    @IsString()
    @MinLength(8, { message: 'A senha deve ter ao menos 8 caracteres.' })
    @Matches(/(?=.*[A-Z])/, { message: 'A senha deve conter pelo menos um caracter maiúsculo.' })
    @Matches(/(?=.*[\W])/, { message: 'A senha deve conter pelo menos um caracter especial.' })
    password: string;
}
