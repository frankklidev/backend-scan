import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { AuthModule } from './../auth/auth.module';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports:[
    TypeOrmModule.forFeature([Sale]),
    AuthModule,
  ]
})
export class SalesModule {}
