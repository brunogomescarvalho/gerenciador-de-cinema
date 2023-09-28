import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';
import { FilmesComponent } from './pages/filmes/filmes.component';
import { PessoasComponent } from './pages/pessoas/pessoas.component';

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
    component: DetalhesComponent
  },
  {
    path: 'elenco/:id',
    component: PessoasComponent
  },

  {
    path: 'lista',
    children: [
      {
        path: ':categoria/:pagina',
        component: FilmesComponent
      },
      {
        path: 'pesquisa/:nome/:pagina',
        component: PesquisaComponent
      },
      {
        path: 'favoritos',
        component: FavoritosComponent
      }]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
