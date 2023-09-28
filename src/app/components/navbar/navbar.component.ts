import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  nomeParaPesquisar?: string

  constructor(private router: Router) { }

  buscarPorNome() {
    this.router.navigate(['lista/pesquisa', this.nomeParaPesquisar, '1'])
  }

}
