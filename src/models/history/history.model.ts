import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";

@Table({ tableName: 'history' })
export class History extends Model {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @ApiProperty({ example: 1, description: 'Unique parking-spot number' })
  @Column({ type: DataType.INTEGER })
  parking_spot_number: number;

  @ApiProperty({ example: '2025-05-09', description: 'Date' })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  reserved_date: Date;

  @ApiProperty({ example: '09:00:00', description: 'Time' })
  @Column({ type: DataType.STRING, allowNull: false })
  reserved_time: string;

  @ApiProperty({ example: 'canceled', description: 'Status of reservation' })
  @Column({ type: DataType.STRING, allowNull: false })
  status: string;
}
