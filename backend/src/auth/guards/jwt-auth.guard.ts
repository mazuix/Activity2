import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * This guard automatically uses the JwtStrategy.
 * It will protect endpoints by checking for a valid JWT in the
 * 'Authorization: Bearer <token>' header.
 * If valid, it attaches the user payload (from JwtStrategy.validate)
 * to `req.user`.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

