import { Injectable, Logger, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ProductService {
  private readonly loguer = new Logger("SalesService");

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
       this.handleDBExecptions(error);
      
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 30, offset = 0 } = paginationDto;
    return await this.productRepository.find({
      take: limit,
      skip: offset
    });
  }

  async findOne(term: string) {
    const product = await this.productRepository.findOne({
      where: {
        code_product: term
      }
    });
    if (!product)
      throw new NotFoundException(`Product with code ${term} not found`);
    return product;
  }

  async update(term: string, updateProductDto: UpdateProductDto) {

    const product = await this.productRepository.findOne({
      where: { code_product: term }
    });
    if (!product) throw new NotFoundException(`Sale with id ${term} not exist`)
    return this.productRepository.save({
      ...product, // existing fields
      ...updateProductDto // updated fields
    });
  }

  async remove(term: string) {
    const product = await this.findOne(term);
    return await this.productRepository.delete(product)
  }

  private handleDBExecptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
    }
    this.loguer.error(error)
    throw new InternalServerErrorException('Unexpected error check Logs')
  }
}


