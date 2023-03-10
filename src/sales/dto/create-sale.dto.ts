import { IsArray, IsEnum, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { SaleType } from "../entities/sale.entity";


export class CreateSaleDto {
    @IsString()
    @MinLength(1)
    code_product: string;
    @IsNumber()
    @IsPositive()
    count_product: number;
    @IsEnum(SaleType)
    @IsString()
    type_of_sale: SaleType
    @IsOptional()
    @IsString()
    created_at: string;
}
