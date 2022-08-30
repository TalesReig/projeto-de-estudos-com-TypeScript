import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private registros: AngularFirestoreCollection<Produto>

  constructor(private firestore: AngularFirestore) {
    this.registros = this.firestore.collection<Produto>("produtos")
  }

  public async inserir(registro: Produto): Promise<any> {
    if(!registro)
      return Promise.reject("Item inválido");

    const res = await this.registros.add(registro);

    registro.id = res.id;

    this.registros.doc(res.id).set(registro);
  }

  public async editar(registro: Produto): Promise<void> {
    return this.registros.doc(registro.id).set(registro);
  }

  public excluir(registro: Produto): Promise<void> {
    return this.registros.doc(registro.id).delete();
  }

  public selecionarTodos(): Observable<Produto[]>{
    return this.registros.valueChanges();
  }
}
