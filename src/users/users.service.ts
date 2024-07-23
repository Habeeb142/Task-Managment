import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}


    async isUserExist(email: string) {
        const user = await this.repo.findOneBy({email})
        if(user) throw new ConflictException("User already exist in the system")
        return false
    }

    getAll():Promise<User[]> {
        return this.repo.find()
    }

}
