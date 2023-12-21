import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';
import { PessoasComponent } from './pages/pessoas/pessoas.component';
import { FilmeHttpService } from './services/http/filme-http.service';

const filmeResolve = (route: ActivatedRouteSnapshot) => {
  let id = parseInt(route.params['id'])
  return inject(FilmeHttpService).obterPorId(id)
}

const pessoaResolve = (route: ActivatedRouteSnapshot) => {
  let id = parseInt(route.params['id'])
  return inject(FilmeHttpService).obterPessoaPorId(id)
}


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full"
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'detalhes/:id',
    component: DetalhesComponent,
    resolve: { filme: filmeResolve }
  },
  {
    path: 'elenco/:id',
    component: PessoasComponent,
    resolve: { pessoa: pessoaResolve }
  },
  {
    path: 'pesquisa/:nome/:pagina',
    component: PesquisaComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
