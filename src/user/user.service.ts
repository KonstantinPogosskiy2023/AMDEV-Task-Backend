import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { IUser } from '../Interfaces/IUser';
import { IUserService } from '../Interfaces/IUserService';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user/user.model';

@Injectable()
export class UserService implements IUserService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {
  };

  public async createUser(payload): Promise<IUser> {
    try {
      return await this.userModel.create({ ...payload });
    } catch (e) {
      throw new HttpException(
        'AN ERROR OCCURRED WHILE CREATING THE USER, MAYBE SUCH USER ALREADY EXIST',
        HttpStatus.CONFLICT,
      );
    }
  }

  public async getUserById(id: number): Promise<IUser> {
    const user = await this.userModel.findOne({ where: { id } } as any);
    if (!user) {
      throw new NotFoundException('NO SUCH USER');
    }
    return user;
  }

  public async getAllUsers(): Promise<IUser[]> {
    const users = await this.userModel.findAll({ include: { all: true } });
    if (!users.length) {
      throw new NotFoundException('NO ANY USERS');
    }
    return users;
  }

  public async checkEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ where: { email: email }, raw: true  } as any);
  }
}
