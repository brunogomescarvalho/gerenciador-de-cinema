import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Filme, Genero } from 'src/app/models/filme';
import { FilmeHttpService } from 'src/app/services/http/filme-http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  nomeParaPesquisar?: string
  activeId: number = 2
  generos!: Genero[]
  genero!: Genero

  constructor(private router: Router, private service: FilmeHttpService) { }

  ngOnInit(): void {
    this.service.obterGeneros().subscribe(res => { this.generos = res; console.log(this.generos) })
  }

  mostrarDetalhes(filme: Filme) {
    this.router.navigate(['detalhes', filme.id])
  }

  carregarPaginaGeneros(genero: Genero) {
    this.genero = genero
    this.activeId =5
    
  }

  carregarPagina(nr:number){
    this.activeId = nr
  }
  
}



