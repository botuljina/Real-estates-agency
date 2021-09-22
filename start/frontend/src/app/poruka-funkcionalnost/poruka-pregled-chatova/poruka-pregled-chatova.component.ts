import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { identity } from 'rxjs';
import { Konverzacija } from 'src/app/model/konverzacija.model';
import { Nekretnina } from 'src/app/model/nekretnina.model';
import { User } from 'src/app/model/user.model';
import { NekretnineService } from 'src/app/nekretnine.service';
import { PorukaService } from 'src/app/poruka.service';

@Component({
  selector: 'app-poruka-pregled-chatova',
  templateUrl: './poruka-pregled-chatova.component.html',
  styleUrls: ['./poruka-pregled-chatova.component.css']
})
export class PorukaPregledChatovaComponent implements OnInit {

  constructor(private PorukaService: PorukaService,private ruter: Router, private nekretninaService:NekretnineService) { }

  ngOnInit(): void {
    
    this.user = JSON.parse(localStorage.getItem('user'));
    let username = this.user.type == 'agent' ? 'agencija':this.user.username;
    if(this.user.type == 'agent' || this.user.type == 'admin')
        this.user.username = 'agencija'
    this.PorukaService.getChats(username).subscribe((result: Konverzacija[]) => {
      
        result.forEach(nekretnina => { 
          if(nekretnina.stanje == "chat")       
            this.konverzacije.push(nekretnina);
            
        });
        console.log(this.konverzacije)
        this.nekretninaService.getNekretnine().subscribe((result: Nekretnina[]) => {
          result.forEach(nekretnina => {        
              this.nekretnine.push(nekretnina);
          });

          this.konverzacije.forEach(chat => {    
            if(chat.postojiPonuda == 'true'){
                this.cenaPonude.push(chat.trenutnaVrednost.toString());
            }else
            {
                this.cenaPonude.push('Unesi vrednost');
            }    
            const found = this.nekretnine.find(element => element.id.toString() == chat.nekretninaId);
            if(found) 
            {
              if(found.usluga=='rent')
                this.visibleInput.push(false);
              else{
                this.visibleInput.push(true);
              }
                
            }    
          });
          console.log(this.nekretnine)
          console.log(this.visibleInput)
        });
      console.log(result)
    
    });
  }
  userZaBlok: String;
  user: User = null;
  konverzacije: Konverzacija[] = [];
  nekretnine: Nekretnina[] = [];

  pregled(id){
    this.ruter.navigate(['/konverzacija-pregled',id]);   
  }

  blokiraj(){
    if(this.user.type == 'agent'){
      alert("agent nema opciju blokiranja korisnika")
      return
    }
    this.PorukaService.blokirajKorisnika(this.user.username,this.userZaBlok).subscribe((obj)=>{
                
      if(obj['blokiranje'] != 'ok'){
        alert("NESTO NIJE UREDU")    
      }else{
        alert("Korisnik uspesno blokiran");  
        window.location.reload();
      }
    });
  }

  odblokiraj(){
    this.PorukaService.odblokirajKorisnika(this.user.username,this.userZaBlok).subscribe((obj)=>{
                
      if(obj['odblokiranje'] != 'ok'){
        alert("NESTO NIJE UREDU")    
      }else{
        alert("Korisnik uspesno odblokiran");  
        window.location.reload();
      }
    });
  }

  arhiva(id){
    this.PorukaService.arhivirajKonverzaciju(id).subscribe((obj)=>{
                
      if(obj['arhiva'] != 'ok'){
        alert("NESTO NIJE UREDU")    
      }else{
        alert("Konverzacija uspesno arhivirana");  
        window.location.reload();
      }
    });
  }
  cenaPonude: string[] = [];
  visibleInput: Boolean[] = [];

  ponuda(nekretninaId,index,chatId){
    const found = this.nekretnine.find(element => element.id.toString() == nekretninaId);
    if(found.stanje == 'prodato'){
      alert("Nekretnina je prodata!");
        return
    }
    if(found.usluga=='rent'){
        alert("Ponuda se salje za nekretnine koje se prodaju!");
        return
    }else{
      console.log(index)
      console.log(this.cenaPonude)
        //alert(this.cenaPonude[index])
        let username = this.user.type == 'agent' ? 'agencija':this.user.username;
        this.PorukaService.posaljiPonudu(chatId,this.cenaPonude[index],username).subscribe((obj)=>{
                
          if(obj['posalji-ponudu'] != 'ok'){
            alert("NESTO NIJE UREDU")    
          }else{
            alert("Ponuda uspesno poslata");  
            window.location.reload();
          }
        });
    }
  }

  prihvati(chatId){
    const foundchat = this.konverzacije.find(element => element.id.toString() == chatId); 

    const found = this.nekretnine.find(element => element.id.toString() == foundchat.nekretninaId);
    if(found.stanje == 'prodato'){
      alert("Nekretnina je prodata!");
        return
    }

    let username = this.user.type == 'agent' ? 'agencija':this.user.username;
    this.PorukaService.prihvatiPonudu(chatId,username).subscribe((obj)=>{
                
      if(obj['prihvati-ponudu'] != 'ok'){
        alert("NESTO NIJE UREDU")    
      }else{
        alert("Ponuda uspesno prihvacena");  
        window.location.reload();
      }
    });
  }

  odbij(chatId){
    const foundchat = this.konverzacije.find(element => element.id.toString() == chatId); 

    const found = this.nekretnine.find(element => element.id.toString() == foundchat.nekretninaId);
    if(found.stanje == 'prodato'){
      alert("Nekretnina je prodata!");
        return
    }
    let username = this.user.type == 'agent' ? 'agencija':this.user.username;
    this.PorukaService.odbijPonudu(chatId,username).subscribe((obj)=>{
                
      if(obj['odbij-ponudu'] != 'ok'){
        alert("NESTO NIJE UREDU")    
      }else{
        alert("Ponuda uspesno odbijena");  
        window.location.reload();
      }
    });
  }

  
}
