import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Produto } from './models/produto.model';
import { ProdutoService } from './service/produto.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
})
export class ProdutoComponent implements OnInit {
  public produtos$: Observable<Produto[]>
  public form: FormGroup;

  constructor(
    private produtoService: ProdutoService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastrService: ToastrService
   ) { }

  ngOnInit(): void {
    this.produtos$ = this.produtoService.selecionarTodos();

    this.form = this.fb.group({
      id: new FormControl(""),
      numeroDeSerie: new FormControl(""),
      nome: new FormControl(""),
      preco: new FormControl(""),
      dataDeFabricacao: new FormControl("")
    })
  }

  get id(){
    return this.form.get("id");
  }

  get numeroDeSerieome(){
    return this.form.get("numeroDeSerie");
  }

  get nome(){
    return this.form.get("nome");
  }

  get preco(){
    return this.form.get("preco");
  }

  get dataDeFabricacao(){
    return this.form.get("dataDeFabricacao");
  }

  public async gravar(modal: TemplateRef<any>, produto?: Produto){
    this.form.reset();

    if(produto)
      this.form.setValue(produto);

    try {
      await this.modalService.open(modal).result;

      if(!produto){
        await this.produtoService.inserir(this.form.value);
        this.toastrService.success("Produto inserido com sucesso","Cadastro de Produtos");
      }
      else{
        await this.produtoService.editar(this.form.value)
        this.toastrService.success("Produto editado com sucesso","Edição de Produtos");
      }

      console.log(`O produto foi salvo com sucesso`)
    } catch (error) {
      this.toastrService.error("Cadastro de Produtos","Produto não inserido");
    }
  }

  public excluir(produto: Produto) {
    this.produtoService.excluir(produto);
  }

}
