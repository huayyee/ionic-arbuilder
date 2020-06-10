import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { timer } from 'rxjs';
import { ApiService } from '../services/api/api.service';


@Component({
  selector: 'app-armode',
  templateUrl: './armode.page.html',
  styleUrls: ['./armode.page.scss'],
  // encapsulation: ViewEncapsulation.Native,
})
export class ArmodePage implements OnInit {

  timer :any;
  pic64 : any;

  constructor(
    private cameraPreview: CameraPreview,
    public apiService: ApiService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    let options = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: this.cameraPreview.CAMERA_DIRECTION.BACK,
      toBack: true,
      previewDrag: false,
      storeToFile: false,
      disableExifHeaderStripping: false
    };

    this.cameraPreview.startCamera(options).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
    });
    
    var self = this;
    this.timer = setInterval(function(){
      self.takePhotoAndUpload();
    },10000);
    
  }

  ionViewWillLeave(){
    this.cameraPreview.stopCamera();
    clearInterval(this.timer);
    console.log("camera stop");
  }
  
  takePhotoAndUpload() {
    this.cameraPreview.takePicture({width:640, height:640, quality: 85}).then((imageData) => {
      this.pic64 = "data:image/jpeg;base64," + imageData;
      console.log(imageData);

      //convert to blob
      let imgBlob = this.dataURItoBlob(this.pic64);
      const formData = new FormData();
      formData.append('sampleFile',imgBlob, "photo.jpg");
      //send the file to backend and upload to database
      this.apiService.upload(formData).then((response) => {
      console.log(response);
      }).catch((err) => {
        console.log(err);
      });

    }, (err) => {
      console.log(err);
    });
  }

  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    return blob;
}
  
}
