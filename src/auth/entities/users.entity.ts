import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')  
  id:string

  @Column('text',{
    unique:true
  })
  user_name:string;
  @Column('text',{select:false})
  password:string;

  @Column('text')
  fullName:string;

  @Column('bool',{
    default:true
  })
  isActive:boolean;

  @Column('text',{
    array:true,
    default:['seller'] 
  })
  roles:string[];
}
