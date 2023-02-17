import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get() 
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(paginationDto);
    return this.productService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') term: string) {
    return this.productService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') term: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(term, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') term: string) {
    return this.productService.remove(term);
  }
}
