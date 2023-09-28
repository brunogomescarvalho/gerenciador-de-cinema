import { Injectable } from "@angular/core"
import { forkJoin } from "rxjs"
import { Filme } from "src/app/models/filme"
import { Pessoa } from "src/app/models/pessoa"
@Injectable({
    providedIn: 'root'
})



export class Mapeador {
    private imgUrl: string = "https://image.tmdb.org/t/p/original"
    public filmeResumido(obj: any) {
        return new Filme(
            obj.id,
            obj.title,
            this.imgUrl + obj.poster_path,
            obj.overview,
            this.imgUrl + obj.backdrop_path
        )

    }

    public filmeDetalhes(obj: any) {
        return new Filme(
            obj.id,
            obj.title,
            this.imgUrl + obj.poster_path,
            obj.overview,
            this.imgUrl + obj.backdrop_path,
            "https://www.youtube.com/embed/" + obj.videos?.results[0]?.key,
            obj.release_date,
            obj.vote_average,
            obj.credits.cast.filter((x: any) => x.profile_path != null).map((elenco: any) => new Pessoa(elenco.id, elenco.name, this.imgUrl + elenco.profile_path)).slice(0, 10),
            obj.credits.crew.filter((x: any) => x.job == 'Producer').map((produtor: any) => new Pessoa(produtor.id, produtor.name, this.imgUrl + produtor.profile_path)).slice(0, 10),
            obj.credits.crew.filter((x: any) => x.job == 'Director').map((diretor: any) => new Pessoa(diretor.id, diretor.name, this.imgUrl + diretor.profile_path)).slice(0, 10),
            obj.vote_count,
            obj.genres,

        )
    }

    public mapearPessoa(obj: any) {
        return new Pessoa(
            obj.id,
            obj.name,
            this.imgUrl + obj.profile_path,
            obj.place_of_birth,
            obj.credits?.cast
                .filter((poster: any) => poster.poster_path != null)
                .map((filme: any) =>
                    new Filme(filme.id, filme.title, this.imgUrl + filme.poster_path, filme.overview, this.imgUrl + filme.backdrop_path)
                ),
            obj.biography,
            obj.birthday,
            obj.images?.profiles
        );
    }

    public mapearListaFilmes(lista: any[]): Filme[] {
        return lista?.map((o: any) => { return this.filmeResumido(o) })
    }

    public mapearListaPessoas(lista: any[]): Pessoa[] {
        return lista?.map(p => { return this.mapearPessoa(p) })
    }

    public mapearPesquisa(result: any[]) {
        const filmes = result.filter(item => item.media_type === 'movie' && item.poster_path != null);
        const pessoas = result.filter(item => item.media_type === 'person' && item.profile_path != null);

        return [this.mapearListaFilmes(filmes), this.mapearListaPessoas(pessoas)];
    }


}

