import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(params: Partial<User>): Promise<number> {
    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(String(params.password), salt);

    const response = await this.userRepository.insert({
      ...params,
      password: hash,
    });

    return response.identifiers?.[0].id;
  }

  async update(id: number, params: Partial<User>): Promise<boolean> {
    const response = await this.userRepository.update(id, params);
    return Boolean(response);
  }

  async delete(id: number): Promise<boolean> {
    const response = await this.userRepository.delete(id);
    return Boolean(response);
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isUser = await bcrypt.compare(String(password), user.password);

    if (!isUser) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
