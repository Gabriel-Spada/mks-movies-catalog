import {ApiProperty} from "@nestjs/swagger";
import {randomUUID} from "crypto";
import {SimpleUser} from "../../user/dto/simplified-user.dto";


export class AuthType {
    @ApiProperty({
        description: 'Usuário',
        example: {
            id: randomUUID(),
            name: 'John',
            email: 'mail@example.com'
        },
        type: () => SimpleUser
    })
    user: SimpleUser;

    @ApiProperty({
        description: 'Token JWT',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        type: String
    })
    token: string;
}