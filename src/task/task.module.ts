import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/auth/guard/role/role.guard';
import { JwtModule } from '@nestjs/jwt';
import { CachingService } from 'src/caching/caching.service';
import { CachingModule } from 'src/caching/caching.module';
import { BullModule } from '@nestjs/bull';
import { JobsService } from 'src/jobs/jobs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    CachingModule,
    JwtModule.register({
      secret: process.env.SALT,
      signOptions: { expiresIn: '1d' },
    }),
    BullModule.registerQueue({
      name: 'task-management-queue',
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, CachingService, JobsService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
  ]
})
export class TaskModule {}
