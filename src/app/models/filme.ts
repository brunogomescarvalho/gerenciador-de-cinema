import { Pessoa } from "./pessoa";

export interface IFavorito {
    id: number
    nome: string
    tipo: string
}

export class Genero {
    id: number
    nome: string

    constructor(id: number, nome: string) {
        this.id = id;
        this.nome = nome
    }

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
    generos?: Genero[];
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
        generos?: Genero[],
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


