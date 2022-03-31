import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Igreja } from "./Igreja";

@Entity("membros")
export class Membro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  endereco: string;

  @Column()
  sexo: string;

  @Column({ name: "estado_civil" })
  estadoCivil: string;

  @Column({ name: "data_nascimento" })
  dataNascimento: Date;

  @ManyToOne(() => Igreja, (igreja) => igreja.membro, { eager: true })
  @JoinColumn({ name: "igreja_id" })
  igreja: Igreja;
}
