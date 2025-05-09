import { forwardRef, Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthorizationService],
  controllers: [AuthorizationController],
  exports: [AuthorizationService, JwtModule],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
})

export class AuthorizationModule {
}
