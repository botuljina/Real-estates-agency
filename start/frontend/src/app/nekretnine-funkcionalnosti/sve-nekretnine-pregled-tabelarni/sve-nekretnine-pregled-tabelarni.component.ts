import { Component, OnInit } from '@angular/core';
import { Nekretnina } from 'src/app/model/nekretnina.model';
import { User } from 'src/app/model/user.model';
import { NekretnineService } from 'src/app/nekretnine.service';
@Component({
  selector: 'app-sve-nekretnine-pregled-tabelarni',
  templateUrl: './sve-nekretnine-pregled-tabelarni.component.html',
  styleUrls: ['./sve-nekretnine-pregled-tabelarni.component.css']
})
export class SveNekretninePregledTabelarniComponent implements OnInit {

  constructor(private nekretninaService: NekretnineService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.nekretninaService.getNekretnine().subscribe((result: Nekretnina[]) => {

      result.forEach(nekretnina => {       
          this.nekretnine.push(nekretnina);
      });
    });
  }
  user: User;
  nekretnine: Nekretnina[] = []
  porukaSucces:string;
  poruka:string;

  odobri(id){
    this.nekretninaService.odobri(id).subscribe((object)=>{
                
      if (object['odobreno'] != 'ok') {
        this.poruka = "Greska prilikom odobravanja nekretnine";
      }
      else {
        this.porukaSucces = "nekretnina uspesno odobrena";
        this.nekretnine = [];
        this.nekretninaService.getNekretnine().subscribe((result: Nekretnina[]) => {
          result.forEach(nekretnina => {       
              this.nekretnine.push(nekretnina);
          });
        });
      }
  })
  }
  
  promovisi(id){
    this.nekretninaService.promovisi(id).subscribe((object)=>{
                
      if (object['promovisano'] != 'ok') {
        this.poruka = "Greska prilikom odobravanja nekretnine";
      }
      else {
        this.porukaSucces = "nekretnina uspesno promovisana";
        this.nekretnine = [];
        this.nekretninaService.getNekretnine().subscribe((result: Nekretnina[]) => {
          result.forEach(nekretnina => {       
              this.nekretnine.push(nekretnina);
          });
        });
      }
  })
  }
  //[UKLANJANJE PROMOCIJE]
  ukloni(id){
    this.nekretninaService.ukloniPromociju(id).subscribe((object)=>{
                
      if (object['promovisano'] != 'ok') {
        this.poruka = "Greska prilikom odobravanja nekretnine";
      }
      else {
        this.porukaSucces = "promocija sa date nekretnine uklonjena";
        this.nekretnine = [];
        this.nekretninaService.getNekretnine().subscribe((result: Nekretnina[]) => {
          result.forEach(nekretnina => {       
              this.nekretnine.push(nekretnina);
          });
        });
      }
  })
  }
}
