import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * Passport automatically verifies the token signature and expiration.
   * This method runs after verification.
   * The returned payload is attached to the request object as `req.user`.
   */
  async validate(payload: any) {
    // We trust the payload since the token is verified.
    // We return the user's ID and username.
    return { id: payload.sub, username: payload.username };
  }
}

