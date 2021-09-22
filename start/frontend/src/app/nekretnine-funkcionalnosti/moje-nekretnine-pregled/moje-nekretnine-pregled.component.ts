import { Component, OnInit } from '@angular/core';
import { NekretnineService } from 'src/app/nekretnine.service';
import { HttpClient  } from '@angular/common/http';
import { User } from 'src/app/model/user.model';
import { Nekretnina } from 'src/app/model/nekretnina.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-moje-nekretnine-pregled',
  templateUrl: './moje-nekretnine-pregled.component.html',
  styleUrls: ['./moje-nekretnine-pregled.component.css']
})
export class MojeNekretninePregledComponent implements OnInit {

  constructor(private ruter: Router,private nekretninaService: NekretnineService,private http: HttpClient) { }
  

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user.type == 'agent' || this.user.type == 'admin')
        this.user.username = 'agencija';
    this.nekretninaService.getNekretnineByUsername(this.user.username).subscribe((result: Nekretnina[]) => {

      result.forEach(nekretnina => {        
          this.nekretnine.push(nekretnina);
      });
    
    });
  }

  user: User;
  nekretnine: Nekretnina[] = []

  azurirajNekretninu(id){
    this.ruter.navigate(['/azuriraj-nekretninu',id]);  
  }
}
