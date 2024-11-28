// AuthService
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createSession(userId: number, expiresAt: Date) {
    return this.prisma.session.create({
      data: { userId, expiresAt },
    });
  }

  // async findUserByEmail(email: string) {
  //   return this.prisma.user.findInique({ where: { email } });
  // }

  async getSession(sessionId: string) {
    return this.prisma.session.findUnique({ where: { id: sessionId } });
  }

  async destroySession(sessionId: string) {
    return this.prisma.session.delete({ where: { id: sessionId } });
  }
}
