import { Injectable } from "@angular/core"
import { Filme, Genero } from "src/app/models/filme"
import { Pessoa } from "src/app/models/pessoa"
@Injectable({
    providedIn: 'root'
})

export class Mapeador {
    private imgUrl: string = "https://image.tmdb.org/t/p/original"
    private filmeResumido(obj: any) {
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
            obj.images?.profiles.map((img: any) => img.file_path = this.imgUrl + img.file_path
            )
        );
    }

    public mapearListaFilmes(lista: any[]): Filme[] {
        return lista?.filter(x => x.poster_path != null).map((filme: any) => { return this.filmeResumido(filme) })
    }

    public mapearListaPessoas(lista: any[]): Pessoa[] {
        return lista?.map(pessoa => { return this.mapearPessoa(pessoa) })
    }

    public mapearPesquisa(obj: any[]) {
        const filmes = obj.filter(item => item.media_type === 'movie' && item.poster_path != null);
        const pessoas = obj.filter(item => item.media_type === 'person' && item.profile_path != null);

        return {
            filmes: this.mapearListaFilmes(filmes),
            pessoas: this.mapearListaPessoas(pessoas)
        };
    }

    public mapearGeneros(obj: any[]) {
        return obj.map((x: any) => {
            return {
                id: x.id,
                nome: x.name
            } as Genero
        })
    }


}


