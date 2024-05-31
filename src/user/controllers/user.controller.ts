import {Controller, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
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
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  @ApiOkResponse({
    description: 'Usuário excluído com sucesso',
    type: DefaultMessage,
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
