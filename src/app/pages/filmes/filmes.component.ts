import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Filme } from 'src/app/models/filme';

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
