import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { CreateTaskDto } from 'src/task/dto/payloads.dto';
import { TaskService } from 'src/task/task.service';

@Processor('task-management-queue')
export class JobsProcessor {
  constructor(
    private taskService: TaskService
  ) {}

  @Process('create-task-job')
  handleTranscode(job: Job<any>) {
    const { data } = job;
    Promise.all(data.map((task: CreateTaskDto) => this.taskService.create(task)));
  }
}
