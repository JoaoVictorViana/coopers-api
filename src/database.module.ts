import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { Todo } from './modules/todo/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      username: 'root',
      password: 'root',
      database: 'coopers',
      entities: [User, Todo],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
