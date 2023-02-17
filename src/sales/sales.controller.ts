import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorator';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get() 
  @Auth(ValidRoles.admin)
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(paginationDto);
    return this.salesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') term: string) {
    return this.salesService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') term: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(term, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') term: string) {
    return this.salesService.remove(term);
  }
}
