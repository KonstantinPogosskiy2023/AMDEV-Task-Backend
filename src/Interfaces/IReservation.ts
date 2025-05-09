export interface IReservation {
  user_id: number;
  parking_spot_number: number;
  reserved_date: Date;
  reserved_time: string;
  status: string;
}
