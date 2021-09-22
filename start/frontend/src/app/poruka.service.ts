import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PorukaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  novaPoruka(kupac,prodavac, naslov, sadrzaj,nekretninaId){
    
    const data = {
      kupac:kupac,
      prodavac:prodavac,
      naslov:naslov,
      sadrzaj:sadrzaj,
      nekretninaId: nekretninaId
    }

    return this.http.post(`${this.uri}/dodaj-poruku`,data);
  }

  getChats(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/dohvati-konverzacije-username`,data);
  }
  getPorukeKonverzacije(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/dohvati-poruke-jedne-konverzacije`,data);
  }

  novaPorukaUKonverzaciji(posiljalac,idKonverzacija, sadrzaj){
    
    const data = {
      posiljalac:posiljalac,
      idKonverzacija:idKonverzacija,
      sadrzaj:sadrzaj,
      datum: new Date()
    }

    return this.http.post(`${this.uri}/dodaj-poruku-u-konverzaciju`,data);
  }

  blokirajKorisnika(user1,user2){
    const data = {
      user1:user1,
      user2:user2
    }

    return this.http.post(`${this.uri}/blokiraj-korisnika`,data);
  }

  odblokirajKorisnika(user1,user2){
    const data = {
      user1:user1,
      user2:user2
    }

    return this.http.post(`${this.uri}/odblokiraj-korisnika`,data);
  }

  arhivirajKonverzaciju(id){
    console.log(id)
    const data = {
      id:id,
    }
    return this.http.post(`${this.uri}/arhiviraj-konverzaciju`,data);
  }
  izbaciIzArhiveKonverzaciju(id){
    console.log(id)
    const data = {
      id:id,
    }
    return this.http.post(`${this.uri}/izbaci-iz-arhive-konverzaciju`,data);
  }

  posaljiPonudu(chatId, trenutnaVrednost,posiljalac){
    const data = {
      chatId:chatId,
      trenutnaVrednost: trenutnaVrednost,
      posiljalac:posiljalac
    }
    return this.http.post(`${this.uri}/posalji-ponudu`,data);
  }
  prihvatiPonudu(chatId,username){
    const data = {
      chatId:chatId,
      username: username,
    }
    return this.http.post(`${this.uri}/prihvati-ponudu`,data);
  }
  odbijPonudu(chatId,username){
    const data = {
      chatId:chatId,
      username: username,
    }
    return this.http.post(`${this.uri}/odbij-ponudu`,data);
  }
}
