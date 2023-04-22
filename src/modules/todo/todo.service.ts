import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findById(id: number): Promise<Todo> {
    const result = await this.todoRepository.find({
      where: { id: id },
      loadRelationIds: {
        relations: ['user'],
        disableMixedMap: true,
      },
    });

    return result.length ? result?.[0] : null;
  }

  async create(params: Partial<Todo>, user: User): Promise<number> {
    const result = await this.todoRepository.insert({
      ...params,
      user,
      done: false,
    });
    return result.identifiers?.[0]?.id;
  }

  async update(id: number, params: Partial<Todo>): Promise<boolean> {
    const result = await this.todoRepository.update(id, params);
    return Boolean(result);
  }

  async check(id: number): Promise<boolean> {
    const result = await this.todoRepository.update(id, { done: true });
    return Boolean(result);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.todoRepository.delete(id);
    return Boolean(result);
  }

  async findByUserId(userId: number): Promise<Todo[]> {
    return await this.todoRepository.find({ where: { user: { id: userId } } });
  }
}
