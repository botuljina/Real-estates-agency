import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getUsers(){
    return this.http.get(`${this.uri}/korisnici`);
  }

  login(username, password){
      const data = {
        username:username,
        password:password
      }

    return this.http.post(`${this.uri}/login`,data);
  }

  getByUserName(username){
    const data = {
      username:username,
    }
    return this.http.post(`${this.uri}/username-pretraga`,data); 
  }
  register(data){
    return this.http.post(`${this.uri}/register`,data); 
  }

  changePassword(username,password){
    const data = {
      username: username,
      password:password,
    }

  return this.http.post(`${this.uri}/change-password`,data);
  }

  update(ime,prezime,username,password,mail,grad,drzava,slika){
    const data = {
      ime: ime,
      prezime:prezime,
      username: username,
      password:password,
      slika:slika,
      mail:mail,
      grad:grad,
      drzava:drzava
    }

    return this.http.post(`${this.uri}/update-user`,data);
  }
  delete(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/delete-user`,data);
  }
  prihvati(username){
    const data = {
      username:username,
    }
    return this.http.post(`${this.uri}/prihvati-user`,data);
  }
  odbij(username){
    const data = {
      username:username,
    }
    return this.http.post(`${this.uri}/odbij-user`,data);
  }

}
