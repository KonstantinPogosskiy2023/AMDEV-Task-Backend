import { IsDate, IsNumber, IsString } from 'class-validator';

export class HistoryDto {

  @IsNumber()
  readonly user_id: number;

  @IsNumber()
  readonly parking_spot_number: number;

  @IsDate({ message: 'YYYY-MM-DD' })
  readonly reserved_date: Date;

  @IsString({ message: 'HH:MM:SS' })
  readonly reserved_time: string;

  @IsString({ message: 'Booked' })
  readonly status: string;
}
