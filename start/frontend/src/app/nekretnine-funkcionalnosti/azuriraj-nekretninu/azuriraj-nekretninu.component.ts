import { Component, OnInit } from '@angular/core';
import { Nekretnina } from 'src/app/model/nekretnina.model';
import { ActivatedRoute, Router } from '@angular/router'
import { NekretnineService } from 'src/app/nekretnine.service';
@Component({
  selector: 'app-azuriraj-nekretninu',
  templateUrl: './azuriraj-nekretninu.component.html',
  styleUrls: ['./azuriraj-nekretninu.component.css']
})
export class AzurirajNekretninuComponent implements OnInit {

  constructor(private route: ActivatedRoute, private ruter: Router,private nekretninaService: NekretnineService) { }

  ngOnInit(): void {
    this.nekretnina = null;
    (async () => {
      this.id = this.route.snapshot.paramMap.get('id')
      await this.nekretninaService.getNekretnina(this.id).subscribe((result: Nekretnina) => {
        this.nekretnina = result;
        console.log(this.nekretnina)
      });
    })();
  }

  update(){
    if(this.galerija == null){
      this.nekretninaService.update(this.id,this.nekretnina.naziv,
        this.nekretnina.grad,
        this.nekretnina.opstina,
        this.nekretnina.ulica,
        this.nekretnina.tip,
        this.nekretnina.brojSpratova,
        this.nekretnina.sprat,
        this.nekretnina.kvadratura,
        this.nekretnina.brojSoba,
        this.nekretnina.jeNamestena,
        this.nekretnina.usluga,
        this.nekretnina.cena,
        this.nekretnina.vlasnik
        ).subscribe((nek:Nekretnina)=>{
                
          if(nek){
            alert("Uspesno ste azurirali podatke!")
            this.ruter.navigate(['/moje-nekretnine'])
          }else{
             alert("NESTO NIJE U REDU!")
          }
      })
      
    }
  
  }

  id: string;
  nekretnina: Nekretnina;
  galerija: FileList = null;
  poruka: string;
  sprat: Number;
  porukaSucces:string;
}
