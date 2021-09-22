import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Nekretnina } from 'src/app/model/nekretnina.model';
import { NekretnineService } from 'src/app/nekretnine.service';
import { Router  } from '@angular/router';
import { User } from 'src/app/model/user.model';
@Component({
  selector: 'app-pregled',
  templateUrl: './pregled.component.html',
  styleUrls: ['./pregled.component.css']
})
export class PregledComponent implements OnInit {

  constructor(private ruter: Router,private nekretninaService: NekretnineService,private http: HttpClient) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.nekretninaService.getNekretnine().subscribe((result: Nekretnina[]) => {

      result.forEach(nekretnina => { 
          if(nekretnina.stanje == 'odobreno')       
                this.nekretnine.push(nekretnina);
          if(nekretnina.jePromovisana=='true'){
            this.nekretninePromovisane.push(nekretnina);
            this.imageObject.push({
              image: nekretnina.galerija[0],
              thumbImage: nekretnina.galerija[0],
              alt: 'alt of image',
              title: nekretnina.naziv
            })
          }
      });
      console.log(this.nekretnine)
    });
   
  }
  nekretnine: Nekretnina[] = []
  user: User;
  naziv: string;
  grad: string;
  opstina: string;
  ulica: string;
  tip: string;
  brojSpratova:Number;
  sprat:Number;
  kvadratura:Number;
  brojSoba: Number;
  jeNamestena: Boolean;
  usluga:string;
  cena: Number;
  cenaMax:Number
  vlasnik: string;
  poruka: string;
  index:Number;

  nekretninePromovisane: Nekretnina[] = [];
  imageObject: Array<object> =[];
  printAttributes(){
    console.log(this.nekretnine);
    console.log(this.naziv);
    console.log(this.grad);
    console.log(this.opstina);
    console.log(this.ulica);
    console.log(this.tip);
    console.log(this.brojSpratova);
    console.log(this.sprat);
    console.log(this.kvadratura);
    console.log(this.brojSoba);
    console.log(this.jeNamestena);
    console.log(this.usluga);
    console.log(this.cena);
    console.log(this.vlasnik);
  }

  pretraga(){
    this.printAttributes();
    this.nekretninaService.pretraga(
      this.naziv,
      this.grad,
      this.opstina,
      this.ulica,
      this.tip,
      this.brojSpratova,
      this.sprat,
      this.kvadratura,
      this.brojSoba,
      this.jeNamestena,
      this.usluga,
      this.cena,
      this.cenaMax,
      this.vlasnik
    ).subscribe((nekretnina:Nekretnina[])=>{
      if(nekretnina){
        console.log(nekretnina);
        this.nekretnine = nekretnina;
      }else{
         this.poruka = "Greška pretraga ! Pokušaj ponovo!"
      }
    });
  }

  detalji(id)
  {
    this.ruter.navigate(['/nekretnine-detalji',id]);   
  }
}
