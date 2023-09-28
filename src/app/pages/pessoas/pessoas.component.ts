import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFavorito } from 'src/app/models/filme';
import { Pessoa } from 'src/app/models/pessoa';
import { FilmeHttpService } from 'src/app/services/http/filme-http.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {
  pessoa?: Pessoa
  favorito: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private service: FilmeHttpService, private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']

    this.service.obterPessoaPorId(id)
      .subscribe(pessoa => { this.pessoa = pessoa; console.log(pessoa) })

  }

  public adicionarFavoritos() {
    this.favorito = !this.favorito;

    let filme: IFavorito = {
      id: this.pessoa!.id,
      nome: this.pessoa!.nome,
      tipo:'elenco'
    }

    this.localStorage.favoritar(filme)
  }

}
