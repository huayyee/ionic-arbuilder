import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  imageData: string;
  @Input() useURI = true;
  fileData: File = null;

  constructor(
    private camera:Camera , 
    public apiService: ApiService, 
    public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onSelectedFile(event) {
    this.fileData = <File>event.target.files[0];
    console.log(this.fileData);
  }

upload(){
  const fd = new FormData(); //create a new form data for the file
  fd.append('sampleFile',this.fileData); //name sampleFile, refer api folder

  this.apiService.upload(fd).then((response) => {
    console.log(response);
    
  }).catch((err) => {
    console.log(err);
    this.presentFailAlert();
  });
}

//upload fail
async presentFailAlert(){
  const alert = await this.alertCtrl.create({
    subHeader:"Upload Failed",
    message:"Sorry, please try again.",
    buttons:['OK']
  });
  await alert.present();
}
  getPicture(srcType : number){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.useURI ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: srcType,
      targetWidth: 800,
      targetHeight: 800,
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      if (this.useURI) {
        // const temp = imageData.split('?');
        // this.imageData = temp[0];
        this.imageData = (window as any).Ionic.WebView.convertFileSrc(imageData);
      } else {
        this.imageData = 'data:image/jpeg;base64,' + imageData;
      }
    }, (err) => {
      console.log(err);
    });
  }
  
  
}
