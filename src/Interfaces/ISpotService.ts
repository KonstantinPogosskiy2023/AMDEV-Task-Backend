import { ISpot } from "./ISpot";

export interface ISpotService {
  createSpot(payload): Promise<ISpot>;
  getSpotById(user_id: number): Promise<ISpot>;
  getAllSpots(): Promise<ISpot[]>;
  getAvailableTimes(parkingSpotId: number, date: string): Promise<string[]>;

}
