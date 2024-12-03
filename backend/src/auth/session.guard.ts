// src/auth/session.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionId = request.cookies?.SESSION_ID;

    if (!sessionId) {
      throw new UnauthorizedException('Session not found');
    }

    const session = await this.authService.getSession(sessionId);

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Session expired or invalid');
    }

    request.user = { id: session.userId };

    return true;
  }
}
