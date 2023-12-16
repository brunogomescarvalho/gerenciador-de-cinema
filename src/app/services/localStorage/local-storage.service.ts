import { Injectable } from '@angular/core';
import { Filme, IFavorito } from 'src/app/models/filme';
import { Pessoa } from 'src/app/models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  private local = 'filmes-favoritos-api';

  favoritos?: any[]
  filmes?: Filme[];
  elenco?: Pessoa[];

  obterDados() {
    const dados = localStorage.getItem(this.local);

    return dados ? JSON.parse(dados) : [];
  }

  private salvarDados(dados: IFavorito[]) {
    localStorage.setItem(this.local, JSON.stringify(dados))
  }

  alterarStatusFavorito(filme: IFavorito) {
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

  public obterFavoritos() {
    const favoritos = this.obterDados();

    if (favoritos.length == 0) return

    this.favoritos = []
    this.filmes = []
    this.elenco = []

    const filmes = favoritos.filter((x: any) => x.tipo == 'filme').map(((f: any) => new Filme(f.id, f.nome, f.poster)))
    this.filmes = filmes;
    this.favoritos.push(...filmes);

    const elenco = favoritos.filter((x: any) => x.tipo == 'elenco').map(((e: any) => new Pessoa(e.id, e.nome, e.poster)))
    this.elenco = elenco;
    this.favoritos.push(...elenco);

    return this.favoritos
  };

  ehFilme(favorito: Filme | Pessoa): boolean {
    return this.filmes!.includes(favorito)
  }


}
