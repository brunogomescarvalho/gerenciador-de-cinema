import { Injectable } from '@angular/core';
import { Filme, IFilmeFavorito } from 'src/app/models/filme';

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

  private salvarDados(dados: IFilmeFavorito[]) {
    localStorage.setItem(this.local, JSON.stringify(dados))
  }

  favoritar(filme: IFilmeFavorito) {
    const dados = this.obterDados() as IFilmeFavorito[];

    const index = dados.findIndex(o => filme.id == o.id);

    if (index == -1)
      dados.push(filme)
    else
      dados.splice(index, 1)

    this.salvarDados(dados)
  }

  ehFavorito(filme: Filme) {
    const dados = this.obterDados() as IFilmeFavorito[];

    return dados.find(x => x.id === filme.id) != null

  }


}
