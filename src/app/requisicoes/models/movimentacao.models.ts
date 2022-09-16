import { Funcionario } from "src/app/funcionarios/models/funcionario.model";

export class Movimentacao {
  status: string;
  data: Date | any;
  descricao: string;
  funcionario: Funcionario
}
