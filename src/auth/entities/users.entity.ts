import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type UserRoleType = "Administrador" | "Vendedor";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', {
    unique: true
  })
  user_name: string;
  @Column('text', { select: false })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true
  })
  isActive: boolean;

  @Column("simple-array",{nullable:true})
  roles: string[]


}
