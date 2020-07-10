import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import {File, FileEntry} from '@ionic-native/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';

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
  pic_name: any;

  constructor(
    private camera:Camera , 
    public apiService: ApiService, 
    public alertCtrl: AlertController,
    public file: File,
    private sanitizer : DomSanitizer
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
  this.imgName = this.pic_name + ".jpg";
  console.log(this.imgName);
  const fd = new FormData(); //create a new form data for the file
  fd.append('sampleFile',this.fileData, this.imgName); //name sampleFile, refer api folder
  console.log(fd);
  this.apiService.upload(fd).then((response) => {
    console.log(response);
    this.presentSuccessAlert();
    this.fileData =null;
    this.imgURL = ""; 
    this.imgName = "";
    this.pic_name = "";

  }).catch((err) => {
    console.log(err);
    this.presentFailAlert();
  });
}

  //camera
  takePicture(srcType : number){
    const options: CameraOptions = {
      quality: 100,
      targetWidth:640, 
      targetHeight:640,
      destinationType: this.camera.DestinationType.FILE_URI, //FILE_URI
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: srcType
    };

    this.camera.getPicture(options).then((imgData) => {
        this.takenImg = (window as any).Ionic.WebView.convertFileSrc(imgData);
        this.imgUri = imgData;
        // console.log(this.takenImg);
        // console.log(imgData);
        // this.takenImg = this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64,"+imgData);
        // this.imgUri = "data:image/jpeg;base64," + imgData;
        //convert to blob
        
        this.imgName = imgData.substring(imgData.lastIndexOf('/')+1);
        
    }, (err) => {
      console.log(err);
    });
  }

//   uploadImg(){
//     let imgBlob = this.dataURItoBlob(this.imgUri);
//     const formData = new FormData();
//     formData.append('sampleFile',imgBlob, this.imgName);
//     //send the file to backend and upload to database
//     this.apiService.upload(formData).then((response) => {
//       console.log(response);
//       this.presentSuccessAlert();
//       this.takenImg =null;
//       this.imgUri = "";
//       this.imgName = "";
  
//     }).catch((err) => {
//       console.log(err);
//       this.presentFailAlert();
//     });

//   }

//   dataURItoBlob(dataURI) {
//     // convert base64 to raw binary data held in a string
//     var byteString = atob(dataURI.split(',')[1]);

//     // separate out the mime component
//     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

//     // write the bytes of the string to an ArrayBuffer
//     var arrayBuffer = new ArrayBuffer(byteString.length);
//     var _ia = new Uint8Array(arrayBuffer);
//     for (var i = 0; i < byteString.length; i++) {
//         _ia[i] = byteString.charCodeAt(i);
//     }

//     var dataView = new DataView(arrayBuffer);
//     var blob = new Blob([dataView], { type: mimeString });
//     return blob;
// }
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
  this.imgName = this.pic_name + ".jpg";
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
      this.pic_name = "";
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

ionViewDidLeave(){}
}
