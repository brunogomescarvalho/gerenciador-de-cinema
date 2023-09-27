import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Filme, IFilmeFavorito } from '../../models/filme';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmeHttpService {

  constructor(private httpClient: HttpClient) { }

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

  public obterFavoritos(favoritos: IFilmeFavorito[]): Observable<Filme[]> {
    const chamadasHTTP = favoritos.map((x) => this.obterPorId(x.id));
    return forkJoin(chamadasHTTP);
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
        map((x: any) => this.mapearFilme(x)),
      )
  }

  private obterUrl(tipoBusca: string, pagina: string) {
    return `${this.apiUrl}${tipoBusca}?language=pt-BR&page=${pagina}`
  }

  private mapearListaFilmes(lista: any[]): Filme[] {
    return lista?.map((o: any) => {

      return this.obterFilmeResumido(o)
    })
  }

  private mapearFilme(obj: any) {
    return this.obterFilmeDetalhes(obj);
  }

  private obterFilmeResumido(obj: any) {
    return new Filme(
      obj.id,
      obj.title,
      "https://image.tmdb.org/t/p/original/" + obj.poster_path,
      "https://image.tmdb.org/t/p/original/" + obj.backdrop_path,
      obj.overview)

  }

  private obterFilmeDetalhes(obj: any) {
    return new Filme(
      obj.id,
      obj.title,
      "https://image.tmdb.org/t/p/original" + obj.poster_path,
      "https://image.tmdb.org/t/p/original/" + obj.backdrop_path,
      obj.overview,
      obj.release_date,
      obj.vote_average,
      obj.images,
      obj.videos.results,
      obj.credits.cast,
      obj.credits.crew,
      obj.vote_count,
      obj.genres,

    )
  }
}


