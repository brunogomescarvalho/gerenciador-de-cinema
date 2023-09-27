import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginacaoComponent } from './components/paginacao/paginacao.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { HttpClientModule } from '@angular/common/http'
import { NgbCarouselModule, NgbPaginationModule, NgbRatingModule, NgbScrollSpyModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { HomeComponent } from './pages/home/home.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { ListaComponent } from './components/lista/lista.component';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';
import { FormsModule } from '@angular/forms';
import { ListagemComponent } from './pages/listagem/listagem.component';
import { NgOptimizedImage } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    PaginacaoComponent,
    ListaComponent,
    NavbarComponent,
    CardComponent,
    DetalhesComponent,
    HomeComponent,
    FavoritosComponent,
    PesquisaComponent,
    ListagemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbRatingModule,
    NgbCarouselModule,
    NgbScrollSpyModule,
    NgbTooltipModule,
    NgOptimizedImage
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
