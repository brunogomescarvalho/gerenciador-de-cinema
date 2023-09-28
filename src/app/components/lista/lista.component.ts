import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filme } from 'src/app/models/filme';
import { Pessoa } from 'src/app/models/pessoa';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {

  @Input({ required: true }) dados!: Pessoa[] & Filme[];

  @Output() onCardSelecionado = new EventEmitter< Pessoa | Filme>();

  public solicitarDetalhes(filme:  Pessoa | Filme) {
    this.onCardSelecionado.emit(filme)
  }

}


