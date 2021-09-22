import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-korisnici-pregled',
  templateUrl: './korisnici-pregled.component.html',
  styleUrls: ['./korisnici-pregled.component.css']
})
export class KorisniciPregledComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user == null){
      alert("Morate bili logovani kako bi ste koristili ove funkcionalnosti");
      this.ruter.navigate(['/login']);
    }
    this.dodajKorisnika =false
    this.pregledSvihKorisinika = false;
  }
  user: User;
  dodajKorisnika: Boolean;
  pregledSvihKorisinika:Boolean;
  
  changedodajKorisnika(){
    this.dodajKorisnika = true;
    this.pregledSvihKorisinika = false;
  }

  changepregledKorisnika(){
    this.dodajKorisnika = false;
    this.pregledSvihKorisinika = true;
  }

 

}
