import { Controller, Post, Body, Param, Delete, UseGuards, Res } from "@nestjs/common";
import {UserService} from "../services/user.service";
import {CreateUserDto} from "../dto/create-user.dto";
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../entities/user.entity";
import {DefaultMessage} from "../../common/default-message";
import {JwtAuthGuard} from "../../auth/guards/auth.guard";

@ApiBearerAuth('access-token')
@ApiTags('User')
@Controller({
  version: '1',
  path: 'user'
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOkResponse({
    description: 'Usuário criado com sucesso',
    type: User,
  })
  async create(@Body() data: CreateUserDto,@Res() res: any) {
    return res.status(200).json(await this.userService.create(data));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  @ApiOkResponse({
    description: 'Usuário excluído com sucesso',
    type: DefaultMessage,
  })
  async remove(@Param('id') id: string,@Res() res: any) {
    return res.status(200).json(await this.userService.remove(id));
  }
}
