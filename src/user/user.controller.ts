import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from "../Interfaces/IUser";

@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUserById(@Param() params): Promise<IUser> {
    return this.userService.getUserById(params.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllUsers(): Promise<IUser[]> {
    return this.userService.getAllUsers();
  }
}
