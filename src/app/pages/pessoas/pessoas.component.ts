import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filme, IFavorito } from 'src/app/models/filme';
import { Pessoa } from 'src/app/models/pessoa';
import { FilmeHttpService } from 'src/app/services/http/filme-http.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {
  pessoa?: Pessoa
  favorito: boolean = false;
  imagensAlternativas: string[] = ['https://image.tmdb.org/t/p/original']
  constructor(private route: ActivatedRoute, private router: Router, private service: FilmeHttpService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.pessoa = this.route.snapshot.data['pessoa']
    this.favorito = this.localStorage.ehFavorito(this.pessoa!);
    this.obterImagemAlternativa()

  }

  public adicionarFavoritos() {
    this.favorito = !this.favorito;

    let pessoa: IFavorito = {
      id: this.pessoa!.id,
      nome: this.pessoa!.nome,
      poster: this.pessoa!.poster,
      tipo: 'elenco'
    }

    this.localStorage.alterarStatusFavorito(pessoa)
  }

  obterDetalhesFilmesRelacionados(filme: Filme) {
    this.router.navigate(['/detalhes', filme.id])
  }
  obterImagemAlternativa(): void {
    this.imagensAlternativas = this.pessoa?.obras
      .filter((x: any) => x.backdrop && !x.backdrop.endsWith('null'))
      .map((x: any) => x.backdrop).slice(0, 6);
  }
}

