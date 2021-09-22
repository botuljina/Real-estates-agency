import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ruter: Router,private data: DataService) { }

  ngOnInit(): void {
    
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
  
    if(localStorage.getItem('user'))
    {
      this.message=false;
    }else{
      this.message=true;
    } 

    this.user = JSON.parse(localStorage.getItem('user'))
  }
  logout(){
    localStorage.removeItem('user');
    this.message = true;
    
    this.ruter.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
  pocetna(){
    if(this.user == null){
        this.user = JSON.parse(localStorage.getItem('user'))
    }
    if(this.user == null ){
      this.ruter.navigate(['/nekretnine-pregled'])
    }else if(this.user.type == "agent"){
      this.ruter.navigate(['/agent-pocetna'])
    }else if(this.user.type == "admin"){
      this.ruter.navigate(['/admin-pocetna'])
    }else if(this.user.type == "korisnik"){
      this.ruter.navigate(['/nekretnine-pregled'])
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  //sluzi za deljenje data izmedju komponenti
  message:boolean;
  user: User = null;
  subscription: Subscription;
  loginDisabled: Boolean
  logoutDisabled: Boolean
}
