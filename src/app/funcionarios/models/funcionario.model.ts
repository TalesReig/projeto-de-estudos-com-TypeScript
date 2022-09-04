import { Departamento } from "src/app/departamentos/models/departamento.model";

export class Funcionario {
  id: string;
  nome: string;
  email: string;
  funcao: string;
  departamentoId: string;
  departamento?: Departamento;
}
