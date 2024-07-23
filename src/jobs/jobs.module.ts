import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { JobsService } from './jobs.service';
import { JobsProcessor } from './jobs.processor';
import { TaskService } from 'src/task/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'task-management-queue',
    }),
  ],
  providers: [JobsService, TaskService, JobsProcessor]
})
export class JobsModule {}
