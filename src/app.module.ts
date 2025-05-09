import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from './config/configuration';
import { AuthorizationModule } from "./authorization/authorization.module";
import { UserModule } from "./user/user.module";
import { User } from "./models/user/user.model";
import { SpotModule } from "./spots/spot.module";
import { Spot } from "./models/spot/spot.model";
import { Reservation } from "./models/reservation/reservation.model";
import { ReservationModule } from "./reservations/reservation.module";
import { HistoryModule } from "./history/history.module";
import { History } from "./models/history/history.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),

    SequelizeModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        dialect: 'mariadb',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.db'),
        autoLoadModels: true,
        models: [User, Spot, Reservation, History],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthorizationModule,
    UserModule,
    SpotModule,
    ReservationModule,
    HistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
