import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Membro } from "./Membro";
import { Pastor } from "./Pastor";

@Entity("igrejas")
export class Igreja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @Column()
  bairro: string;

  @Column()
  responsavel: string;

  @OneToMany(() => Pastor, (pastor) => pastor.id)
  pastor: Pastor[];

  @OneToMany(() => Membro, (membro) => membro.id)
  membro: Membro[];
}
