import {BadRequestException, Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiProperty, ApiTags} from "@nestjs/swagger";
import {DateTime} from "luxon";
import * as os from "os";

export class HealthResponse {
    constructor(status?: string, time?: string,  environment?: string, host?: string) {
        this.status = status;
        this.time = time;
        this.environment = environment;
        this.host = host;
    }

    @ApiProperty({
        description: 'Server status',
        example: 'server ok!',
    })
    status: string;

    @ApiProperty({
        description: 'Server time',
        example: new Date().toISOString(),
    })
    time: string;

    @ApiProperty({
        description: 'Environment',
        example: 'development',
    })
    environment: string;

    @ApiProperty({
        description: 'Server IP',
        example: '127.0.0.1',
    })
    host: string;
}


class AppService {
}

@ApiTags('Health')
@Controller({
    version: '1',
    path: '',
})
export class AppController {
    constructor() {
    }

    @Get('/health')
    @ApiOperation({description: 'Check health'})
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: "Check health",
        type: HealthResponse
    })
    async getHealthCheck() {
        try {

            const now = DateTime.now().setZone(process.env.TZ).toISO();
            const host = this.getServerIp();

            const response = new HealthResponse('server ok!', now, process.env.NODE_ENV, host);

            return response;
        } catch (e) {
            throw new BadRequestException();
        }
    }

    getServerIp(): string {
        const interfaces = os.networkInterfaces();
        for (const devName in interfaces) {
            const iface = interfaces[devName].find((details) => {
                return details.family === 'IPv4' && !details.internal;
            });
            if (iface) {
                return iface.address;
            }
        }
        return '0.0.0.0';
    }
}

