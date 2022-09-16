import { Pipe, PipeTransform } from '@angular/core';
import { Requisicao } from '../models/requisicao.model';

@Pipe({
  name: 'requisicoesDepartamento'
})
export class RequisicoesDepartamentoPipe implements PipeTransform {

  transform(requisicoes: Requisicao[] | null, departamentoId: string): Requisicao[] {
    if(!requisicoes)
      return [];

    return requisicoes?.filter(req => req.departamentoId === departamentoId);
  }

}
