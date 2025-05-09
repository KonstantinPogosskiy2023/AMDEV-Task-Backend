import { IReservation } from "./IReservation";

export interface IReservationService {
  createReservation(payload): Promise<IReservation>;
  getReservationById(user_id: number): Promise<IReservation>;
  // getAllReservations(): Promise<IReservation[]>;
  getAllReservationsWithParams(params): Promise<IReservation[]>;
}
