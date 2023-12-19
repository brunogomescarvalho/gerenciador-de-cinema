import { shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Parametro } from 'src/app/models/Parametro';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  mudarCategoriaSubject: BehaviorSubject<Parametro>

  categoriaSelecionada: Parametro = 'Novidades'

  constructor() { this.mudarCategoriaSubject = new BehaviorSubject<Parametro>('Novidades') }

  alterarCategoria(categoria: Parametro) {
    this.categoriaSelecionada = categoria
    this.mudarCategoriaSubject.next(categoria)
  }

  receberCategoria() {
    return this.mudarCategoriaSubject.asObservable()
  }

  verificarCategoriaAtual() {
    return this.categoriaSelecionada
  }

}
