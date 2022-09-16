import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Funcionario } from 'src/app/funcionarios/models/funcionario.model';
import { FuncionarioService } from 'src/app/funcionarios/service/funcionario.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioLogadoResolver implements Resolve<Funcionario> {

  constructor(
    private funcionarioService: FuncionarioService,
    private authservice: AuthenticationService
    ){}
  resolve(): Observable<Funcionario> {
    return this.authservice.usuarioLogado
      .pipe(
        switchMap(usuario => {
          return this.funcionarioService.selecionarFuncionarioLogado(usuario?.email!)
        }),
        take(1)
      );
  }
}
