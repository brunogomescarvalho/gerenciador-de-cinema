import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filme, IFavorito } from 'src/app/models/filme';
import { FilmeHttpService } from 'src/app/services/http/filme-http.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { Pessoa } from 'src/app/models/pessoa';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
  filme?: Filme

  favorito: boolean = false;
  avaliacao: number = 0
  diretor?: Pessoa;
  produtor?: Pessoa;
  trailerUrl?: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('')
  elenco?: Pessoa[];

  constructor( private router: Router, private route: ActivatedRoute, private serviceHttp: FilmeHttpService, private sanitizer: DomSanitizer, private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
   const id = this.route.snapshot.params['id']
   this.obterFilme(id)
  }

  private obterFilme(id: number) {
    this.serviceHttp.obterPorId(id)
      .subscribe(res => {
        this.filme = res;
        this.favorito = this.localStorage.ehFavorito(this.filme);
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.filme.trailer!)
        this.avaliacao = parseFloat((this.filme!.avaliacao! / 2).toFixed(2));
        this.diretor = Array.from(this.filme?.diretores!)[0]
        this.produtor = Array.from(this.filme?.produtores!)[0]
        this.elenco = Array.from(this.filme.elenco!)
      })
  }

  public adicionarFavoritos() {
    this.favorito = !this.favorito;

    let filme: IFavorito = {
      id: this.filme!.id,
      nome: this.filme!.nome,
      tipo: 'filme'
    }

    this.localStorage.favoritar(filme)
  }

  public irParaDetalhes(ator: Pessoa) {
    this.router.navigate(['/elenco', ator.id])
  }

}
