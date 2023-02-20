import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { AuthModule } from './../auth/auth.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports:[
    TypeOrmModule.forFeature([Sale]),
    AuthModule,
    ProductModule
  ]
})
export class SalesModule {}
