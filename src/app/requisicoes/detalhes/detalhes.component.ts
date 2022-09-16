import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Requisicao } from '../models/requisicao.model';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
})
export class DetalhesComponent implements OnInit {

  public requisicao: Requisicao;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.requisicao = this.route.snapshot.data['requisicao']
  }

}
