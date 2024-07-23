import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
import { CreateTaskDto } from 'src/task/dto/payloads.dto';
import { User } from 'src/users/user.entity';
import { JobResponseInterface } from 'src/interfaces/jobs.interface';

@Injectable()
export class JobsService {
  constructor(
    @InjectQueue('task-management-queue') private readonly queue: Queue,
  ) {}

  async addJob(data: CreateTaskDto[], user: User): Promise <JobResponseInterface> {
    await this.queue.add('create-task-job', data);
    return { message: 'Task Upload Under Processing' }
  }
}
