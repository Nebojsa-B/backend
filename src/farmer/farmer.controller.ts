import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { ApiTags } from '@nestjs/swagger';
import { CookieValue } from './decorators/get-user-id.decorator';
import { SearchQueryDto } from './dto/search-query.dto';

@ApiTags('Farmer')
@Controller('farmer')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Post()
  createFarmer(
    @CookieValue('userId') userId: string,
    @Body() createFarmerDto: CreateFarmerDto
  ) {
    return this.farmerService.create(+userId, createFarmerDto);
  }

  @Get()
  findAll(@CookieValue('userId') userId, @Query() searchQuery: SearchQueryDto) {
    return this.farmerService.findAll(+userId, searchQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFarmerDto: UpdateFarmerDto) {
    return this.farmerService.update(+id, updateFarmerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmerService.remove(+id);
  }

}
