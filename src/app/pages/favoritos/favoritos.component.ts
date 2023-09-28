import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { Filme } from 'src/app/models/filme';
import { Pessoa } from 'src/app/models/pessoa';
import { FilmeHttpService } from 'src/app/services/http/filme-http.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  favoritos: Filme[] | Pessoa[] = []
  filmes: Filme[] = [];
  elenco: Pessoa[] = [];

  constructor(private localStorage: LocalStorageService, private service: FilmeHttpService, private router: Router) { }

  ngOnInit(): void {
    this.obterFavoritos();
  }

  public obterDetalhes(dado: Filme | Pessoa) {
    if (this.filmes.includes(dado))
      this.router.navigate(['detalhes', dado.id])
    else
      this.router.navigate(['elenco', dado.id])

  }

  private obterFavoritos() {
    const favoritos = this.localStorage.obterDados();
    this.service.obterFavoritos(favoritos).subscribe(filmes => { this.filmes = filmes; filmes.map(i => this.favoritos.push(i)) })
    this.service.obterElencoFavoritos(favoritos).subscribe(elenco => { this.elenco = elenco; elenco.map(i => this.favoritos.push(i)) })
  }

}


