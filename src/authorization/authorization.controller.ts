import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthorizationController {

  constructor(private  authService: AuthorizationService) {
  }

  @UsePipes(ValidationPipe)
  @Post('/login')
  signIn(@Body() userDto: CreateUserDto) {
    return this.authService.signIn(userDto);
  }

  @UsePipes(ValidationPipe)
  @Post('/register')
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }
}


