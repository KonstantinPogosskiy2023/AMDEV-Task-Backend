import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IReservationService } from "../Interfaces/IReservationService";
import { Reservation } from "../models/reservation/reservation.model";
import { IReservation } from "../Interfaces/IReservation";
import { FindOptions } from 'sequelize/types';
import { ReservationDto } from "./dto/reservation.dto";
import { History } from "../models/history/history.model";
import { BOOKED, CANCELED } from "../constants";

@Injectable()
export class ReservationService implements IReservationService {

  constructor(
    @InjectModel(Reservation)
    private reservationModel: typeof Reservation,
    @InjectModel(History)
    private historyModel: typeof History,
  ) {
  };

  public async createReservation(payload: ReservationDto): Promise<Reservation> {
    try {
      const existingReservation = await this.reservationModel.findOne({
        where: {
          parking_spot_number: payload.parking_spot_number,
          reserved_date: payload.reserved_date,
          reserved_time: payload.reserved_time,
        },
      } as any);

      if (existingReservation) {
        throw new HttpException(
          'This time slot is already reserved for the parking spot',
          HttpStatus.CONFLICT,
        );
      }

      const reservation = await this.reservationModel.create({ ...payload });
      await this.intoHistory(payload);
      return reservation;
    } catch (e) {
      console.error('Error creating reservation:', e);
      if (e instanceof HttpException) {
        throw e;
      }

      throw new HttpException(
        'An error occurred while creating the reservation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async intoHistory(payload: ReservationDto) {
    await this.historyModel.create({
      user_id: payload.user_id,
      parking_spot_number: payload.parking_spot_number,
      reserved_date: payload.reserved_date,
      reserved_time: payload.reserved_time,
      status: BOOKED,
    });
  }

  public async getReservationById(id: number): Promise<IReservation> {
    const reservation = await this.reservationModel.findOne({ where: { id: id } } as any);
    if (!reservation) {
      throw new NotFoundException('NO SUCH RESERVATION');
    }
    return reservation;
  }

  public async getAllReservations(options?: FindOptions): Promise<IReservation[]> {
    return this.reservationModel.findAll({
      ...options,
    });
  }

  public async getAllReservationsWithParams(params): Promise<IReservation[]> {
    return this.reservationModel.findAll({
      where: { ...params },
    });
  }

  public async cancelReservations(id: number): Promise<{ message: string; status: number }> {
    try {
      const reservationForHistory = await this.reservationModel.findOne({ where: { id: id }, raw: true } as any);
      const reservation = await this.reservationModel.destroy({ where: { id: id } });
      if (!reservation) {
        throw new HttpException('RESERVATION IS NOT FOUND', HttpStatus.NOT_FOUND);
      }
      await this.intoHistory({
        user_id: reservationForHistory.user_id,
        parking_spot_number: reservationForHistory.parking_spot_number,
        reserved_date: reservationForHistory.reserved_date,
        reserved_time: reservationForHistory.reserved_time,
        status: CANCELED,
      })
      return {
        message: 'RESERVATION CANCELED SUCCESSFULLY',
        status: 200,
      };
    } catch (e) {
      throw new HttpException('INVALID QUERY SYNTAX', HttpStatus.BAD_REQUEST);
    }
  }
}
