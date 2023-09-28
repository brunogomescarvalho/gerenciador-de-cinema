import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Parametro } from 'src/app/models/Parametro';
import { Filme } from 'src/app/models/filme';
import { FilmeHttpService } from 'src/app/services/http/filme-http.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.css']
})
export class FilmesComponent implements OnInit {

  filmes!: Filme[]

  categoria!: Parametro

  constructor(private service: FilmeHttpService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.categoria = params['categoria']
      this.obterLista(this.categoria, params['pagina']);
    })
  }

  public obterDetalhes(filme: Filme) {
    this.router.navigate(['detalhes', filme.id])
  }

  private obterLista(categoria: Parametro, pagina: string) {
    let observable = new Observable<Filme[]>()

    switch (categoria) {
      case 'populares': observable = this.service.obterFilmesPopulares(pagina); break
      case 'novidades': observable = this.service.obterFilmesLancamentos(pagina); break
      case 'recomendados': observable = this.service.obterFilmesRecomendados(pagina); break
    }

    observable.subscribe(filmes => this.filmes = filmes)
  }

  public mudarPagina(pg: string) {
    this.router.navigate([this.categoria, pg], { relativeTo: this.route.parent });
  }
}