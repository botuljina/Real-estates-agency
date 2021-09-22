import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GalleriaModule } from 'primeng/galleria';
import { ChartModule } from 'primeng/chart';


import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component'; 
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NalogComponent } from './korisnik-funkcionalnosti/moj-nalog/nalog/nalog.component';
import { PregledComponent } from './nekretnine-funkcionalnosti/pregled/pregled.component';
import { DetaljiComponent } from './nekretnine-funkcionalnosti/detalji/detalji.component';
import { MojeNekretnineComponent } from './nekretnine-funkcionalnosti/moje-nekretnine/moje-nekretnine.component';
import { DodajNekretninuComponent } from './nekretnine-funkcionalnosti/dodaj-nekretninu/dodaj-nekretninu.component';
import { MojeNekretninePregledComponent } from './nekretnine-funkcionalnosti/moje-nekretnine-pregled/moje-nekretnine-pregled.component';
import { AgentPocetnaComponent } from './agent-funkcionalnosti/agent-pocetna/agent-pocetna.component';
import { AzurirajNekretninuComponent } from './nekretnine-funkcionalnosti/azuriraj-nekretninu/azuriraj-nekretninu.component';
import { SveNekretninePregledTabelarniComponent } from './nekretnine-funkcionalnosti/sve-nekretnine-pregled-tabelarni/sve-nekretnine-pregled-tabelarni.component';
import { AdminPocetnaComponent } from './admin-funkcionalnosti/admin-pocetna/admin-pocetna.component';
import { AdminKorisniciCrudComponent } from './admin-funkcionalnosti/admin-korisnici-crud/admin-korisnici-crud.component';
import { PocetnaStranaComponent } from './agent-funkcionalnosti/pocetna-strana/pocetna-strana.component';
import { KorisniciPregledComponent } from './admin-funkcionalnosti/korisnici-pregled/korisnici-pregled.component';
import { KorisniciDodajComponent } from './admin-funkcionalnosti/korisnici-dodaj/korisnici-dodaj.component';
import { KorisniciAzurirajComponent } from './admin-funkcionalnosti/korisnici-azuriraj/korisnici-azuriraj.component';
import { PorukaPocetnaComponent } from './poruka-funkcionalnost/poruka-pocetna/poruka-pocetna.component';
import { PorukaDodajComponent } from './poruka-funkcionalnost/poruka-dodaj/poruka-dodaj.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { PorukaPregledChatovaComponent } from './poruka-funkcionalnost/poruka-pregled-chatova/poruka-pregled-chatova.component';
import { PorukaPregledJedneKonverzacijeComponent } from './poruka-funkcionalnost/poruka-pregled-jedne-konverzacije/poruka-pregled-jedne-konverzacije.component';
import { PorukaPregledArhivaComponent } from './poruka-funkcionalnost/poruka-pregled-arhiva/poruka-pregled-arhiva.component';
import { ProdajaIznajmljivanjePrihodComponent } from './nekretnine-funkcionalnosti/prodaja-iznajmljivanje-prihod/prodaja-iznajmljivanje-prihod.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    KorisnikComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    ChangePasswordComponent,
    NalogComponent,
    PregledComponent,
    DetaljiComponent,
    MojeNekretnineComponent,
    DodajNekretninuComponent,
    MojeNekretninePregledComponent,
    AgentPocetnaComponent,
    AzurirajNekretninuComponent,
    SveNekretninePregledTabelarniComponent,
    PocetnaStranaComponent,
    AdminPocetnaComponent,
    AdminKorisniciCrudComponent,
    KorisniciPregledComponent,
    KorisniciDodajComponent,
    KorisniciAzurirajComponent,
    PorukaPocetnaComponent,
    PorukaDodajComponent,
    PorukaPregledChatovaComponent,
    PorukaPregledJedneKonverzacijeComponent,
    PorukaPregledArhivaComponent,
    ProdajaIznajmljivanjePrihodComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    ChartModule,
    GalleriaModule,
    InputTextareaModule,
    CardModule,
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
