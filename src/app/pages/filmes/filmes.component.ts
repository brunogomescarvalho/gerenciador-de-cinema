import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  @Input({ required: true }) categoria!: Parametro


  constructor(private service: FilmeHttpService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.obterLista(this.categoria, '1')
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

  public mudarPagina(pg: number) {
    this.obterLista(this.categoria, String(pg))
  }

  public obterDetalhes(filme: Filme) {
    this.router.navigate(['detalhes', filme.id])
  }
}