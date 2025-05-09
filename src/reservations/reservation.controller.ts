import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post, Query, UseGuards
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './dto/reservation.dto';
import { JwtAuthGuard } from "../authorization/jwt.auth.guard";
import { IReservation } from "../Interfaces/IReservation";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Reservation } from "../models/reservation/reservation.model";

@Controller('reservations')
export class ReservationController {

  constructor(
    private readonly reservationService: ReservationService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create reservation' })
  @ApiResponse({ status: 200, type: Reservation })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createReservation(@Body() createReservationDto: ReservationDto): Promise<IReservation> {
    return this.reservationService.createReservation(createReservationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get reservation by ID' })
  @ApiResponse({ status: 200, type: Reservation })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getReservationById(@Param('id') id: number): Promise<IReservation> {
    return this.reservationService.getReservationById(id);
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // getAllReservations() {
  //   return this.reservationService.getAllReservations();
  // }

  @Get()
  @ApiOperation({ summary: 'Get list of reservations' })
  @ApiResponse({ status: 200, type: [Reservation] })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getAllReservations(@Query() params): Promise<IReservation[]> {
    return this.reservationService.getAllReservationsWithParams(params);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancel reservation' })
  @ApiResponse({ status: 200, type: Reservation })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  cancelReservations(@Param('id') id: number): Promise<any> {
    return this.reservationService.cancelReservations(id);
  }
}
