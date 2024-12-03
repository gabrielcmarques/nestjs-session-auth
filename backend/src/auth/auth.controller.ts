// AuthController

import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import * as dayjs from 'dayjs';
import { SessionGuard } from './session.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.register(email, password, name);
      // console.log(`USER @ Register()`, user);
      return res.status(HttpStatus.CREATED).send({
        message: 'User registered successfully',
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const expiresAt = dayjs().add(7, 'days').toDate();
    const session = await this.authService.createSession(user.id, expiresAt);

    res.cookie('SESSION_ID', session.id, {
      httpOnly: true,
      //   secure: true, // Use only in production with HTTPS
      expires: expiresAt,
    });

    return res.send({ message: 'Login successful' });
  }

  @Post('logout')
  async logout(@Res() res: Response, @Body('sessionId') sessionId: string) {
    try {
      await this.authService.destroySession(sessionId);

      res.clearCookie('SESSION_ID', {
        httpOnly: true,
        // secure: true, // Use only in production with HTTPS
      });

      return res.status(HttpStatus.OK).send({ message: 'Logout successful' });
    } catch (error) {
      throw new HttpException(
        'ERROR: Unable to logout',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Example of using the SessionGuard for a specific route
  @Post('protected-route')
  @UseGuards(SessionGuard) // Protect this route with SessionGuard
  async protectedRoute(@Res() res: Response) {
    return res.status(HttpStatus.OK).send({ message: 'You have access!' });
  }
}
