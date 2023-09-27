import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Filme } from 'src/app/models/filme';
import { FilmeHttpService } from 'src/app/services/http/filme-http.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  filmes!: Filme[]

  constructor(private localStorage: LocalStorageService, private service: FilmeHttpService, private router: Router) { }

  ngOnInit(): void {
    this.obterFavoritos().subscribe(res => this.filmes = res )
  }

  public obterDetalhes(filme: Filme) {
    this.router.navigate(['detalhes', filme.id])
  }


  private obterFavoritos(): Observable<Filme[]> {
    const favoritos = this.localStorage.obterDados();
  
    if (Array.isArray(favoritos)) {
      return this.service.obterFavoritos(favoritos);
    }
  
    return of([]);
  }
  
}
