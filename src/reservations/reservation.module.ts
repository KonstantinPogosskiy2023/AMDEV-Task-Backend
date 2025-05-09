import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reservation } from "../models/reservation/reservation.model";
import { Spot } from "../models/spot/spot.model";
import { AuthorizationModule } from "../authorization/authorization.module";
import { HistoryModule } from "../history/history.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Reservation, Spot]),
    AuthorizationModule,
    HistoryModule,
  ],
  providers: [ReservationService],
  controllers: [ReservationController],
  exports: [ReservationService, SequelizeModule],
})

export class ReservationModule {
}
