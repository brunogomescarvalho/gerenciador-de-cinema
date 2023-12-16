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
export class FilmesComponent {

  @Input({ required: true }) filmes!: Observable<Filme[]>

  constructor(private router: Router, public route: ActivatedRoute) { }

  public obterDetalhes(filme: Filme) {
    this.router.navigate(['detalhes', filme.id])
  }

}
