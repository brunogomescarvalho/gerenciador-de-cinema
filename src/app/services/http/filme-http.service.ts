import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { IFavorito } from '../../models/filme';
import { environment } from 'src/environments/environment';
import { Mapeador } from '../mapeadores/mapeador';

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
        map((res: any) => res.results),
        map((obj: any[]) => this.mapeador.mapearListaFilmes(obj)),
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

  public obterFavoritos(favoritos: IFavorito[]) {
    const filmes = favoritos.filter(x => x.tipo == 'filme').map((f) => this.obterPorId(f.id))
    return forkJoin(filmes)
  }
  public obterElencoFavoritos(favoritos: IFavorito[]) {
    const elenco = favoritos.filter(x => x.tipo == 'elenco').map((f) => this.obterPessoaPorId(f.id))
    return forkJoin(elenco)
  }

  public obterPorPesquisa(nome: string, page: string): Observable<any> {
    const url = `https://api.themoviedb.org/3/search/multi?query=${nome}&language=pt-br&page=${page}`;

    return this.httpClient.get(url, this.obterAutorizacao())
      .pipe(
        map((res: any) => res.results),
        map((obj: any[]) => this.mapeador.mapearPesquisa(obj))
      );
  }

  public obterPorGenero(id: string, page: string): Observable<any> {
    const url = `https://api.themoviedb.org/3/genre/${id}/movies?language=pt-BR&page=${page}`;

    return this.httpClient.get(url, this.obterAutorizacao())
      .pipe(
        map((res: any) => res.results),
        map((obj: any[]) => this.mapeador.mapearListaFilmes(obj))
      );
  }

  public obterGeneros(): Observable<any> {
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=pt-BR`;

    return this.httpClient.get(url, this.obterAutorizacao())
      .pipe(
        map((res:any) => this.mapeador.mapearGeneros(res.genres)),
      );
  }

  public obterPorId(id: number) {
    const url = this.apiUrl + id +
      '?append_to_response=images,videos,credits&language=pt-BR'

    return this.httpClient.get(url, this.obterAutorizacao())
      .pipe(
        map((filme: any) => this.mapeador.filmeDetalhes(filme)),
      )
  }

  private obterUrl(tipoBusca: string, pagina: string) {
    return `${this.apiUrl}${tipoBusca}?language=pt-BR&page=${pagina}`
  }

  public obterPessoaPorId(id: number) {
    const url = `https://api.themoviedb.org/3/person/` + id +
      '?append_to_response=images,credits&language=pt-BR'

    return this.httpClient.get(url, this.obterAutorizacao())
      .pipe(
        map((pessoa: any) => this.mapeador.mapearPessoa(pessoa)),
      )
  }
}


