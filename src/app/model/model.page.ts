import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.page.html',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {

  image: any;

  constructor(
    public apiService : ApiService
  ) { }

  ngOnInit() {
    this.retrieveImage();
  }

  retrieveImage(){
    this.apiService.getTdModel().subscribe(data => {
      this.image = data;
      console.log(JSON.stringify(data));
      console.log(data);
    })
  }

}
