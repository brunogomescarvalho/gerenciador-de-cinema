import { Injectable } from "@angular/core"
import { Filme } from "src/app/models/filme"
import { Pessoa } from "src/app/models/pessoa"
@Injectable({
    providedIn: 'root'
})

export class Mapeador {
    public filmeResumido(obj: any) {
        return new Filme(
            obj.id,
            obj.title,
            "https://image.tmdb.org/t/p/original" + obj.poster_path,
            obj.overview,
            "https://image.tmdb.org/t/p/original" + obj.backdrop_path
        )

    }

    public filmeDetalhes(obj: any) {
        return new Filme(
            obj.id,
            obj.title,
            "https://image.tmdb.org/t/p/original" + obj.poster_path,
            obj.overview,
            "https://image.tmdb.org/t/p/original" + obj.backdrop_path,
            "https://www.youtube.com/embed/" + obj.videos?.results[0]?.key,
            obj.release_date,
            obj.vote_average,
            obj.credits.cast.filter((x: any) => x.profile_path != null).map((elenco: any) => new Pessoa(elenco.id, elenco.name, "https://image.tmdb.org/t/p/original" + elenco.profile_path)).slice(0, 10),
            obj.credits.crew.filter((x: any) => x.job == 'Producer').map((produtor: any) => new Pessoa(produtor.id, produtor.name, "https://image.tmdb.org/t/p/original" + produtor.profile_path)).slice(0, 10),
            obj.credits.crew.filter((x: any) => x.job == 'Director').map((diretor: any) => new Pessoa(diretor.id, diretor.name, "https://image.tmdb.org/t/p/original" + diretor.profile_path)).slice(0, 10),
            obj.vote_count,
            obj.genres,

        )
    }

    public mapearPessoa(obj: any) {
        return new Pessoa(
            obj.id,
            obj.name,
            "https://image.tmdb.org/t/p/original" + obj.profile_path,
            obj.place_of_birth,
            obj.credits,
            obj.biography,
            obj.birthday,
            obj.images.profiles,

        )
    }
}
