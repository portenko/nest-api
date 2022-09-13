import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { DatabaseModule } from './config/database.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  // controllers: [AuthController],
  // controllers: [AppController, UserController],
  // providers: [AppService, UserService],
})
export class AppModule {}
