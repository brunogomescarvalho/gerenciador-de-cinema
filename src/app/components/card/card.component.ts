import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filme } from 'src/app/models/filme';
import { Pessoa } from 'src/app/models/pessoa';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  
})
export class CardComponent {
  
  @Input() model!:  Pessoa | Filme

  @Output() onCardSelecionado = new EventEmitter< Pessoa | Filme>();

  public enviarSelecionado(model:  Pessoa | Filme) {
    this.onCardSelecionado.emit(model)
  }


}
