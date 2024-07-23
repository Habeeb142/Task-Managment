import { IsPhoneNumber, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";
import { SignInDto } from "./sign-in.dto";

export class SignUpDto extends SignInDto {
    @ApiProperty({ description: 'The phone number of the user', example: '1234567890' })
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty({ description: 'The first name of the user', example: 'John' })
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
    @IsString()
    lastName: string;
}