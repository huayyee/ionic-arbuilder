import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  image: any;

  constructor(
    public apiService : ApiService
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.retrieveImage();
  }

  ionViewWillLeave(){}

  ionViewDidLeave(){}
  
  retrieveImage(){
    this.apiService.getTdModel().subscribe(data => {
      this.image = data;
      console.log(JSON.stringify(data));
      console.log(data);
    })
  }
}
