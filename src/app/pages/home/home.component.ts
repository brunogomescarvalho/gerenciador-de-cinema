import { Component} from '@angular/core';
import { Router } from '@angular/router';

import { Filme } from 'src/app/models/filme';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  nomeParaPesquisar?: string

  constructor( private router: Router) { }

  ngOnInit(): void {

  }

  mostrarDetalhes(filme: Filme) {
    this.router.navigate(['detalhes', filme.id])
  }

}



