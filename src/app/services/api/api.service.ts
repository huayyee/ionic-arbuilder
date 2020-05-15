import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public httpClient: HttpClient
  ) {

  }

  login(data) {
    return this.httpClient.post(`http://192.168.0.158:8080/api/login`, data).toPromise();
  }

  register(data) {
    return this.httpClient.post(`http://192.168.0.158:8080/api/register`, data).toPromise();
  }

  upload(data) {
    return this.httpClient.post('http://192.168.0.158:8080/api/files/upload', data, {responseType: 'text'}).toPromise();
  } 

  logout(){
    return this.httpClient.get('http://192.168.0.158:8080/api/logout');
  }

  getUser(){
    return this.httpClient.get('http://localhost:8080/api/users');
  }

  getTdModel(){
    return this.httpClient.get('http://192.168.0.158:8080/api/files');
  }
}