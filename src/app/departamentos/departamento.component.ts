import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Departamento } from './models/departamento.model';
import { DepartamentoService } from './service/departamento.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html'
})

export class DepartamentoComponent implements OnInit {
  public departamentos$: Observable<Departamento[]>
  public form: FormGroup;

  constructor(
    private departamentoService: DepartamentoService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastrService: ToastrService
    ) {
    }

  ngOnInit(): void {
    this.departamentos$ = this.departamentoService.selecionarTodos();

    this.form = this.fb.group({
      id: new FormControl(""),
      nome: new FormControl("",[Validators.required, Validators.minLength(3)]),
      telefone: new FormControl("",[Validators.required, Validators.minLength(10)])
    })
  }

  get id(){
    return this.form.get("id");
  }

  get nome(){
    return this.form.get("nome");
  }

  get telefone(){
    return this.form.get("telefone");
  }

  public async gravar(modal: TemplateRef<any>, departamento?: Departamento){
    this.form.reset();

    if(departamento)
      this.form.setValue(departamento);

    try {
      await this.modalService.open(modal).result;

      if(!departamento){
        await this.departamentoService.inserir(this.form.value)
        this.toastrService.success("Departamento inserido com sucesso","Cadastro de Departamento");
      }
      else{
        await this.departamentoService.editar(this.form.value)
        this.toastrService.success("Departamento editado com sucesso","Edição de Departamento");
      }

    } catch (error) {
      this.toastrService.error('Departamenta não inserido');
    }
  }

  public excluir(departamento: Departamento) {
    this.departamentoService.excluir(departamento);
  }
}
