import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserHttpModule } from './modules/user/user-http.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [JwtModule, DatabaseModule, UserHttpModule, AuthModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
