import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NalogComponent } from './korisnik-funkcionalnosti/moj-nalog/nalog/nalog.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PregledComponent } from './nekretnine-funkcionalnosti/pregled/pregled.component';
import { DetaljiComponent } from './nekretnine-funkcionalnosti/detalji/detalji.component';
import { MojeNekretnineComponent } from './nekretnine-funkcionalnosti/moje-nekretnine/moje-nekretnine.component';
import { AzurirajNekretninuComponent } from './nekretnine-funkcionalnosti/azuriraj-nekretninu/azuriraj-nekretninu.component';
import { AgentPocetnaComponent } from './agent-funkcionalnosti/agent-pocetna/agent-pocetna.component';
import { AdminKorisniciCrudComponent } from './admin-funkcionalnosti/admin-korisnici-crud/admin-korisnici-crud.component';
import { KorisniciPregledComponent } from './admin-funkcionalnosti/korisnici-pregled/korisnici-pregled.component';
import { KorisniciAzurirajComponent } from './admin-funkcionalnosti/korisnici-azuriraj/korisnici-azuriraj.component';
import { PorukaPocetnaComponent } from './poruka-funkcionalnost/poruka-pocetna/poruka-pocetna.component';
import { PorukaPregledJedneKonverzacijeComponent } from './poruka-funkcionalnost/poruka-pregled-jedne-konverzacije/poruka-pregled-jedne-konverzacije.component';
import { ProdajaIznajmljivanjePrihodComponent } from './nekretnine-funkcionalnosti/prodaja-iznajmljivanje-prihod/prodaja-iznajmljivanje-prihod.component';
const routes: Routes = [
  {path: '', component: KorisnikComponent},
  {path: 'login', component: LoginComponent },
  {path: 'korisnik', component: KorisnikComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'moj-nalog', component:NalogComponent},
  {path: 'nekretnine-pregled', component: PregledComponent},
  {path: 'nekretnine-detalji/:id', component: DetaljiComponent},
  {path: 'azuriraj-nekretninu/:id', component: AzurirajNekretninuComponent},
  {path: 'moje-nekretnine', component: MojeNekretnineComponent},
  {path: 'agent-pocetna', component: AgentPocetnaComponent},
  {path: 'admin-pocetna', component: AgentPocetnaComponent},
  {path: 'korisnici-pregled', component: KorisniciPregledComponent},
  {path: 'korisnici-azuriraj/:username', component: KorisniciAzurirajComponent},
  {path: 'poruke', component: PorukaPocetnaComponent},
  {path: 'konverzacija-pregled/:id', component: PorukaPregledJedneKonverzacijeComponent},
  {path: 'prodaja-iznajmljivanje-prihod', component: ProdajaIznajmljivanjePrihodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
