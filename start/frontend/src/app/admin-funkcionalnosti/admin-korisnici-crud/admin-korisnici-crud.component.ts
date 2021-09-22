import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin-korisnici-crud',
  templateUrl: './admin-korisnici-crud.component.html',
  styleUrls: ['./admin-korisnici-crud.component.css']
})
export class AdminKorisniciCrudComponent implements OnInit {

  constructor(private userService: UserService,private ruter:Router) { }

  user: User = null;
  korisnici: User[] = []
  poruka: string;
  porukaSucces: string;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user == null)
    {
      alert("MORATE BITI ULOGOVANI KAKO BI STE PREGLEDALI VAS NALOG");
      this.ruter.navigate(['/login']) 
    }else{
      this.userService.getUsers().subscribe((result: User[]) => {

        result.forEach(korisnik => {        
            if(korisnik.username != this.user.username)
                this.korisnici.push(korisnik);
        });

        console.log(this.korisnici);
      });
    }
  }

  azuriraj(username)
  {
    this.ruter.navigate(['/korisnici-azuriraj',username]);   
  }

  obrisi(username)
  {
    this.userService.delete(username).subscribe((obj) => {

      if(obj['user_delete'] != 'ok'){
           alert("NESTO NIJE UREDU")
          this.poruka = obj['user'];      
      }else{
           this.porukaSucces = "Brisanje uspesno!" 
           this.korisnici = [];
           this.userService.getUsers().subscribe((result: User[]) => {

            result.forEach(korisnik => {        
                if(korisnik.username != this.user.username)
                    this.korisnici.push(korisnik);
            });
    
            console.log(this.korisnici);
          });
      }
    });
  }

  prihvati(username){
    this.userService.prihvati(username).subscribe((obj) => {

      if(obj['odobreno'] != 'ok'){
           alert("NESTO NIJE UREDU")
          //this.poruka = obj['user'];      
      }else{
           this.porukaSucces = "Prihvatanje uspesno!" 
           this.korisnici = [];
           this.userService.getUsers().subscribe((result: User[]) => {

            result.forEach(korisnik => {        
                if(korisnik.username != this.user.username)
                    this.korisnici.push(korisnik);
            });
    
            console.log(this.korisnici);
          });
      }
    });
  }

  odbij(username){
    this.userService.odbij(username).subscribe((obj) => {

      if(obj['odobreno'] != 'ok'){
           alert("NESTO NIJE UREDU")
          //this.poruka = obj['user'];      
      }else{
           this.porukaSucces = "Odbijanje uspesno!" 
           this.korisnici = [];
           this.userService.getUsers().subscribe((result: User[]) => {

            result.forEach(korisnik => {        
                if(korisnik.username != this.user.username)
                    this.korisnici.push(korisnik);
            });
    
            console.log(this.korisnici);
          });
      }
    });
  }
}
