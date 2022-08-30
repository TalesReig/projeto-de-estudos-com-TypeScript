import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private registros: AngularFirestoreCollection<Departamento>

  constructor(private firestore: AngularFirestore) {
    this.registros = this.firestore.collection<Departamento>("departamentos")
  }

  public async inserir(registro: Departamento): Promise<any> {
    if(!registro)
      return Promise.reject("Item inválido");

    const res = await this.registros.add(registro);

    registro.id = res.id;

    this.registros.doc(res.id).set(registro);
  }

  public async editar(registro: Departamento): Promise<void> {
    return this.registros.doc(registro.id).set(registro);
  }

  public excluir(registro: Departamento): Promise<void> {
    return this.registros.doc(registro.id).delete();
  }

  public selecionarTodos(): Observable<Departamento[]>{
    return this.registros.valueChanges();
  }
}
