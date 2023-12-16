import { Type } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
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
export class FavoritosComponent {
  @Input() favoritos?: any[]


  constructor(private localStorage: LocalStorageService, private router: Router) { }

  public obterDetalhes(dado: Filme | Pessoa) {
    const destino = this.localStorage.ehFilme(dado) ? 'detalhes' : 'elenco'
    this.router.navigate([destino, dado.id])
  }


}






