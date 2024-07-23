import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private repo: Repository<User>, ) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SALT,
    });
  }

  async validate(payload: any) {
    
    const { email } = payload;
    const user = await this.repo.findOne({ where: { email } });
    
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
