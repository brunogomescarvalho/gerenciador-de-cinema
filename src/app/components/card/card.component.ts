import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filme } from 'src/app/models/filme';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  
})
export class CardComponent {
  
  @Input() filme!: Filme

  @Output() onFilmeSelecionado = new EventEmitter<Filme>();

  public enviarFilme(filme: Filme) {
    this.onFilmeSelecionado.emit(filme)
  }

 
}
