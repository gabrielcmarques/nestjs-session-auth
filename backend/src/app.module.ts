// AppModule

import {
  MiddlewareConsumer,
  Module,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
// import { SessionGuard } from './auth/session.guard';
import { SessionCleanupTask } from './tasks/session-cleanup.task';
// import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [
    SessionCleanupTask,
    // {
    //   provide: APP_GUARD,
    //   useClass: SessionGuard,
    // },
    PrismaService,
    AppService,
  ],
})

export class AppModule implements OnModuleInit {
  constructor(private readonly sessionCleanupTask: SessionCleanupTask) {}

  onModuleInit() {
    this.sessionCleanupTask.startCleanup();
  }
}
