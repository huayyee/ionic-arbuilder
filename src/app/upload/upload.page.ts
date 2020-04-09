import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private camera:Camera , public apiService: ApiService, public alertControl: AlertController) { }

  ngOnInit() {
  }

  getPicture(srcType : number){
    // const options: CameraOptions = {
    //   quality: 70,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }
    
    // this.camera.getPicture(options).then((imageData) => {
    //  // imageData is either a base64 encoded string or a file URI
    //  // If it's base64 (DATA_URL):
    //  this.myphoto = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    //  // Handle error
    // });
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
  
  upload(){
    this.apiService.upload(this.imageData).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
  }
}
