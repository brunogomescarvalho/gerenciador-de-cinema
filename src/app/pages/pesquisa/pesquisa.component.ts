import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Filme } from 'src/app/models/filme';
import { FilmeHttpService } from 'src/app/services/http/filme-http.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {
  filmes!: Filme[]
  nomePesquisa!: string

  constructor(private service: FilmeHttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.nomePesquisa = params['nome']
      this.obterLista(this.nomePesquisa, params['pagina']);
    })
  }

  public obterDetalhes(filme: Filme) {
    this.router.navigate(['detalhes', filme.id])
  }

  private obterLista(nome: string, pagina: string) {
    this.service.obterPorPesquisa(nome, pagina)
      .subscribe((res: Filme[]) => this.filmes = res.filter(filme => !filme.poster?.endsWith('null')))
  }

  public mudarPagina(pg: string) {
    this.router.navigate(['/lista/pesquisa', this.nomePesquisa, pg]);
  }
}
