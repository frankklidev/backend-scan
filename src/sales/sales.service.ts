import { Injectable, InternalServerErrorException, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {

  private readonly loguer = new Logger("SalesService");

  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>
  ) { }

  async create(createSaleDto: CreateSaleDto) {
    try {
      const sale = this.saleRepository.create(createSaleDto);
      await this.saleRepository.save(sale);
      return sale;
    } catch (error) {
       this.handleDBExecptions(error);
      
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 30, offset = 0 } = paginationDto;
    return await this.saleRepository.find({
      take: limit,
      skip: offset
    });
  }

  async findOne(term: string) {
    const sale = await this.saleRepository.findOne({
      where: {
        code_product: term
      }
    });
    if (!sale)
      throw new NotFoundException(`Sale with code ${term} not found`);
    return sale;
  }

  async update(term: string, updateSaleDto: UpdateSaleDto) {

    const sale = await this.saleRepository.findOne({
      where: { code_product: term }
    });
    if (!sale) throw new NotFoundException(`Sale with id ${term} not exist`)
    return this.saleRepository.save({
      ...sale, // existing fields
      ...updateSaleDto // updated fields
    });
  }

  async remove(term: string) {
    const sale = await this.findOne(term);
    return await this.saleRepository.delete(sale)
  }

  private handleDBExecptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
    }
    this.loguer.error(error)
    throw new InternalServerErrorException('Unexpected error check Logs')
  }
}
