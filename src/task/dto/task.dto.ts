import { ApiProperty } from "@nestjs/swagger"

export class Task {
    @ApiProperty({ description: 'Task Id' })
    id: number

    @ApiProperty({ description: 'Title of task' })
    title: string

    @ApiProperty({ description: 'Description of task' })
    description: string

    @ApiProperty({ description: 'Status of task' })
    status: string

    @ApiProperty({ description: 'Point assigned to a task' })
    point: number

    @ApiProperty({ description: 'Date a task was created' })
    dateCreated: Date
}