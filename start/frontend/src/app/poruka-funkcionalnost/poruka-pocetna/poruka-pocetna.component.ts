import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-poruka-pocetna',
  templateUrl: './poruka-pocetna.component.html',
  styleUrls: ['./poruka-pocetna.component.css']
})
export class PorukaPocetnaComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user == null){
      alert("Morate bili logovani kako bi ste koristili ove funkcionalnosti");
      this.ruter.navigate(['/login']);
    }
    this.pregledSvihPoruka =false
    this.novaPoruka = false;
    this.arhiva = false;
  }

  user: User;
  arhiva: Boolean;
  novaPoruka:Boolean;
  pregledSvihPoruka: Boolean;
  
  changepregledSvihPoruka(){
    this.pregledSvihPoruka = true;
    this.novaPoruka = false;
    this.arhiva = false;
  }

  changeNovaPoruka(){
    this.novaPoruka = true;
    this.arhiva = false;
    this.pregledSvihPoruka = false;
  }

  changeArhiva(){
    this.arhiva = true;
    this.novaPoruka = false;
    this.pregledSvihPoruka = false;
  }

}
