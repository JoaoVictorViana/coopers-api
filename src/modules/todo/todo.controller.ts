import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Todo as TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(
    private todoService: TodoService,
    private authService: AuthService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async show(@Headers('Authorization') auth: string) {
    const user = await this.authService.me(auth?.replace('Bearer ', ''));

    if (!user.id) {
      throw new UnauthorizedException();
    }

    return await this.todoService.findByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/check/:id')
  async findById(@Param('id') id: number) {
    return await this.todoService.check(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() params: Partial<TodoEntity>,
    @Headers('Authorization') auth: string,
  ) {
    const user = await this.authService.me(auth?.replace('Bearer ', ''));
    return await this.todoService.create(params, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() params: Partial<TodoEntity>,
    @Headers('Authorization') auth: string,
  ) {
    const user = await this.authService.me(auth?.replace('Bearer ', ''));
    const todo = await this.todoService.findById(id);

    if (todo.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    return await this.todoService.update(id, params);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Headers('Authorization') auth: string,
  ) {
    const user = await this.authService.me(auth?.replace('Bearer ', ''));
    const todo = await this.todoService.findById(id);

    if (todo.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    return await this.todoService.delete(id);
  }
}
