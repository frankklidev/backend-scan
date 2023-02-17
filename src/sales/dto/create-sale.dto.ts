import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";


export class CreateSaleDto {
    @IsString()
    @MinLength(1)
    code_product: string;
    @IsNumber()
    @IsPositive()
    count_product: number;
    @IsString()
    type_of_sale: string;
}
