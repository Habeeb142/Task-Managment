import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class SignInDto {
    @ApiPropertyOptional({ description: 'The email address of the user', example: 'user@example.com' })
    @IsEmail()
    email: string;
  
    @ApiPropertyOptional({ description: 'The password of the user', example: 'strongPassword123' })
    @IsString()
    password: string;
  }