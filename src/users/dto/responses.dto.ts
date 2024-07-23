import { ApiProperty } from "@nestjs/swagger"

export class LoggedInResponseDto {
    @ApiProperty({ description: 'Users token' })
    accessToken: string

    @ApiProperty({ description: 'Users details' })
    user: object
}

export class ActivationResponse {
    @ApiProperty({ description: 'Response status' })
    activation: boolean
}
