import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poruka } from 'src/app/model/poruka.model';
import { User } from 'src/app/model/user.model';
import { PorukaService } from 'src/app/poruka.service';

@Component({
  selector: 'app-poruka-pregled-jedne-konverzacije',
  templateUrl: './poruka-pregled-jedne-konverzacije.component.html',
  styleUrls: ['./poruka-pregled-jedne-konverzacije.component.css']
})
export class PorukaPregledJedneKonverzacijeComponent implements OnInit {

  constructor(private route: ActivatedRoute,private PorukaService: PorukaService) { }

  ngOnInit(): void {
    this.user =JSON.parse(localStorage.getItem('user'));
    if(this.user.type == 'agent'){
      this.user.username = 'agencija'
    }
    (async () => {
      this.id = this.route.snapshot.paramMap.get('id')
      await this.PorukaService.getPorukeKonverzacije(this.id).subscribe((result: Poruka[]) => {
        result.forEach(nekretnina => {        
          this.poruke.push(nekretnina);
          var datum = new Date(nekretnina.datumSlanja)
          var date = datum.getFullYear()+'-'+(datum.getMonth()+1)+'-'+datum.getDate();
          var time = datum.getHours() + ":" + datum.getMinutes() + ":" + datum.getSeconds();
          var dateTime = date+' '+time;
          this.dateTimeFormats.push(dateTime)
        });
      console.log(result)
      });
    })();
  }

  posaljiNovuPoruku(){
    let username = this.user.type == 'agent' ? 'agencija':this.user.username;
    this.PorukaService.novaPorukaUKonverzaciji(username,this.poruke[0].idKonverzacija, this.sadrzaj).subscribe((obj)=>{
                
      if(obj['dodavanje-jedne-poruke'] != 'ok'){
        alert(obj['dodavanje-jedne-poruke'])    
      }else{
        alert("Poruka uspesno poslata");  
        window.location.reload();
      }
    });
  }

  user: User;
  poruke: Poruka[]=[];
  dateTimeFormats: string[] = [];
  id: String;

  
  sadrzaj: String;
  notification: String;

}
