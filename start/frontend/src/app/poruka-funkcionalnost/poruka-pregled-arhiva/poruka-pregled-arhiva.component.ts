import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Konverzacija } from 'src/app/model/konverzacija.model';
import { User } from 'src/app/model/user.model';
import { NekretnineService } from 'src/app/nekretnine.service';
import { PorukaService } from 'src/app/poruka.service';

@Component({
  selector: 'app-poruka-pregled-arhiva',
  templateUrl: './poruka-pregled-arhiva.component.html',
  styleUrls: ['./poruka-pregled-arhiva.component.css']
})
export class PorukaPregledArhivaComponent implements OnInit {

  constructor(private PorukaService: PorukaService,private ruter: Router, private nekretninaService:NekretnineService) { }
  user: User = null;
  konverzacije: Konverzacija[] = [];
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    let username = this.user.type == 'agent' ? 'agencija':this.user.username;

    this.PorukaService.getChats(username).subscribe((result: Konverzacija[]) => {
      
        result.forEach(nekretnina => { 
          if(nekretnina.stanje == "arhiva" || nekretnina.stanje == "blok")       
            this.konverzacije.push(nekretnina);
            
        });
        console.log(this.konverzacije)
    });
  }

  pregled(id){
    this.ruter.navigate(['/konverzacija-pregled',id]);   
  }

  izbaciIzArhive(id){
    this.PorukaService.izbaciIzArhiveKonverzaciju(id).subscribe((obj)=>{
                
      if(obj['arhiva'] != 'ok'){
        alert("NESTO NIJE UREDU")    
      }else{
        alert("Konverzacija uspesno izbacena iz arhive");  
        window.location.reload();
      }
    });
  }
}
