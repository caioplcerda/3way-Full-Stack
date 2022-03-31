import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Igreja } from "./Igreja";

@Entity("pastores")
export class Pastor {
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

  @ManyToOne(() => Igreja, (igreja) => igreja.pastor, { eager: true })
  @JoinColumn({ name: "igreja_id" })
  igreja: Igreja;
}
