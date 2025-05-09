import { Module } from '@nestjs/common';
import { SpotService } from './spot.service';
import { SpotController } from './spot.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Spot } from "../models/spot/spot.model";
import { ReservationModule } from "../reservations/reservation.module";
import { Reservation } from "../models/reservation/reservation.model";
import { AuthorizationModule } from "../authorization/authorization.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Spot, Reservation]),
    ReservationModule,
    AuthorizationModule,
  ],
  providers: [SpotService],
  controllers: [SpotController],
  exports: [SpotService, SequelizeModule],
})

export class SpotModule {
}
