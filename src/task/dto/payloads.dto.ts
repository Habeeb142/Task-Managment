import { IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTaskDto  {
    @ApiProperty({ description: 'The title of a task', example: 'Create Message Request' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'The Id of the Assignee', example: 1 })
    @IsNumber()
    assigneeId: number;

    @ApiProperty({ description: 'The description of the task', example: 'API that fetches description of a task' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'The point assigned to a specific task', example: 1 })
    @IsNumber()
    point: number;
}

export class UpdateTaskDto  {
    @ApiPropertyOptional({ description: 'The title of the task', example: 'Create Message Request' })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({ description: 'The description of the task', example: 'API that fetches description of a task' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ description: 'The point assigned to a specific task', example: 1 })
    @IsNumber()
    @IsOptional()
    point?: number;

    @ApiPropertyOptional({ description: 'The status of specific task', example: 'ACTIVE' })
    @IsString()
    @IsOptional()
    status?: string;

    @ApiPropertyOptional({ description: 'The Id of the Assignee', example: '1' })
    @IsString()
    @IsOptional()
    assigneeId?: string;
}