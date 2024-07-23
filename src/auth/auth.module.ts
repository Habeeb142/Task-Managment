import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailService } from 'src/email/email.service';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.SALT,
            signOptions: { expiresIn: '1d' },
          }),
          PassportModule,
    ],
    providers: [JwtStrategy, AuthService, UsersService, EmailService],
    controllers: [AuthController]
})
export class AuthModule {}
