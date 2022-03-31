import IIgreja from "./igreja.types";

export default interface IMembro {
  id?: number;
  nome?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  sexo?: string;
  estadoCivil?: string;
  dataNascimento?: string;
  igreja?: IIgreja;
}