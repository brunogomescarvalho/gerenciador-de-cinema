import { Component, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gerenciador-de-cinema';
  nome!: string

  constructor(private router: Router) { }

  onSubmit() {
    this.router.navigate(['/pesquisa', this.nome, 1])
    this.nome = "";
  }
}
