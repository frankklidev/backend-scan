import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    name_product: string;

    @Column('numeric')
    stock_product: number;

    @Column('numeric')
    price_product: number;

    @Column('text')
    code_product: string;

    @Column('text')
     id_store:string;
}
