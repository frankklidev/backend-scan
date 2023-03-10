import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
const moment = require('moment');

export enum SaleType {
    TRANSFERENCIA = 'TRANSFERENCIA',
    EFECTIVO = 'EFECTIVO',
    RUNNING = 'RUNNING'
  }

@Entity()
export class Sale {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: false,
        nullable: false
    })
    code_product: string;

    @Column('numeric', { nullable: false, default: 1 })
    count_product: number;

    @Column({
        type: "enum",
        enum: ["TRANSFERENCIA", "EFECTIVO"],
        nullable:true
    })
    type_of_sale: SaleType

    @Column('date',
    {nullable:false,
    default: moment().toDate()})
    created_at: string;

}



   


