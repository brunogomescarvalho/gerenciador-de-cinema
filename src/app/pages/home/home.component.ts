import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Parametro } from 'src/app/models/Parametro';

import { Filme, Genero } from 'src/app/models/filme';
import { FilmeHttpService } from 'src/app/services/http/filme-http.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { SideNavService } from 'src/app/services/sideNav/side-nav.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  nomeParaPesquisar?: string
  pagina: number = 1
  generos!: Genero[]
  genero?: Genero
  filmesPopulares?: Observable<Filme[]>
  filmesRecomendados?: Observable<Filme[]>
  filmesNovidades?: Observable<Filme[]>
  filmesFavoritos?: any
  filmesPorGenero?: Observable<Filme[]>
  categoria: Parametro = 'Novidades'


  constructor(
    private router: Router,
    private service: FilmeHttpService,
    private localStorage: LocalStorageService,
    private telaService: SideNavService) { }


  @ViewChild('tabs') tabs!: MatTabGroup;

  ngOnInit(): void {
     this.obterGeneros()

    this.categoria = this.telaService.verificarCategoriaAtual()

    if (this.categoria == 'Novidades')
      this.obterLista(this.categoria, '1')
  }

  private obterIndex(category: Parametro) {

    switch (category) {
      case "Novidades": return 0
      case "Populares": return 1
      case "Recomendados": return 2
      case "Gêneros": return 3
      case "Favoritos": return 4
    }
  }

  private obterGeneros() {
    this.service.obterGeneros().subscribe(res => {
      this.generos = res;
      this.genero = this.generos[0];

      this.telaService.receberCategoria()
      .subscribe(category => {
        const tabIndex = this.obterIndex(category);
        this.tabs.selectedIndex = tabIndex;
        this.tabs.focusTab(tabIndex!);

      })

    });
  }

  mostrarDetalhes(filme: Filme) {
    this.router.navigate(['detalhes', filme.id])
  }


  public mudarPagina(pg: number) {
    this.obterLista(this.categoria, String(pg))
    this.pagina = pg
  }

  public obterLista(categoria: any, pagina: string) {
    this.pagina = 1
    this.categoria = categoria

    switch (categoria) {
      case 'Populares': this.obterPopulares(pagina); break
      case 'Novidades': this.obterNovidades(pagina); break
      case 'Recomendados': this.obterRecomendados(pagina); break
      case 'Gêneros': this.obterGenero(pagina); break
      case 'Favoritos': this.obterFavoritos(); break
    }
  }

  buscarPorGenero(genero: Genero) {
    this.genero = genero
    this.obterGenero("1")
  }


  obterGenero(pagina: string) {
    this.filmesPorGenero = this.service.obterPorGenero(this.genero!.id.toString(), pagina);
  }
  obterRecomendados(pagina: string) {
    this.filmesRecomendados = this.service.obterFilmesRecomendados(pagina)
  }
  obterNovidades(pagina: string) {
    this.filmesNovidades = this.service.obterFilmesLancamentos(pagina)
  }
  obterPopulares(pagina: string) {
    this.filmesPopulares = this.service.obterFilmesPopulares(pagina)
  }

  obterFavoritos() {
    this.filmesFavoritos = this.localStorage.obterFavoritos()!
  }
}



