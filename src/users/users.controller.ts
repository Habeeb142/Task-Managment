import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) {}

    @ApiOperation({ summary: 'Get All Users' })
    @ApiResponse({ status: 200, description: 'Users fetched successfully'})
    @ApiResponse({ status: 401, description: 'UnAuthorized Request' })
    @ApiResponse({ status: 403, description: 'Forbidden Request' })
    @Get()
    getAll(): Promise<User[]> {
        return this.service.getAll()
    }
}
