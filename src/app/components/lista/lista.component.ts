import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filme } from 'src/app/models/filme';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {

  @Input({ required: true }) filmes!: Filme[];

  @Output() onFilmeSelecionado = new EventEmitter<Filme>();

  public solicitarDetalhes(filme: Filme) {
    this.onFilmeSelecionado.emit(filme)
  }

}


