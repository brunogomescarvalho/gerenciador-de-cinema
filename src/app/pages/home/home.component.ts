import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Filme } from 'src/app/models/filme';
import { FilmeHttpService } from 'src/app/services/http/filme-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filmesPopulares?: Filme[]
  filmesNovidades?: Filme[]
  filmesRecomendados?: Filme[]

  constructor(private service: FilmeHttpService, private router: Router) { }

  ngOnInit(): void {

    forkJoin({
      populares: this.service.obterFilmesPopulares('2'),
      novidades: this.service.obterFilmesLancamentos('1'),
      recomendados: this.service.obterFilmesRecomendados('2')
    }).subscribe(res => {
      this.filmesPopulares = res.populares
      this.filmesNovidades = res.novidades
      this.filmesRecomendados = res.recomendados
    })

  }

  mostrarDetalhes(filme: Filme) {
    this.router.navigate(['detalhes', filme.id])
  }

}
