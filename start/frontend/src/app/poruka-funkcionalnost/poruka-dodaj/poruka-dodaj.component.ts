import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from 'src/app/model/nekretnina.model';
import { User } from 'src/app/model/user.model';
import { NekretnineService } from 'src/app/nekretnine.service';
import { PorukaService } from 'src/app/poruka.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-poruka-dodaj',
  templateUrl: './poruka-dodaj.component.html',
  styleUrls: ['./poruka-dodaj.component.css']
})
export class PorukaDodajComponent implements OnInit {

  constructor(private userService: UserService, private nekretninaService: NekretnineService, private ruter: Router,private PorukaService: PorukaService) { }


  ngOnInit(): void {
    this.usernamePrimaoca = "";
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user == null){
      alert("Morate bili logovani kako bi ste koristili ove funkcionalnosti");
      this.ruter.navigate(['/login']);
    }

  }
  user: User;
  usernamePrimaoca: string;
  nekretninePrimaoca: Nekretnina[] = [];
  odabranaNekretninaPrimaocaId: string;
  notification: string;

  naslov: string;
  sadrzaj: string;

  async slanjeKorisniku(){
    if(this.usernamePrimaoca == this.user.username){
      alert("Poruka se ne moze poslati samom sebi")
      return
    }
    let user = await this.userService.getByUserName(this.usernamePrimaoca).subscribe((user: User)=>{
      this.notification = "";
      if(user != null || this.usernamePrimaoca == 'agencija'){
        let attr = user == null? 'agencija' : user.username
        
        this.nekretninaService.getNekretnineByUsername(attr).subscribe((result: Nekretnina[]) => {
          if(result.length == 0){
            alert("Korisnik nije vlasnik ni jedne nekretnine, ne moze mu se poslati upit!")
          }
          result.forEach(nekretnina => {        
              this.nekretninePrimaoca.push(nekretnina);
          });
        
        });
      }else{
        this.notification = "Korisnik ne postoji!"
      }    
    }); 
  }

  kreirajPorukuIKonverzaciju(){
    
    let value = (<HTMLSelectElement>document.getElementById('nazivId')).value;
 

    var sel = document.getElementById("nazivId") as HTMLSelectElement;
    var text= sel.options[sel.selectedIndex].text;
    //alert(text)
    //alert(sel.options[sel.selectedIndex].value)
    
    let username = this.user.type == 'agent' ? 'agencija':this.user.username;

    this.PorukaService.novaPoruka(username,this.usernamePrimaoca,
      text,this.sadrzaj,sel.options[sel.selectedIndex].value).subscribe((obj)=>{
                
      if(obj['dodavanje_konverzacija'] != 'ok'){
        alert("NESTO NIJE UREDU")    
      }else{
        alert("Poruka uspesno poslata");  
        window.location.reload();
      }
    });
    
  }
}
