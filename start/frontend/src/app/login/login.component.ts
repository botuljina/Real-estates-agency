import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private ruter:Router,private data: DataService) { }

  ngOnInit(): void {
    this.poruka ="";
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
  } 

  username: string;
  password: string;
  poruka: string;

  message:boolean;
  subscription: Subscription;

  login(){
    this.userService.login(this.username,this.password).subscribe((user:User)=>{
      if(user){
        console.log(user.odobren)
        if(user.odobren == true){
          localStorage.setItem("user", JSON.stringify(user));
          this.data.changeMessage(false)
          if(user.type == "korisnik"){
            this.ruter.navigate(['/nekretnine-pregled']).then(() => {
                window.location.reload();
              });
          }else if(user.type == "agent"){
            this.ruter.navigate(['/agent-pocetna']).then(() => {
              window.location.reload();
            });
          }else if(user.type == "admin"){
            this.ruter.navigate(['/admin-pocetna']).then(() => {
              window.location.reload();
            });
          }
              

          
        }else{
          this.poruka = "Korisnik nije odobren od strane administratora!"
        }
        
      }else{
         this.poruka = "Korisničko ime ili lozinka nisu ispravno uneti! Pokušaj ponovo!"
      }
    })
  }

}
