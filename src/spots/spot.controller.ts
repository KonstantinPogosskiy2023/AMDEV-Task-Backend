import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post, Query, UseGuards
} from '@nestjs/common';
import { SpotService } from './spot.service';
import { CreateParkingSpotDto } from './dto/create-parking-spot.dto';
import { JwtAuthGuard } from "../authorization/jwt.auth.guard";

@Controller('parking-spots')
export class SpotController {

  constructor(
    private readonly spotService: SpotService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  createSpot(@Body() createParkingSpotDto: CreateParkingSpotDto) {
    return this.spotService.createSpot(createParkingSpotDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getSpotById(@Param() params) {
    return this.spotService.getSpotById(params.id);
  }

  @Get('/occupied/:id')
  @HttpCode(HttpStatus.OK)
  getFullyBookedDatesForSpot(@Param('id') id: number ) {
    return this.spotService.getFullyBookedDatesForSpot(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getAllSpots() {
    return this.spotService.getAllSpots();
  }

  @Get(':parking_spot_id/available-times')
  @UseGuards(JwtAuthGuard)
  getAvailableTimes(
    @Param('parking_spot_id', ParseIntPipe) parkingSpotId: number,
    @Query('date') date: string,
  ): Promise<string[]> {
    return this.spotService.getAvailableTimes(parkingSpotId, date);
  }
}
