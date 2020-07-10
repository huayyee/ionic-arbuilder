import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-arinput',
  templateUrl: './arinput.page.html',
  styleUrls: ['./arinput.page.scss'],
})
export class ArinputPage implements OnInit {

  fileData = null;
  imgURL: any;
  imgName: any;
  result:any;

  constructor(
    public apiService: ApiService, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
  }

  onSelectedFile(event) {
    this.fileData = <File>event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.showLoader();
    }
    
    const fd = new FormData(); //create a new form data for the file
    fd.append('sampleImage',this.fileData); //name sampleImage, refer api folder
    console.log(fd);
    this.apiService.match(fd).then((response) => {
    console.log(response);
    this.result = response;
    this.dismissLoader();
    this.presentSuccessAlert();

    }).catch((err) => {
    console.log(err);
    this.dismissLoader();
    this.presentFailAlert();
    });
  }

async presentFailAlert(){
  const alert = await this.alertCtrl.create({
    subHeader:"Not Matched!",
    buttons:['OK']
  });
  await alert.present();
}

//uploadSuccess alert
async presentSuccessAlert(){
  const alert = await this.alertCtrl.create({
    subHeader:"Match!",
    message: this.result,
    buttons:['OK']
  });
  await alert.present();
}

showLoader(){
  this.loadingCtrl.create({
    message: "Matching process running"
  }).then((res) => {
    res.present();
  });
}

dismissLoader(){
  this.loadingCtrl.dismiss();
}

}
