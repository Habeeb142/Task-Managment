import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { randomBytes, scryptSync as scrypt } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokenInterface, ValidateTokenInterface } from './interface/token.interface';
import { LoggedInResponseDto } from 'src/users/dto/responses.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        private jwtService: JwtService
    ) {}

    signUp(payload: SignUpDto): Promise<User> {
        try {
            const { password } = payload
            const salt = randomBytes(8).toString('hex')
            const hash = scrypt(password, salt, 32) 
            payload.password = salt + '.' + hash.toString('hex')
            const user = this.repo.create(payload)
            return this.repo.save(user)
        } catch (error) {
            throw error
        }
    }

    async signIn(payload: SignInDto): Promise<LoggedInResponseDto> {
        try {
            const { email, password } = payload
            const user = await this.repo.findOneBy({email})
            
            if(!user) throw new UnauthorizedException("Email or Password Ivalid")
            if(!user.activate) throw new UnauthorizedException("Your account is yet to be activated. Please refer to your email")
            const { password: savedPassword } = user
            const [ salt, hash ] = savedPassword.split(".")
            const hashSuppliedPassword = scrypt(password, salt, 32).toString('hex')
            if(hashSuppliedPassword != hash) throw new UnauthorizedException("Email or Password Invalid")
            delete user.password //remove password from whats gonna be stored in jwt
            const accessToken = this.jwtService.sign({ ...user }, { secret: process.env.SALT })
            return { 
                accessToken,
                user
             }
        } catch (error) {
            throw error
        }
    }

    async activateUser(param: Partial<SignInDto>, query: Partial<ValidateTokenInterface>) {
        try {
            const data = {
                email: param.email,
                id: query.id,
                token: query.token
            }

            const isValid = this.validateToken(data)
            return this.updateActivationStatus(data.email, isValid)
        } catch (error) {
            throw error
        }
    }

    async updateActivationStatus(userId: string, status: boolean) {
        try {
            const id = parseInt(userId)
            const payload = id ? { id } : { email: userId }
    
            const user = await this.repo.findOne({where: payload})
            
            if(!user)throw new NotFoundException("User not found")
            user.activate = status
            await this.repo.save(user)
            return { activation: true }
        } catch (error) {
            throw error
        }
    }

    generateConfirmationToken(data: GenerateTokenInterface) {
        const { email, id } = data;
        const hash = scrypt(email+id, process.env.SALT, 32) 
        return hash.toString('hex')
    }

    validateToken(data: ValidateTokenInterface) {
        try {
            const { token } = data;
            // generate same token with email and id again and validate if result is equal to provided token
            const validToken = this.generateConfirmationToken(data)
            const suppliedToken = token
            if(validToken != suppliedToken) throw new ForbiddenException("Please provide a valid token")
            return true
        } catch (error) {
            throw error
        }
    }

}
