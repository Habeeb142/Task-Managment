import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './dto/payloads.dto';
import { GetSingleTaskFilter } from './dto/filters.dto';
import { User } from 'src/users/user.entity';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { StatusFilter } from 'src/dtos/filters.dto';
import { sanitizeSingleTaskResponse, sanitizeTaskResponse } from 'src/utils/data-sanitizer';
import { CachingService } from 'src/caching/caching.service';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>, private cachingService: CachingService) {}

  create(payload: CreateTaskDto, user?: User): Promise<Task> {
    try {
      const task = this.repo.create({
        ...payload,
        assignee: { id: payload.assigneeId },
      });
      return this.repo.save(task);
    } catch (error) {
      throw error;
    }
  }

  async getTasks(
    paginationQuery: PaginationQueryDto,
    statusQuery: StatusFilter,
  ): Promise<[Task[], number]> {
    try {
      const { page, limit } = paginationQuery;
      const { status } = statusQuery;

      const cacheKey = `task_getTasks_${JSON.stringify(paginationQuery) +'_'+ JSON.stringify(statusQuery)}`;
      const cachedData = await this.cachingService.getCache(cacheKey);

      if(cachedData) return JSON.parse(cachedData);

      const unsanitizedTasks = await this.repo.findAndCount({
        where: { status },
        relations: ['assignee'], // we are doing relations here cos we set eager to false in entity
        skip: (page - 1) * limit,
        take: limit,
      });

      const sanitizedTaskresponse = sanitizeTaskResponse(unsanitizedTasks)
      
      // caching strategy
      await this.cachingService.setCache(cacheKey, JSON.stringify(sanitizedTaskresponse), 3600);
      
      return sanitizedTaskresponse

    } catch (error) {
      throw error;
    }
  }

  async getTaskById(param: GetSingleTaskFilter): Promise<Task> {
    const { id } = param;
    try {
      const cacheKey = `task_getTaskById_${JSON.stringify(param)}`;
      const cachedData = await this.cachingService.getCache(cacheKey);

      if(cachedData) return JSON.parse(cachedData);

      const unsanitizedTask = await this.repo.findOneOrFail({
        where: { id },
        relations: ['assignee'],
      });

      const sanitizedTaskresponse = sanitizeSingleTaskResponse(unsanitizedTask);
      
      // caching strategy
      await this.cachingService.setCache(cacheKey, JSON.stringify(sanitizedTaskresponse), 3600);
      return sanitizedTaskresponse
    } catch (error) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }
  }

  async getUserTasks(param: GetSingleTaskFilter): Promise<[Task[], number]> {
    const { id } = param;
    try {
      const tasks = await this.repo.findAndCount({
        where: { assignee: { id } },
        relations: ['assignee'],
      });
      return tasks;
    } catch (error) {
      throw new NotFoundException(`Task with User ID: ${id} not found`);
    }
  }

  async updateTask(
    param: GetSingleTaskFilter,
    payload: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.getTaskById(param);
    Object.assign(task, payload);
    await this.cachingService.deleteCache(`task:*`);
    return this.repo.save(task);
    // Ypu can follow this format
    // const updatedTask = { ...task, ...payload }
    // return this.repo.save(updatedTask)

    // For immutability and readability: The spread operator ({ ...task, ...payload }) is often preferred because it is more concise and ensures that the original object is not mutated.
    // For mutability and performance: Object.assign(task, payload) is suitable when you need to update an existing object and don't mind mutating it.

    // Immutability in the sence that it create another copy of Object
    // Mutable: it does not create something new, it add up payload in exisitinfg task object
  }

  async deleteTask(param: GetSingleTaskFilter): Promise<{ message: string }> {
    await this.getTaskById(param);
    await this.repo.delete(param);
    await this.cachingService.deleteCache(`task:*`);
    return { message: '1 row Deleted Successfully' };
  }
}
