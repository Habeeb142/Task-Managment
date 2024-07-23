import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Task } from './dto/task.dto';
import { CreateTaskDto, UpdateTaskDto } from './dto/payloads.dto';
import { GetSingleTaskFilter } from './dto/filters.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { StatusFilter } from 'src/dtos/filters.dto';
import { User } from 'src/users/user.entity';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/guard/role/role.decorator';
import { JobsService } from 'src/jobs/jobs.service';
import { JobResponseInterface } from 'src/interfaces/jobs.interface';

@ApiBearerAuth()
@Controller('task')
@UseGuards(JwtAuthGuard)

export class TaskController {
    constructor(private service: TaskService, private jobsService: JobsService) {}

    @ApiOperation({ summary: 'Creating a Task' })
    @ApiResponse({ status: 201, description: 'Task Created successfully' , type: Task})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized request' })
    @ApiResponse({ status: 403, description: 'Forbidden resource' })
    @Roles(Role.User, Role.Admin)
    @Post()
    // create(@Body() payload: CreateTaskDto, @Request() req: any): Promise<Task> { //below i intentionally set the property i will need from request, u can console log req using type any to get lists of what is accessible
    create(@Body() payload: CreateTaskDto, @Request() req: { user: User }): Promise<Task> {
        return this.service.create(payload, req.user)
    }

    @ApiOperation({ summary: 'Creating a bulk Task (Adding to queue)' })
    @ApiResponse({ status: 201, description: 'Task Created successfully'})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized request' })
    @ApiResponse({ status: 403, description: 'Forbidden resource' })
    @Roles(Role.User, Role.Admin)
    @Post('bulk-create-tasks')
    // create(@Body() payload: CreateTaskDto, @Request() req: any): Promise<Task> { //below i intentionally set the property i will need from request, u can console log req using type any to get lists of what is accessible
    bulkCreate(@Body() payload: CreateTaskDto[], @Request() req: { user: User }): Promise<JobResponseInterface> {
        return this.jobsService.addJob(payload, req.user)
    }


    @ApiOperation({ summary: 'Get all Tasks' })
    @ApiResponse({ status: 200, description: 'Tasks fetched successfully' })
    @ApiResponse({ status: 403, description: 'Unauthorized request' })
      // @ApiParam({ name: 'page', required: false, description: 'Page number for pagination' })
    @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, description: 'Number of tasks per page' })
    @ApiQuery({ name: 'status', required: false, description: 'Status of the task' })
    @Roles(Role.Admin)
    @Get('')
    getTasks(@Query() paginationQuery: PaginationQueryDto, @Query() statusQuery: StatusFilter): Promise<[Task[], number]> {
        return this.service.getTasks(paginationQuery, statusQuery)
    }

    @ApiOperation({ summary: 'Get Task By Task Id' })
    @ApiResponse({ status: 200, description: 'Task fetched successfully' })
    @ApiResponse({ status: 403, description: 'Unauthorized request' })
    @ApiResponse({ status: 404, description: 'Task with specified Id not found' })
    @Roles(Role.Admin, Role.User)
    @Get(':id')
    getTaskById(@Param() param: GetSingleTaskFilter): Promise<Task> {
        return this.service.getTaskById(param)
    }

    @ApiOperation({ summary: 'Get User Tasks' })
    @ApiResponse({ status: 200, description: 'Tasks fetched successfully' })
    @ApiResponse({ status: 403, description: 'Unauthorized request' })
    @ApiResponse({ status: 404, description: 'Task with specified User not found' })
    @Roles(Role.Admin, Role.User)
    @Get('user/:id')
    getUserTasks(@Param() param: GetSingleTaskFilter): Promise<[Task[], number]> {
        return this.service.getUserTasks(param)
    }

    @ApiOperation({ summary: 'Update Task' })
    @ApiResponse({ status: 200, description: 'Task Updated successfully' })
    @ApiResponse({ status: 404, description: 'Task Id not found' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 403, description: 'Unauthorized request' })
    @Roles(Role.Admin)
    @Patch(':id')
    updateTask(@Param() param: GetSingleTaskFilter, @Body() payload: UpdateTaskDto): Promise<Task> {
        return this.service.updateTask(param, payload)
    }

    @ApiOperation({ summary: 'Delete a Task' })
    @ApiResponse({ status: 200, description: 'Task Deleted successfully' })
    @ApiResponse({ status: 404, description: 'Task Id not found' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 403, description: 'Unauthorized request' })
    @Roles(Role.Admin)
    @Delete(':id')
    deleteTask(@Param() param: GetSingleTaskFilter): Promise<{message: string}> {
        return this.service.deleteTask(param)
    }

    // Join with user to fetch task based on user
    // Only Admin or the user of the task can access a task
}
