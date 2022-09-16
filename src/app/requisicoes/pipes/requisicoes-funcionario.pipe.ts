import { Pipe, PipeTransform } from '@angular/core';
import { Requisicao } from '../models/requisicao.model';

@Pipe({
  name: 'requisicoesFuncionario'
})
export class RequisicoesFuncionarioPipe implements PipeTransform {

  transform(requisicoes: Requisicao[] | null, funcionarioId: string): Requisicao[] {
    if(!requisicoes)
      return [];

    return requisicoes?.filter(req => req.funcionarioId === funcionarioId);
  }

}
