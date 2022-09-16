import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Departamento } from 'src/app/departamentos/models/departamento.model';
import { DepartamentoService } from 'src/app/departamentos/service/departamento.service';
import { Funcionario } from 'src/app/funcionarios/models/funcionario.model';
import { FuncionarioService } from 'src/app/funcionarios/service/funcionario.service';
import { Produto } from 'src/app/produtos/models/produto.model';
import { ProdutoService } from 'src/app/produtos/service/produto.service';
import { Movimentacao } from '../models/movimentacao.models';
import { Requisicao } from '../models/requisicao.model';
import { RequisicaoService } from '../service/requisicao.service';

@Component({
  selector: 'app-requisicoes-departamento',
  templateUrl: './requisicoes-departamento.component.html'
})
export class RequisicoesDepartamentoComponent implements OnInit, OnDestroy {
  public requisicoes$: Observable<Requisicao[]>;
  public produtos$: Observable<Produto[]>;
  public departamentos$: Observable<Departamento[]>;

  public funcionarioLogado: Funcionario;
  public requisicaoSelecionada: Requisicao;
  public listaStatus: string[] = ["Aberta","Processando","Não Autorizada","Fechada"];
  public form: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private requisicaoService: RequisicaoService,
    private produtoService: ProdutoService,
    private departamentoService: DepartamentoService,
    private funcionarioService: FuncionarioService,

    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService,

    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      status: new FormControl(""),
      descricao: new FormControl("", [Validators.required]),
      funcionario: new FormControl(""),
      data: new FormControl(""),
    });

    this.departamentos$ = this.departamentoService.selecionarTodos();
    this.produtos$ = this.produtoService.selecionarTodos();
    this.requisicoes$ = this.requisicaoService.selecionarTodos();

    this.funcionarioLogado = this.route.snapshot.data["funcionarioLogado"]
  }

  ngOnDestroy(): void {
  }

  get id(){
    return this.form.get("id");
  }

  get dataDeAbertura(){
    return this.form.get("dataDeAbertura");
  }

  get descricao(){
    return this.form.get("descricao")
  }

  get departamentoId(){
    return this.form.get("departamentoId");
  }

  get departamento(){
    return this.form.get("departamento");
  }

  get produtoId(){
    return this.form.get("produtoId");
  }

  get produto(){
    return this.form.get("produto");
  }

  get funcionarioId(){
    return this.form.get("funcionarioId");
  }

  get funcionario(){
    return this.form.get("funcionario");
  }

  get status(){
    return this.form.get("status");
  }

  public async Encaminhar(modal: TemplateRef<any>, requisicao?: Requisicao){
    this.form.reset();

    this.configurarValoresPadrao();

    //edição
    if(requisicao){
      const departamento = requisicao.departamento ? requisicao.departamento : null;
      const funcionario = requisicao.funcionario ? requisicao.funcionario : null;
      const produto = requisicao.produto ? requisicao.produto : null;

      const requisicaoCompleta = {
        ...requisicao,
        departamento,
        funcionario,
        produto
      }

      this.form.get("requisicao")?.setValue(requisicaoCompleta);

    }

    try{
      await this.modalService.open(modal).result;

      if(this.form.dirty && this.form.valid){
        if(!requisicao)
          await this.requisicaoService.inserir(this.form.value);
        else
          await this.requisicaoService.editar(this.form.value);

        this.toastrService.success(`A requisição foi salva com sucesso!`,"Cadastro de Requisição");
      }
      else
        this.toastrService.error(`Varifique o preenchimento do formulário e tente novamente!`,"Cadastro de Requisição");
    }catch(error){
      if(error != "fechar" && error != "0" && error != "1")
        this.toastrService.error(`Houve um erro ao cadastrar uma requisição, tente novamente!`,"Cadastro de Requisição");

      console.log(error)
    }
  }

  public async gravar(modal: TemplateRef<any>, requisicao: Requisicao){
    this.requisicaoSelecionada = requisicao;
    this.requisicaoSelecionada.movimentacoes = requisicao.movimentacoes ? requisicao.movimentacoes : [];

    this.form.reset();

    this.configurarValoresPadrao();

    try{
      await this.modalService.open(modal).result;

      if(this.form.dirty && this.form.valid){
        this.atualizarRequisicao(this.form.value)

        await this.requisicaoService.editar(this.requisicaoSelecionada);

        this.toastrService.success(`A requisição foi salva com sucesso!`,"Cadastro de Requisição");
      }
      else
        this.toastrService.error(`Varifique o preenchimento do formulário e tente novamente!`,"Cadastro de Requisição");
    }catch(error){
      if(error != "fechar" && error != "0" && error != "1")
        this.toastrService.error(`Houve um erro ao cadastrar uma requisição, tente novamente!`,"Cadastro de Requisição");

      console.log(error)
    }
  }

  private atualizarRequisicao(movimentacao: Movimentacao){
    this.requisicaoSelecionada.movimentacoes.push(movimentacao);
    this.requisicaoSelecionada.status = this.status?.value;
    this.requisicaoSelecionada.ultimaAtualizacao = new Date();
  }

  private configurarValoresPadrao(): void
  {
    this.form.patchValue({
      funcionario: this.funcionarioLogado,
      status: this.requisicaoSelecionada.status,
      data: new Date()
    })
  }
}
