import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user/user.model';
import { AuthorizationModule } from '../authorization/authorization.module';

@Module({
  imports: [
    forwardRef(() => AuthorizationModule),
    SequelizeModule.forFeature([User])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, SequelizeModule],
})

export class UserModule {
}
