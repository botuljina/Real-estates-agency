import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-korisnici-azuriraj',
  templateUrl: './korisnici-azuriraj.component.html',
  styleUrls: ['./korisnici-azuriraj.component.css']
})
export class KorisniciAzurirajComponent implements OnInit {

  constructor( private userService: UserService, private ruter:Router,private route: ActivatedRoute) { }
  user: User = null;
  ime: String;
  prezime: String;
  username: String;
  password: String;
  passwordConfirm: String;
  slika: String;
  mail: String;
  grad: String;
  drzava: String;
  poruka: String;
  slikaNova: File = null;

  ngOnInit(): void {
          (async () => {
            this.username = this.route.snapshot.paramMap.get('username')
            await this.userService.getByUserName(this.username).subscribe((user: User) => {
              this.user = user;
              if(this.user != null){
                this.ime = this.user.ime;
                this.prezime = this.user.prezime;
                this.username = this.user.username;
                this.password = this.user.password;
                this.mail = this.user.mail;
                this.grad = this.user.grad;
                this.drzava = this.user.drzava;
                this.slika = this.user.slika;
              }else{
                  alert("GRESKA PRILIKOM DOHVATANJA KORISNIKA");
              }
            });
           
          })(); 
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
