import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css'],

})
export class PaginacaoComponent implements OnInit {

  page: number = 1;

  @Input() collectionSize = 200

  @Output() onEnviarPagina = new EventEmitter();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.page = params['pagina'];
    })
  }

  pageChanged(event: number): void {
      this.onEnviarPagina.emit(event);
  }

}


