import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Requisicao } from '../models/requisicao.model';
import { RequisicaoService } from './requisicao.service';

@Injectable({
  providedIn: 'root'
})

export class RequisicaoResolver implements Resolve<Requisicao> {

  constructor(private requisicaoService: RequisicaoService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Requisicao> {
    return this.requisicaoService.selecionarPorId(route.params['id']);
  }
}
