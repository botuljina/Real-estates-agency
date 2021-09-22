import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { DataService } from "../data.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private ruter: Router,private data: DataService) { }

  ngOnInit(): void {
  }

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
  async register(){
      if(this.checkLozinka(this.password)){
          if(this.password == this.passwordConfirm){

            const data: FormData = new FormData();
            data.append("ime", this.ime);
            data.append("prezime", this.prezime);
            data.append("username", this.username);
            data.append("password", this.password);
            data.append("slika", this.slika);
            data.append("mail", this.mail);
            data.append("grad", this.grad);
            data.append("drzava", this.drzava);
              let user = await this.userService.getByUserName(this.username).subscribe((user)=>{
                if(user != null){
                    this.poruka = "Username mora biti jedinstven!"
                }else{
                  this.userService.register(data).subscribe((obj)=>{
                
                    if(obj['user'] != 'ok'){
                      alert("NESTO NIJE UREDU")
                        this.poruka = obj['user'];      
                    }else{
                      this.data.changeMessage(true)      
                      this.ruter.navigate(['/login'])  
                    }
                  });
                }    
              });
        
          }else{
            this.poruka = "Lozinka i potvrdna lozinka moraju biti identicne!";
          }
      }
  }

  appendImageToSlikaProp(files: FileList) {
    this.slika = files.item(0);
  }

  
}
