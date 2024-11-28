// Main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // If you need to send cookies or credentials
  });

  app.use(
    session({
      secret: 'your-secret-key', // Replace with an environment variable
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
