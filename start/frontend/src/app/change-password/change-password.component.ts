import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService: UserService, private ruter:Router,private data: DataService) { }

  ngOnInit(): void {
  }

  password: string;
  newpassword: string;
  newpasswordrepeat: string;
  poruka: string;

  checkRegex(str) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/.test(str)
  }
  checkLozinka(password)
  {
     if(this.checkRegex(password)==false){
       this.poruka = "Lozinka nije u ispravnom formatu. Min: 8 Max: 24 duzina, bar 1 veliko, bar 1 malo, bar 1 numerik, bar 1 specijalan karakter!";
       return false;
     }
     return true;
  }
  changePassword(){
    let username = JSON.parse(localStorage.getItem('user')).username;
    if(this.newpassword != this.newpasswordrepeat)
    {
      this.poruka = "Nova lozinka i ponovljena nova lozinka se moraju poklapati!"
    }
    if(this.checkLozinka(this.newpassword)){
      this.userService.changePassword(username,this.newpassword).subscribe((obj)=>{
        if(obj['changePassword'] == 'ok'){
          localStorage.removeItem('user');
          this.data.changeMessage(true)      
          this.ruter.navigate(['/login'])   
        }else{
          this.poruka = "Korisničko ime ili lozinka nisu ispravno uneti! Pokušaj ponovo!"
        }
      })
    }
  }
}
