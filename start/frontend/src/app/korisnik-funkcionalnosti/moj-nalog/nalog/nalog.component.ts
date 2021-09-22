import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/model/user.model';
@Component({
  selector: 'app-nalog',
  templateUrl: './nalog.component.html',
  styleUrls: ['./nalog.component.css']
})
export class NalogComponent implements OnInit {

  constructor( private userService: UserService, private ruter:Router) { }

  ime: string;
  prezime: string;
  username: string;
  password: string;
  passwordConfirm: string;
  slika: File = null;
  mail: string;
  grad: string;
  drzava: string;
  poruka: string;
  slikaNova: File = null;
  ngOnInit(): void {
    if(localStorage.getItem('user') != null){
        let user = JSON.parse(localStorage.getItem('user'));
        this.ime = user.ime;
        this.prezime = user.prezime;
        this.username = user.username;
        this.password = user.password;
        this.mail = user.mail;
        this.grad = user.grad;
        this.drzava = user.drzava;
        this.slika = user.slika;
    }else{
        alert("MORATE BITI ULOGOVANI KAKO BI STE PREGLEDALI VAS NALOG");
        this.ruter.navigate(['/login']) 
    }
  }

  update(){
    if(this.slikaNova == null){
      this.userService.update(this.ime,
        this.prezime,
        this.username,
        this.password,
        this.mail,
        this.grad,
        this.drzava,
        this.slika).subscribe((user:User)=>{
                
          if(user){
            this.poruka = "Uspesna izmena podataka!" 
            localStorage.setItem('user', JSON.stringify(user));
            console.log(user)
          }else{
             alert("NESTO NIJE U REDU!")
          }
      })
      
    }
  
  }

  
  appendImageToSlikaProp(files: FileList) {
    this.slikaNova = files.item(0);
  }
}
