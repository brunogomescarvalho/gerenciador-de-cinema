export interface IFilmeFavorito {
    id: number
    titulo: string
}

export class Filme {
    id: number;
    titulo: string;
    poster?: string;
    backdrop?:string;
    data?: string;
    avaliacao?: number;
    imagens?: any[];
    videos?: any;
    elenco?: any[];
    producao? :any[];
    votos?: number
    generos?: any[];
    resumo?: string

    constructor(
        id: number,
        titulo: string,
        poster: string,
        backdrop:string,
        resumo: string,
        data?: string,
        avaliacao?: number,
        imagens?: any[],
        videos?: any,
        elenco?: any[],
        producao?: any[],
        votos?: number,
        generos?: any,
      ) {
        this.id = id;
        this.titulo = titulo;
        this.poster = poster;
        this.backdrop = backdrop;
        this.resumo = resumo
        this.elenco = elenco;
        this.producao = producao;
        this.generos = generos;
        this.data = data;
        this.imagens = imagens;
        this.videos = videos;
        this.votos = votos;
        this.avaliacao = avaliacao;
       
    }

}


