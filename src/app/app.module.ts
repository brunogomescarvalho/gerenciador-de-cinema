import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { HttpClientModule } from '@angular/common/http'
import { NgbCarouselModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbRatingModule, NgbScrollSpyModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { HomeComponent } from './pages/home/home.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { ListaComponent } from './components/lista/lista.component';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { PessoasComponent } from './pages/pessoas/pessoas.component';
import { FilmesComponent } from './pages/filmes/filmes.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellComponent } from './shell/shell.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,

    ListaComponent,
    CardComponent,
    DetalhesComponent,
    HomeComponent,
    FavoritosComponent,
    PesquisaComponent,
    PessoasComponent,
    FilmesComponent,
    ShellComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbRatingModule,
    NgbCarouselModule,
    NgbScrollSpyModule,
    NgbTooltipModule,
    NgOptimizedImage,
    NgbNavModule,
    NgbDropdownModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatSelectModule

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
