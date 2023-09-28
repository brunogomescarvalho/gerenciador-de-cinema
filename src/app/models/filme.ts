import { Pessoa } from "./pessoa";

export interface IFavorito {
    id: number
    nome: string
    tipo: string
}

export class Filme {
    id!: number;
    nome!: string;
    poster!: string;
    backdrop?: string;
    data?: string;
    avaliacao?: number;
    trailer?: string;
    elenco?: Pessoa[];
    produtores?: Pessoa[];
    diretores?: Pessoa[];
    votos?: number
    generos?: any[];
    resumo?: string

    constructor(
        id: number,
        titulo: string,
        poster: string,
        resumo: string,
        backdrop: string,
        trailer?: string,
        data?: string,
        avaliacao?: number,
        elenco?: Pessoa[],
        produtores?: Pessoa[],
        diretores?: Pessoa[],
        votos?: number,
        generos?: any,
    ) {
      
        this.id = id;
        this.nome = titulo;
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


