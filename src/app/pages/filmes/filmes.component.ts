import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Parametro } from 'src/app/models/Parametro';
import { Filme, Genero } from 'src/app/models/filme';
import { FilmeHttpService } from 'src/app/services/http/filme-http.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.css']
})
export class FilmesComponent implements OnInit, OnChanges {

  filmes!: Filme[]

  @Input() genero?: Genero

  @Input({ required: true }) categoria!: Parametro


  constructor(private service: FilmeHttpService, private router: Router, public route: ActivatedRoute) { }
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['genero'] && !changes['genero'].firstChange)
      this.obterLista(this.categoria, '1')
  }

  ngOnInit() {
    this.obterLista(this.categoria, '1')
  }

  private obterLista(categoria: Parametro, pagina: string) {
    let observable = new Observable<Filme[]>()

    switch (categoria) {
      case 'populares': observable = this.service.obterFilmesPopulares(pagina); break
      case 'novidades': observable = this.service.obterFilmesLancamentos(pagina); break
      case 'recomendados': observable = this.service.obterFilmesRecomendados(pagina); break
      case 'genero': observable = this.service.obterPorGenero(this.genero!.id.toString(), pagina);break
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