import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userData : any;

  constructor(
    public apiService : ApiService
  ) { }

  ngOnInit() {
    this.retrieveImage();
  }

  retrieveImage(){
    this.apiService.getUser().subscribe(response => {
      console.log(JSON.stringify(response));
      //this.userData = "" + JSON.stringify(response);
      this.userData = response;
    })
  }
}
