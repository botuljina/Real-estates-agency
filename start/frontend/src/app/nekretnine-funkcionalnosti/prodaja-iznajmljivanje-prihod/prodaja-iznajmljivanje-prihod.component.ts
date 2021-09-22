import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iznajmljivanje } from 'src/app/model/iznajmljivanje.model';
import { Procenti } from 'src/app/model/procenti.model';
import { Prodaje } from 'src/app/model/prodaje.model';
import { NekretnineService } from 'src/app/nekretnine.service';

@Component({
  selector: 'app-prodaja-iznajmljivanje-prihod',
  templateUrl: './prodaja-iznajmljivanje-prihod.component.html',
  styleUrls: ['./prodaja-iznajmljivanje-prihod.component.css']
})
export class ProdajaIznajmljivanjePrihodComponent implements OnInit {

  constructor(private ruter: Router,private nekretninaService: NekretnineService,private http: HttpClient) { }

  ngOnInit(): void {
    this.nekretninaService.getIznajmljivanja().subscribe((result: Iznajmljivanje[]) => {

      result.forEach(nekretnina => {        
          var datum = new Date(nekretnina.datumOd)
          var date = datum.getFullYear()+'-'+(datum.getMonth()+1)+'-'+datum.getDate();
          var time = datum.getHours() + ":" + datum.getMinutes() + ":" + datum.getSeconds();
          var dateTime = date+' ';
         
          var datum2 = new Date(nekretnina.datumDo)
          var date2 = datum2.getFullYear()+'-'+(datum2.getMonth()+1)+'-'+datum2.getDate();
          var time2 = datum2.getHours() + ":" + datum2.getMinutes() + ":" + datum2.getSeconds();
          var dateTime2 = date2+' ';


          this.datumiOd.push(dateTime)
          this.datumiDo.push(dateTime2)
          this.iznajmljivanja.push(nekretnina);
          
      });
      
      this.nekretninaService.getProcenti().subscribe((result: Procenti) => {
        console.log(result)
        this.procenti = result;
        console.log(this.procenti)
        this.ukupnaZaradaRenta = 0;
        this.iznajmljivanja.forEach(nekretnina => {        
            this.ukupnaZaradaRenta += (nekretnina.cena * this.procenti.renta / 100);
            console.log(this.ukupnaZaradaRenta);
        });


        this.nekretninaService.getProdaje().subscribe((result: Prodaje[]) => {
          console.log(result)
          result.forEach(nekretnina => {         
            this.prodaje.push(nekretnina);      
          });
          this.ukupnaZaradaProdaja = 0;
          this.prodaje.forEach(nekretnina => {        
            if(nekretnina.stanje == 'prihvaceno'){
              this.ukupnaZaradaProdaja += (nekretnina.iznos * this.procenti.prodaja / 100);
            }
        });


        });

      });

     
      console.log(this.procenti)
    });
  }
  ukupnaZaradaRenta:number;
  ukupnaZaradaProdaja:number;
  prodaje: Prodaje[] = [];
  iznajmljivanja: Iznajmljivanje[]=[];
  procenti: Procenti;
  datumiOd: String[] = [];
  datumiDo: String[] = [];

  prihvatiProdaju(idNekretnine){
    
    this.nekretninaService.prihvatiProdaju(idNekretnine).subscribe((obj)=>{
                
      if(obj['prihvati_prodaju'] != 'ok'){
        alert("NESTO NIJE UREDU")    
      }else{
        alert("Prodaja je prihvacena, zarada ce se azurirati!");  
        window.location.reload();
      }
    });
  }
  odbijProdaju(idNekretnine){
    
    this.nekretninaService.odbijProdaju(idNekretnine).subscribe((obj)=>{
                
      if(obj['odbij_prodaju'] != 'ok'){
        alert("NESTO NIJE UREDU")    
      }else{
        alert("Prodaja je odbijena, zarada ce se azurirati!");  
        window.location.reload();
      }
    });
  }
}
