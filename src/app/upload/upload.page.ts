import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import {File, FileEntry} from '@ionic-native/file/ngx';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  @Input() useURI = true;
  fileData = null;
  imgURL: any;
  takenImg: any;
  imgUri: any;
  imgName: any;

  constructor(
    private camera:Camera , 
    public apiService: ApiService, 
    public alertCtrl: AlertController,
    public file: File
    ) {}

  ngOnInit() {
  }

  onSelectedFile(event) {
    this.fileData = <File>event.target.files[0];
    
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      console.log(this.imgURL);
      console.log("fileData: " + this.fileData);
      this.imgName = this.fileData.name;
    }
  }

upload(){
  const fd = new FormData(); //create a new form data for the file
  fd.append('sampleFile',this.fileData); //name sampleFile, refer api folder
  console.log(fd);
  this.apiService.upload(fd).then((response) => {
    console.log(response);
    this.presentSuccessAlert();
    this.fileData =null;
    this.imgURL = ""; 
    this.imgName = "";

  }).catch((err) => {
    console.log(err);
    this.presentFailAlert();
  });
}

  //camera
  takePicture(srcType : number){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: srcType
    };

    this.camera.getPicture(options).then((imgData) => {
        this.takenImg = (window as any).Ionic.WebView.convertFileSrc(imgData);
        this.imgUri = imgData;
        console.log(this.takenImg);
        console.log(imgData);
        this.imgName = imgData.substring(imgData.lastIndexOf('/')+1);
    }, (err) => {
      console.log(err);
    });
  }

  //camera photo upload function
uploadImg(){
  this.file.resolveLocalFilesystemUrl(this.imgUri).then(entry =>{
    (<FileEntry> entry).file(file => this.readFile(file));
  }).catch(err => {
    console.log(err);
  })
}

//convert base64 to blob file and upload
readFile(file:any){
  const reader = new FileReader();
  reader.onload = () => {
    const formData = new FormData();
    const imgBlob = new Blob([reader.result], {
      type:file.type
    });
    formData.append('sampleFile',imgBlob, this.imgName);
    //send the file to backend and upload to database
    this.apiService.upload(formData).then((response) => {
      console.log(response);
      this.presentSuccessAlert();
      this.takenImg =null;
      this.imgUri = "";
      this.imgName = "";
  
    }).catch((err) => {
      console.log(err);
      this.presentFailAlert();
    });
  };
  reader.readAsArrayBuffer(file);
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

//uploadSuccess alert
async presentSuccessAlert(){
  const alert = await this.alertCtrl.create({
    subHeader:"Uploaded Successfully",
    message: this.imgName + " has uploaded.",
    buttons:['OK']
  });
  await alert.present();
}
  
}
