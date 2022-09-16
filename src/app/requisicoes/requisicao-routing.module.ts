import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioLogadoResolver } from '../shared/services/funcionario-logado.resolver';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { Requisicao } from './models/requisicao.model';
import { RequisicaoComponent } from './requisicao.component';
import { RequisicoesDepartamentoComponent } from './requisicoes-departamento/requisicoes-departamento.component';
import { RequisicoesFuncionarioComponent } from './requisicoes-funcionario/requisicoes-funcionario.component';
import { RequisicaoResolver } from './service/requisicao.resolver';

const routes: Routes = [
  {
    path: "",
    component: RequisicaoComponent,
    children: [
      {path: "", redirectTo: "funcionario", pathMatch: "full"},
      {path: "funcionario",
       component: RequisicoesFuncionarioComponent,
       resolve: {funcionarioLogado: FuncionarioLogadoResolver}
      },
      {path: "departamento",
       component: RequisicoesDepartamentoComponent,
       resolve: {funcionarioLogado: FuncionarioLogadoResolver}
      }
    ]
  },
  { path: ":id", component: DetalhesComponent, resolve: {requisicao: RequisicaoResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisicaoRoutingModule { }
