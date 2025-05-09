import { IHistory } from "./IHistory";

export interface IHistoryService {
  getMyReservationHistory(id: number): Promise<IHistory[]>;
}
