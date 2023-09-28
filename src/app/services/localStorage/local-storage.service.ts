import { Injectable } from '@angular/core';
import { Filme, IFavorito } from 'src/app/models/filme';
import { ModelBase } from 'src/app/models/modelBase';
import { Pessoa } from 'src/app/models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  private local = 'filmes-favoritos-api';

  obterDados() {
    const dados = localStorage.getItem(this.local);

    return dados ? JSON.parse(dados) : [];
  }

  private salvarDados(dados: IFavorito[]) {
    localStorage.setItem(this.local, JSON.stringify(dados))
  }

  favoritar(filme: IFavorito) {
    const dados = this.obterDados() as IFavorito[];

    const index = dados.findIndex(o => filme.id == o.id);

    if (index == -1)
      dados.push(filme)
    else
      dados.splice(index, 1)

    this.salvarDados(dados)
  }

  ehFavorito(dado: Filme | Pessoa) {
    const dados = this.obterDados() as IFavorito[];

    return dados.find(x => x.id === dado.id) != null

  }


}
