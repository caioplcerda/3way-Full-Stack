import IIgreja from "./igreja.types";

export default interface IPastor {
  id?: number;
  nome?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  igreja?: IIgreja;
}