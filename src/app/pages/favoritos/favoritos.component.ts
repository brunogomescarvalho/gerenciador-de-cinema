import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  favoritos: any[] = []
  filmes: Filme[] = [];
  elenco: Pessoa[] = [];

  constructor(private localStorage: LocalStorageService, private service: FilmeHttpService, private router: Router) { }

  ngOnInit(): void {
    this.obterFavoritos();
  }

  public obterDetalhes(dado: Filme | Pessoa) {
    const destino = this.filmes.includes(dado) ? 'detalhes' : 'elenco'
    this.router.navigate([destino, dado.id])
  }

  private obterFavoritos() {
    const favoritos = this.localStorage.obterDados();

    if (favoritos.length == 0) return

    const filmes = favoritos.filter((x: any) => x.tipo == 'filme').map(((f: any) => new Filme(f.id, f.nome, f.poster)))
    this.filmes = filmes;
    this.favoritos.push(...filmes);

    const elenco = favoritos.filter((x: any) => x.tipo == 'elenco').map(((e: any) => new Pessoa(e.id, e.nome, e.poster)))
    this.elenco = elenco;
    this.favoritos.push(...elenco);
  };
}






