import {IsString, Length} from 'class-validator';

export class CreateParkingSpotDto {

  @IsString({ message: 'Must be a string' })
  @Length(5, 30, { message: 'Address: Not less than 5 chars and not biggest 30 chars' })
  readonly location: string;
}
