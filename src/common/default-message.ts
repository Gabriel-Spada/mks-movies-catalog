import {ApiProperty} from "@nestjs/swagger";


export class DefaultMessage {

    constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }

    @ApiProperty({
        description: 'Status code',
        example: 200
    })
    status: number;

    @ApiProperty({
        description: 'Action response',
        example: 'Ação efetuada com sucesso!'
    })
    message: string;
}