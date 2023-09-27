import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filme, IFilmeFavorito } from 'src/app/models/filme';
import { FilmeHttpService } from 'src/app/services/http/filme-http.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
  filme?: Filme
  favorito: boolean = false;
  avaliacao: number = 0
  diretor?: string;
  produtor?: string;
  trailerUrl?: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('')

  constructor(private route: ActivatedRoute, private serviceHttp: FilmeHttpService, private sanitizer: DomSanitizer, private localStorage: LocalStorageService) {
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
      })
  }

  public adicionarFavoritos() {
    this.favorito = !this.favorito;

    let filme: IFilmeFavorito = {
      id: this.filme!.id,
      titulo: this.filme!.titulo
    }

    this.localStorage.favoritar(filme)
  }

}
