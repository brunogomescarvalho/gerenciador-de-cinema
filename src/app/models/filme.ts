export interface IFilmeFavorito {
    id: number
    titulo: string
}

export class Filme {
    id: number;
    titulo: string;
    poster: string;
    backdrop?: string;
    data?: string;
    avaliacao?: number;
    trailer?: string;
    elenco?: string[];
    produtores?: string[];
    diretores?: string[];
    votos?: number
    generos?: any[];
    resumo?: string

    constructor(
        id: number,
        titulo: string,
        resumo: string,
        poster: string,
        backdrop: string,
        trailer?: string,
        data?: string,
        avaliacao?: number,
        elenco?: string[],
        produtores?: string[],
        diretores?: string[],
        votos?: number,
        generos?: any,
    ) {
        this.id = id;
        this.titulo = titulo;
        this.poster = poster;
        this.backdrop = backdrop;
        this.resumo = resumo
        this.elenco = elenco;
        this.produtores = produtores;
        this.diretores = diretores;
        this.generos = generos;
        this.data = data;
        this.trailer = trailer;
        this.votos = votos;
        this.avaliacao = avaliacao;

    }

}


