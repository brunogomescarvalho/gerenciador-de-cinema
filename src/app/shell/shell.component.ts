import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Parametro } from '../models/Parametro';
import { SideNavService } from '../services/sideNav/side-nav.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent {

  @ViewChild('drawer') drawer!: MatSidenav;

  private breakpointObserver = inject(BreakpointObserver);

  nome!: string

  ehHandSet?: boolean

  constructor(private router: Router, private telaService: SideNavService, private route: ActivatedRoute) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    )


  ngAfterViewInit() {
    this.isHandset$.subscribe(isHandset => {
      this.ehHandSet = isHandset
    });
  }

  onSubmit() {
    this.router.navigate(['/pesquisa', this.nome, 1])
    this.nome = "";
  }

  mudarCategoria(categoria: Parametro) {
    let url = this.router.url.split('/')[1]

    if (url != 'home')
      this.router.navigate(['/home'])

    this.telaService.alterarCategoria(categoria)

    if (this.ehHandSet) {
      this.drawer.close();
    }
  }

}