import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('funcionarios')
export class Funcionario {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    sex: string;


    @Column()
    birthday: Date;

    @Column()
    salary: string;
}