import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Filme } from 'src/app/models/filme';
import { Pessoa } from 'src/app/models/pessoa';
import { FilmeHttpService } from 'src/app/services/http/filme-http.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {
  nomePesquisa!: string
  pagina!:number
  filmes!: Filme[]
  pessoas!: Pessoa[]
  resultado: Filme[] & Pessoa[] = []

  constructor(private service: FilmeHttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.nomePesquisa = this.route.snapshot.params['nome']
    this.pagina = this.route.snapshot.params['pagina']
    this.obterLista(this.nomePesquisa, this.pagina.toString());

  }

  public obterDetalhes(dado: Filme) {
    if (this.filmes.includes(dado))
      this.router.navigate(['detalhes', dado.id])
    else
      this.router.navigate(['elenco', dado.id])

  }

  private obterLista(nome: string, pagina: string) {
    this.service.obterPorPesquisa(nome, pagina).subscribe((data: any) => {
      this.filmes = data[0];
      this.pessoas = data[1];
      this.resultado = this.filmes.concat(this.pessoas)
    })
  }

  public mudarPagina(pg: number) {
    this.obterLista(this.nomePesquisa, pg.toString())
    this.router.navigate(['/pesquisa', this.nomePesquisa, pg]);
  }
}
