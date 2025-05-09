import {Controller, Get, HttpCode, HttpStatus, Param, UseGuards} from "@nestjs/common";
import { HistoryService } from "./history.service";
import { IHistory } from "../Interfaces/IHistory";
import { JwtAuthGuard } from "../authorization/jwt.auth.guard";

@Controller('history')
export class HistoryController {

  constructor(
    private readonly historyService: HistoryService
  ) {
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getMyReservationHistory(@Param('id') id: number): Promise<IHistory[]> {
    return this.historyService.getMyReservationHistory(id);
  }
}
