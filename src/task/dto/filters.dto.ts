import { IsNumber, IsPhoneNumber, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class GetSingleTaskFilter  {
    @ApiProperty({ description: 'Task Id or User Id', example: 1 })
    @IsNumber()
    @Type(() => Number)
    id?: number;
}