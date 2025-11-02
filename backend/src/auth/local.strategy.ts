import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      // By default, LocalStrategy expects 'username' and 'password'
      // in the request body.
    });
  }

  /**
   * This method is automatically called by Passport when the LocalAuthGuard is used.
   * It receives the credentials from the request body.
   */
  async validate(username: string, password: string): Promise<any> {
    // This will call the 'validateUser' method in our AuthService
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    return user;
  }
}

