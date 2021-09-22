import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-moje-nekretnine',
  templateUrl: './moje-nekretnine.component.html',
  styleUrls: ['./moje-nekretnine.component.css']
})
export class MojeNekretnineComponent implements OnInit {

  constructor(private ruter: Router) { }

  user: User;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user == null){
      alert("Morate bili logovani kako bi ste koristili ove funkcionalnosti");
      this.ruter.navigate(['/login']);
    }
    this.pregledSvihNekretnina =false
    this.dodajNekretninu = false;
    this.pregledNekretnina = false;
  }

  dodajNekretninu: Boolean;
  pregledNekretnina:Boolean;
  pregledSvihNekretnina: Boolean;
  
  changedodajNekretninu(){
    this.dodajNekretninu = true;
    this.pregledNekretnina = false;
    this.pregledSvihNekretnina = false;
  }

  changepregledNekretnina(){
    this.pregledNekretnina = true;
    this.dodajNekretninu = false;
    this.pregledSvihNekretnina = false;
  }

  changepregledSvihNekretnina(){
    this.pregledNekretnina = false;
    this.dodajNekretninu = false;
    this.pregledSvihNekretnina = true;
  }
}
