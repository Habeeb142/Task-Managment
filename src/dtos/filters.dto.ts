import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class StatusFilter {
    @ApiPropertyOptional({ description: 'Status of a task' })
    @IsOptional()
    @IsString()
    status?: string 
}