import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: 'users' })

export class User extends Model {

  @ApiProperty({ example: 'user@mail.ru', description: 'Mailing address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'qwe123', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
