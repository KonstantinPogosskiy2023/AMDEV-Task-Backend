import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { History } from "../models/history/history.model";
import { IHistoryService } from "../Interfaces/IHistoryService";
import { IHistory } from "../Interfaces/IHistory";

@Injectable()
export class HistoryService implements IHistoryService {

  constructor(
    @InjectModel(History)
    private historyModel: typeof History,
  ) {
  };

  public async getMyReservationHistory(id: number): Promise<IHistory[]> {
    return this.historyModel.findAll({ where: { user_id: id } });
  }
}
