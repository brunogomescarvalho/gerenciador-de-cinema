export class Pessoa {
    id!: number;
    nome!: string;
    poster!: string;
    localNascimento?: string
    obras?: any
    biografia?: string
    dataNascimento?: string
    dataFalecimento?: string
    imagensProfiles?: any[]

    constructor(id: number,
        nome: string,
        imagem: string,
        localNascimento?: string,
        obras?: any,
        biografia?: string,
        dataNascimento?: string,
        dataFalecimento?: string,
        imagensProfiles?: any[]) {
        this.id = id
        this.nome = nome
        this.localNascimento = localNascimento
        this.poster = imagem
        this.obras = obras
        this.biografia = biografia
        this.dataNascimento = dataNascimento
        this.dataFalecimento = dataFalecimento
        this.imagensProfiles = imagensProfiles
    }

}
