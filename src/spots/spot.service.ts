import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Spot } from "../models/spot/spot.model";
import { ISpot } from "../Interfaces/ISpot";
import { ISpotService } from "../Interfaces/ISpotService";
import { ReservationService } from "../reservations/reservation.service";
import { NUMBER_OF_TIME_SLOT } from "../constants";

@Injectable()
export class SpotService implements ISpotService {

  constructor(
    @InjectModel(Spot)
    private spotModel: typeof Spot,
    private reservationService: ReservationService,
  ) {
  };

  public async createSpot(payload): Promise<ISpot> {
    try {
      return await this.spotModel.create({ ...payload });
    } catch (e) {
      throw new HttpException(
        'AN ERROR OCCURRED WHILE CREATING THE PARKING-SPOT, MAYBE SUCH PARKING-SPOT ALREADY EXIST',
        HttpStatus.CONFLICT,
      );
    }
  }

  public async getSpotById(id: number): Promise<ISpot> {
    const spot = await this.spotModel.findOne({ where: { id: id } } as any);
    if (!spot) {
      throw new NotFoundException('NO SUCH PARKING-SPOT');
    }
    return spot;
  }

  public async getAllSpots(): Promise<ISpot[]> {
    const spots = await this.spotModel.findAll({ include: { all: true } });
    if (!spots) {
      throw new NotFoundException('NO ANY PARKING-SPOTS');
    }
    return spots;
  }

  async getAvailableTimes(parkingSpotId: number, date: string) {
    const reservations = await this.reservationService.getAllReservations({
      where: {
        parking_spot_number: parkingSpotId,
        reserved_date: date,
      },
      raw: true,
    });
    const reservedTimes = reservations?.length
      ? reservations.map(r => r.reserved_time)
      : [];
    const allSlots = this.generateTimeSlots('09:00', '18:00');
    return allSlots.filter(slot => !reservedTimes.includes(slot));
  }

  private generateTimeSlots(start: string, end: string): string[] {
    const result: string[] = [];
    let hour = parseInt(start.split(':')[0], 10);
    const endHour = parseInt(end.split(':')[0], 10);

    while (hour < endHour) {
      const nextHour = hour + 1;
      const slot = `${hour.toString().padStart(2, '0')}:00-${nextHour.toString().padStart(2, '0')}:00`;
      result.push(slot);
      hour++;
    }
    return result;
  }

  async getFullyBookedDatesForSpot(id: number): Promise<string[]> {
    const fullyBookedDates: string[] = [];
    const results = await this.spotModel.findAll({ where: { id: id }, include: { all: true } });
    for (const spot of results) {
      const reservations = spot.dataValues.reservations || [];
      const reservationsByDate: Record<string, number> = {};

      for (const reservation of reservations) {
        const rawDate = reservation.dataValues?.reserved_date;
        if (!rawDate) continue;
        const parsedDate = new Date(rawDate);
        if (isNaN(parsedDate.getTime())) continue;
        const formattedDate = parsedDate.toISOString().split('T')[0];
        reservationsByDate[formattedDate] = (reservationsByDate[formattedDate] || 0) + 1;
      }

      for (const [date, count] of Object.entries(reservationsByDate)) {
        if (count >= NUMBER_OF_TIME_SLOT && !fullyBookedDates.includes(date)) {
          fullyBookedDates.push(date);
        }
      }
    }
    return fullyBookedDates;
  }
}
