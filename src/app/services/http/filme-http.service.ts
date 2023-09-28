import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Filme, IFavorito } from '../../models/filme';
import { environment } from 'src/environments/environment';
import { Mapeador } from '../mapeadores/mapeador';
import { Pessoa } from 'src/app/models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class FilmeHttpService {

  constructor(private httpClient: HttpClient, private mapeador: Mapeador) { }

  private apiUrl: string = `https://api.themoviedb.org/3/movie/`;

  private obterAutorizacao() {
    return {
      method: 'GET',
      headers: {
        'Authorization': environment.API_KEY,
        'accept': 'application/json',
      }
    }
  }

  private obterListagem(url: string) {
    return this.httpClient.get(url, this.obterAutorizacao())
      .pipe(
        map((x: any) => x.results),
        map((o: any[]) => this.mapearListaFilmes(o)),
      )

  }

  public obterFilmesPopulares(page: string) {
    const url = this.obterUrl('popular', page);
    return this.obterListagem(url)
  }

  public obterFilmesRecomendados(page: string) {
    const url = this.obterUrl('top_rated', page);
    return this.obterListagem(url)
  }

  public obterFilmesLancamentos(page: string) {
    const url = this.obterUrl('now_playing', page);
    return this.obterListagem(url)
  }

  public obterFavoritos(favoritos: IFavorito[]): Observable<[Filme[], Pessoa[]]> {
    const filmes = favoritos.filter(x => x.tipo == 'filme').map((x) => this.obterPorId(x.id));
    const elenco = favoritos.filter(x => x.tipo == 'elenco').map((x) => this.obterPessoaPorId(x.id));
    return forkJoin([forkJoin(filmes), forkJoin(elenco)]);
  }

  public obterPorPesquisa(nome: string, page: string) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${nome}&language=pt-BR&page=${page}`;
    return this.obterListagem(url)
  }

  public obterPorId(id: number) {
    const url = this.apiUrl + id +
      '?append_to_response=images,videos,credits&language=pt-BR'

    return this.httpClient.get(url, this.obterAutorizacao())
      .pipe(
        map((x: any) => this.mapeador.filmeDetalhes(x)),
      )
  }

  private obterUrl(tipoBusca: string, pagina: string) {
    return `${this.apiUrl}${tipoBusca}?language=pt-BR&page=${pagina}`
  }

  private mapearListaFilmes(lista: any[]): Filme[] {
    return lista?.map((o: any) => {

      return this.mapeador.filmeResumido(o)
    })
  }

  public obterPessoaPorId(id: number) {
    const url = `https://api.themoviedb.org/3/person/` + id +
      '?append_to_response=images,credits&language=pt-BR'

    return this.httpClient.get(url, this.obterAutorizacao())
      .pipe(
        map((x: any) => this.mapeador.mapearPessoa(x)),
      )
  }

}


