import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Funcionario } from './models/funcionario.model';
import { FuncionarioService } from './service/funcionario.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { DepartamentoService } from '../departamentos/service/departamento.service';
import { Departamento } from '../departamentos/models/departamento.model';
import { AuthenticationService } from '../auth/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html'
})

export class FuncionarioComponent implements OnInit {
  public funcionarios$: Observable<Funcionario[]>
  public departamentos$: Observable<Departamento[]>
  public form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.funcionarios$ = this.funcionarioService.selecionarTodos();
    this.departamentos$ = this.departamentoService.selecionarTodos();

    this.form = this.fb.group({
      funcionario: new FormGroup({
        id: new FormControl(""),
        nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
        email: new FormControl("", [Validators.required, Validators.email]),
        funcao: new FormControl("", [Validators.required, Validators.minLength(3)]),
        departamentoId: new FormControl("", [Validators.required]),
        departamento: new FormControl(""),
      }),
      senha: new FormControl("",[Validators.minLength(3)])
    });
  }

  get id(){
      return this.form.get("funcionario.id");
  }

  get nome(){
    return this.form.get("funcionario.nome");
  }

  get email(){
    return this.form.get("funcionario.email");
  }

  get funcao(){
    return this.form.get("funcionario.funcao");
  }

  get departamentoId(){
    return this.form.get("funcionario.departamentoId");
  }

  get departamento(){
    return this.form.get("funcionario.email");
  }

  get senha(){
    return this.form.get("senha");
  }

  public async gravar(modal: TemplateRef<any>, funcionario?: Funcionario){
    this.form.reset();

    if(funcionario){
      const departamento = funcionario.departamento ? funcionario.departamento : null;

      const funcionarioCompleto = {
        ...funcionario,
        departamento
      }
      this.form.get("funcionario")?.setValue(funcionarioCompleto);
    }

    try {
      await this.modalService.open(modal).result;

      if(!funcionario){
        await this.authService.cadastrar(this.email?.value, this.senha?.value)

        await this.funcionarioService.inserir(this.form.get("funcionario")?.value)

        this.toastrService.success("Funcionario inserido com sucesso","Cadastro de Funcionario");

        await this.authService.logout();

        await this.router.navigate(["/login"])
      }
      else{
        await this.funcionarioService.editar(this.form.get("funcionario")?.value)

        this.toastrService.success("Funcionario editado com sucesso","Edição de Funcionario");
      }

    } catch (error) {
      if( error != "fechar" && error != "0" && error != "1")
        this.toastrService.error('Funcionario não inserido');
    }
  }

  public excluir(funcionario: Funcionario) {
    this.funcionarioService.excluir(funcionario);
  }
}
