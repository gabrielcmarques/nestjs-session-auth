// AuthController

import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
// import dayjs from 'dayjs';
import * as dayjs from 'dayjs';


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
}
