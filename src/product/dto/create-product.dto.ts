import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {


    @IsString()
    @MinLength(1)
    name_product: string;

    @IsNumber()
    @IsPositive()
    stock_product: number;

    @IsNumber()
    @IsPositive()
    price_product: number;

    @IsString()
    @MinLength(1)
    code_product: string;

    @IsString()
    @MinLength(1)
     id_store:string;
}
