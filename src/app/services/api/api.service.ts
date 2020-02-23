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
    return this.httpClient.post(`http://localhost:80/api/users/login`, data).toPromise();
  }

  register(data) {
    return this.httpClient.post(`http://localhost:80/api/users/createUser`, data).toPromise();
  }

  upload(data) {
    return this.httpClient.post(`http://localhost:80/api/tdmodels/uploadTDModel`, data).toPromise();
  }
}
