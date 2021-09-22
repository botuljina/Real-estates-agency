import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Nekretnina } from 'src/app/model/nekretnina.model';
import { User } from 'src/app/model/user.model';
import { NekretnineService } from 'src/app/nekretnine.service';
import { PorukaService } from 'src/app/poruka.service';

@Component({
  selector: 'app-detalji',
  templateUrl: './detalji.component.html',
  styleUrls: ['./detalji.component.css']
})

export class DetaljiComponent implements OnInit {

  constructor(private route: ActivatedRoute,private nekretninaService: NekretnineService, private PorukaService:PorukaService) { }

  ngOnInit(): void{
    this.nekretnina = null;
    this.kontakt = false;
    this.porukaSuccess = "";
    this.poruka = "";
    this.user = JSON.parse(localStorage.getItem('user'));
    (async () => {
      this.id = this.route.snapshot.paramMap.get('id')
      await this.nekretninaService.getNekretnina(this.id).subscribe((result: Nekretnina) => {
        this.nekretnina = result;
        this.usernamePrimaoca = this.nekretnina.vlasnik;
        this.naslovPoruke = this.nekretnina.naziv;

        console.log("usernamePrimaoca->" + this.usernamePrimaoca)
        this.nekretnina.galerija.forEach(s=>{
          this.imageObject.push({
            image: s,
            thumbImage: s,
            alt: 'alt of image',
            title: ""
          })
        })
        console.log(this.imageObject)
      });
    })();
    
  }
  kontakt: Boolean;
  imageObject: Array<object> =[];
  iznajmi(){
    if(this.datumDo == undefined || this.datumOd == undefined)
    {
      this.poruka = "Oba datuma moraju biti odabrana!!";
      return;
    }
    if(this.datumOd >= this.datumDo){
      this.poruka = "Pocetni dan iznajmljivanja mora biti pre krajneg dana iznajmljivanja!";
    }else{
      let username = JSON.parse(localStorage.getItem('user')).username;
      this.nekretninaService.iznajmi(username,this.id,this.datumOd,this.datumDo,this.nekretnina.cena).subscribe((obj)=>{     
        if(obj['iznajmljivanje'] != 'ok'){
        }else{
          this.porukaSuccess = "Uspesno ste rezervisali termin!";
          this.poruka = "";
        }
      },(error)=>{
        this.poruka = "Termin je zauzet, probajte neki drugi datum!";
        this.porukaSuccess = "";
      })
    }
  }
  poruka: string;
  porukaSuccess: string;
  datumDo: Date;
  datumOd: Date;
  id: string;
  nekretnina: Nekretnina


  usernamePrimaoca: String;
  naslovPoruke: String;
  sadrzaj: String
  user: User;

  kontaktiraj(){
    if(this.user.username == this.nekretnina.vlasnik){
      alert("PORUKA SE NE MOZE POSLATI SAMOM SEBI")
      return
    }
    this.kontakt = true;
  }
  kreirajPorukuIKonverzaciju(){
    this.PorukaService.novaPoruka(this.user.username,this.usernamePrimaoca,
      this.nekretnina.naziv,this.sadrzaj,this.nekretnina.id).subscribe((obj)=>{
                
      if(obj['dodavanje_konverzacija'] != 'ok'){
        alert(obj['dodavanje_konverzacija'])
      }else{
        alert("Poruka uspesno poslata");  
        window.location.reload();
      }
    });
  }
}
