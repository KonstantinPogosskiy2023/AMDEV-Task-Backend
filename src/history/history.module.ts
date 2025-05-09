import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { History } from "../models/history/history.model";
import { HistoryService } from "./history.service";
import { HistoryController } from "./history.controller";
import { AuthorizationModule } from "../authorization/authorization.module";

@Module({
  imports: [
    SequelizeModule.forFeature([History]),
    AuthorizationModule,
  ],
  providers: [HistoryService],
  controllers: [HistoryController],
  exports: [HistoryService, SequelizeModule],
})

export class HistoryModule {
}
