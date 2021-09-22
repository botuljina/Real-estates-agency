import { Component, OnInit } from '@angular/core';
import { Nekretnina } from 'src/app/model/nekretnina.model';
import { NekretnineService } from 'src/app/nekretnine.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dodaj-nekretninu',
  templateUrl: './dodaj-nekretninu.component.html',
  styleUrls: ['./dodaj-nekretninu.component.css']
})
export class DodajNekretninuComponent implements OnInit {

  constructor(private nekretninaService: NekretnineService,private ruter: Router) { }

  ngOnInit(): void {
    this.nekretnina = new Nekretnina();
    this.nekretnina.vlasnik = JSON.parse(localStorage.getItem('user')).username;
  }

  nekretnina: Nekretnina;
  galerija: FileList;
  poruka: string;
  sprat: Number;
  porukaSucces:string;

  handleFileInput(files: FileList) {
    this.galerija = files;
  }

  dodajNekretninu(){
    const data: FormData = new FormData();
    this.sprat = -1;
    if(this.nekretnina.tip =='zgrada')
    {
      this.sprat = this.nekretnina.sprat;
    }
    data.append("naziv", this.nekretnina.naziv.toString());
    data.append("grad", this.nekretnina.grad.toString());
    data.append("opstina", this.nekretnina.opstina.toString());
    data.append("ulica", this.nekretnina.ulica.toString());
    data.append("tip", this.nekretnina.tip.toString());
    data.append("brojSpratova", this.nekretnina.brojSpratova.toString());
    data.append("sprat", this.sprat.toString());
    data.append("kvadratura", this.nekretnina.kvadratura.toString());
    data.append("brojSoba", this.nekretnina.brojSoba.toString());
    data.append("jeNamestena", this.nekretnina.jeNamestena.toString());
    data.append("usluga", this.nekretnina.usluga.toString());
    data.append("cena", this.nekretnina.cena.toString());
    data.append("vlasnik", this.nekretnina.vlasnik.toString());
    if (this.galerija) {
      for (let i = 0; i < this.galerija.length; i++) {
        data.append("galerija", this.galerija.item(i));
      }
    }
    /*
    if (this.user.tip == "agent")
      data.append("vlasnik", "agencija");
    else if (this.user.tip == "korisnik")
      data.append("vlasnik", this.user.korisnickoIme);


    if (this.galerija) {
      for (let i = 0; i < this.galerija.length; i++) {
        data.append("galerija", this.galerija.item(i));
      }
    }
    else {

      alert("Neophodna je barem jedna slika");
      return;
    }
    */

    this.nekretninaService.dodajNekretninu(data).subscribe((object) => {

      if (object['dodavanje'] != 'ok') {
        this.poruka = "Greska prilikom dodavanja nekretnine";
      }
      else {
        this.porukaSucces = "Uspesno ste dodali nekretninu!";
      }

    }, (err) => { console.log(err) });
  }

}
