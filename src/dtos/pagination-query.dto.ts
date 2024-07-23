import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsInt, IsOptional, IsPositive, Min } from "class-validator"

export class PaginationQueryDto {
    @ApiPropertyOptional({ description: 'Page number', default: 1, minimum: 1 })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(1)
    page?: number = 1

    @ApiPropertyOptional({ description: 'Limit of objects per page', default: 10, minimum: 1 })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @IsPositive()
    limit?: number = 10
}