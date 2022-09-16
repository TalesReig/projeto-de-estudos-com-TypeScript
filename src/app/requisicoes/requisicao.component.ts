import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';
import { Departamento } from '../departamentos/models/departamento.model';
import { DepartamentoService } from '../departamentos/service/departamento.service';
import { FuncionarioService } from '../funcionarios/service/funcionario.service';
import { Produto } from '../produtos/models/produto.model';
import { ProdutoService } from '../produtos/service/produto.service';
import { Requisicao } from './models/requisicao.model';
import { RequisicaoService } from './service/requisicao.service';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html'
})

export class RequisicaoComponent {

}

