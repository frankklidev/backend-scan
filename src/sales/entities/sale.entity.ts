import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductService } from '../../product/product.service';


@Entity()
export class Sale {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
        nullable: false
    })
    code_product: string;

    @Column('numeric', { nullable: false, default: 1 })
    count_product: number;

    @Column('text')
    type_of_sale: string;

}
