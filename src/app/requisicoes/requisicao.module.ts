import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { RequisicoesFuncionarioComponent } from './requisicoes-funcionario/requisicoes-funcionario.component';
import { RequisicoesDepartamentoComponent } from './requisicoes-departamento/requisicoes-departamento.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { RequisicoesDepartamentoPipe } from './pipes/requisicoes-departamento.pipe';
import { RequisicoesFuncionarioPipe } from './pipes/requisicoes-funcionario.pipe';


@NgModule({
  declarations: [
    RequisicaoComponent,
    RequisicoesFuncionarioComponent,
    RequisicoesDepartamentoComponent,
    DetalhesComponent,
    RequisicoesDepartamentoPipe,
    RequisicoesFuncionarioPipe
  ],
  imports: [
    CommonModule,
    RequisicaoRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxMaskModule.forChild()
  ]
})
export class RequisicaoModule { }
