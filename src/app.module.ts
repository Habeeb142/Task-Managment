import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Task } from './task/task.entity';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email/email.service';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_NAME,
      entities: [User, Task],
      synchronize: true,
      // synchronize: false //uncomment when going to production
    }),
    AuthModule, 
    TaskModule, UsersModule, JobsModule
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
