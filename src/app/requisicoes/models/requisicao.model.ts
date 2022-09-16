import { Departamento } from "src/app/departamentos/models/departamento.model";
import { Funcionario } from "src/app/funcionarios/models/funcionario.model";
import { Produto } from "src/app/produtos/models/produto.model";
import { Movimentacao } from "./movimentacao.models";

export class Requisicao {
  id: string;
  descricao?: string;
  dataDeAbertura?: Date | any;

  funcionarioId: string;
  funcionario?: Funcionario;

  departamentoId: string;
  departamento?: Departamento;

  produtoId?: string;
  produto?: Produto;

  status?: string;
  ultimaAtualizacao: Date | any;
  movimentacoes: Movimentacao[]
}
