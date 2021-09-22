import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NekretnineService {

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    
  }
  uri = 'http://localhost:4000';

  getNekretnine(){
    return this.http.get(`${this.uri}/nekretnine`);
  }

  getNekretnineByUsername(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/nekretnine`,data);
  }

  getNekretnina(id){
    const data = {
        id:id
    }
    return this.http.post(`${this.uri}/nekretnina`,data);
  }

  pretraga(naziv,grad,opstina,ulica, tip, brojSpratova, sprat,kvadratura,brojSoba,jeNamestena,usluga,cena,cenaMax,vlasnik){
    const data = {
      naziv: naziv, 
      grad: grad,
      opstina:opstina,
      ulica:ulica,
      tip: tip,
      brojSpratova:brojSpratova,
      sprat:sprat,
      kvadratura:kvadratura,
      brojSoba: brojSoba,
      jeNamestena: jeNamestena,
      usluga:usluga,
      cena:cena,
      cenaMax:cenaMax,
      vlasnik: vlasnik
    }

    return this.http.post(`${this.uri}/pretraga-nekretnine`,data);
  }

  iznajmi(username,id,datumOd,datumDo,cena){
    const data = {
      username:username,
      id: id,
      datumOd:datumOd,
      datumDo:datumDo,
      cena: cena
    }
    return this.http.post(`${this.uri}/iznajmi`,data);
  }

  dodajNekretninu(data){
    return this.http.post(`${this.uri}/dodaj-nekretninu`,data); 
  }

  update(id,naziv,grad,opstina,ulica,tip,brojSpratova,sprat,kvadratura,brojSoba,jeNamestena,usluga,cena,vlasnik){
    const data = {
      id:id,
      naziv:naziv,
      grad:grad,
      opstina:opstina,
      ulica:ulica,
      tip:tip,
      brojSpratova:brojSpratova,
      sprat:sprat,
      kvadratura:kvadratura,
      brojSoba:brojSoba,
      jeNamestena:jeNamestena,
      usluga:usluga,
      cena:cena,
      vlasnik:vlasnik
    }

    return this.http.post(`${this.uri}/update-nekretnina`,data);
  }

  odobri(id){
    const data = {
      id:id,
    }
    return this.http.post(`${this.uri}/odobri-nekretninu`,data);
  }

  promovisi(id){
    const data = {
      id:id,
    }
    return this.http.post(`${this.uri}/promovisi-nekretninu`,data);
  }

  ukloniPromociju(id){
    const data = {
      id:id,
    }
    return this.http.post(`${this.uri}/ukloni-promociju-nekretnine`,data);
  }

  getIznajmljivanja(){
  
    return this.http.get(`${this.uri}/iznajmljivanja`);
  }
  
  getProcenti(){
    return this.http.get(`${this.uri}/get-procenti`);
  }
  getProdaje(){
    return this.http.get(`${this.uri}/get-prodaje`);
  }
  prihvatiProdaju(idNekretnine){
    const data = {
      nekretninaId:idNekretnine,
    }
    return this.http.post(`${this.uri}/prihvati-prodaju`,data);
  }

  odbijProdaju(idNekretnine){
    const data = {
      nekretninaId:idNekretnine,
    }
    return this.http.post(`${this.uri}/odbij-prodaju`,data);
  }
  
  
}
