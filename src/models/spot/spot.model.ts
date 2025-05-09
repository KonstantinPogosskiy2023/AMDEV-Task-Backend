import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import {Reservation} from "../reservation/reservation.model";
import {ApiProperty} from "@nestjs/swagger";

@Table({ tableName: 'parking-spots' })

export class Spot extends Model {

  @ApiProperty({ example: 'ул.Скрипникова, 50-12', description: 'Address' })
  @Column({ type: DataType.STRING, allowNull: false })
  location: string;

  @HasMany(() => Reservation)
  reservations: Reservation;
}
