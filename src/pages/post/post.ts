import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { Shared } from '../../providers/shared';
import { RestService } from '../../providers/rest-service';
import { Camera, Transfer } from 'ionic-native';
import { TabsPage } from '../tabs/tabs';
// import { Idea } from '../../models/idea';
// import { User } from '../../models/user';

/*
  Generated class for the Post page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
  @ViewChild("fileInput") fileInput;
  // filesToUpload: Array<File>;
  Areas: any = [];
  Area: string;
  imageUri: string;
  Description: string;
  Suggestion: string;
  username: string;
  mediaId: string;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public shared: Shared,
    public restService: RestService,
    public navParams: NavParams,
  public toastCtrl: ToastController) {
    this.Areas = this.shared.AreaSet;
    this.Area = "Choose a Category";
    this.username = shared.username;
    this.mediaId = "na";
  }

  ionViewDidLoad() {
    console.log(/*'Hello PostPage Page'+this.shared.user*/this.username);
    // console.log(this.user.id);
  }

//   fileChange(event){
//   // this.filesToUpload = <Array<File>> fileInput.target.files;
//   // for(var i = 0; i < this.filesToUpload.length; i++) {
//   //   var image = this.filesToUpload[i].webkitRelativePath;
//   // }
//   var files = event.srcElement.files;
//   reader.readAsDataURL(files);
//   console.log(files);
//   var reader = new FileReader();
//   reader.onload = function(){
//     this.imageUri = reader.result
//   }
// }
addFile(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
        let fileToUpload = fi.files[0];
        this.restService
            .uploadFile(fileToUpload)
            .subscribe(res => {
                console.log(res);
            });
    }
}


  accessGallery() {
    let toast = this.toastCtrl.create({
      message: 'Open gallery',
      duration: 3000
    });
    toast.present();
    Camera.getPicture({
      mediaType: Camera.MediaType.ALLMEDIA,
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: Camera.DestinationType.FILE_URI
    }).then((imageData) => {
      this.imageUri = /*'data:image/jpeg;base64,'+*/imageData;
    }, (err) => {
      console.log(err);
    });
  }

  takePhoto() {
    let toast = this.toastCtrl.create({
      message: 'Take photo',
      duration: 3000
    });
    toast.present();
    Camera.getPicture({
      // mediaType: Camera.MediaType.ALLMEDIA,
      // sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.FILE_URI
    }).then((imageData) => {
      this.imageUri = imageData
    }, (err) => {
      console.log(err);
    });
  }



  post() {
    let toast = this.toastCtrl.create({
      message: 'Post'+this.username+ ' ' + this.Area + ' ' + this.Description + ' ' + this.Suggestion+' '+this.mediaId,
      duration: 3000
    });
    toast.present();
    // let data = {
    //   description: this.Description,
    //   suggestion: this.Suggestion,
    //   area: this.Area,
    //   userId: this.shared.user._id
    // };
    let loading = this.loadingCtrl.create({
      content: "Your idea is going live :)"
    });
    loading.present();

    if (this.imageUri) {
      const fileTransfer = new Transfer();
      var options: any;

      options = {
        fileKey: 'avatar',//'file',
        fileName: this.imageUri.substr(this.imageUri.lastIndexOf('/') + 1),
        // fileName: 'image.jpg',
        mimeType: "binary/octet-stream",
        headers: {}
      };

      fileTransfer.upload(this.imageUri, encodeURI("https://protected-temple-59341.herokuapp.com/file/"), options)
        .then((data) => {
          let toast = this.toastCtrl.create({
            message: 'Upload successful',
            duration: 3000
          });
          toast.present();
          loading.dismiss();
          console.log("Successful upload...");
          console.log("Code = " + data.responseCode);
          this.mediaId = data.response;
        }, (err) => {
          // error
          let alert = this.alertCtrl.create({
            title: 'Cannot upload',
            subTitle: err.code,
            buttons: ['Dismiss']
          });
          alert.present();
          console.log("Failed to upload...");
          console.log("Code = " + err.code);
        });
    }
    if (((this.mediaId != "na")&&(this.imageUri))||
     ((this.mediaId = "na")&&(!this.imageUri))){
       let toast = this.toastCtrl.create({
         message: 'mediaId= '+this.mediaId+', '+this.imageUri,
         duration: 3000
       });
       toast.present();

      this.restService.postIdea(this.Description, this.Suggestion, this.Area, this.username, this.mediaId)
        .subscribe(data => {
          console.log(data);
          // this.idea = data;
          let toast = this.toastCtrl.create({
            message: 'Posted text',
            duration: 3000
          });
          toast.present();
          loading.dismiss();
          this.navCtrl.parent.switch(0);
          this.navCtrl.setRoot(TabsPage);
        }, (err) => {
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Sending idea failed',
            message: err,
            buttons: ['Try again']
          });
          alert.present();
        });
    }
    else{
      let toast = this.toastCtrl.create({
        message: 'Posted text',
        duration: 3000
      });
      toast.present();
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Sending idea failed',
        message: "System error",
        buttons: ['Try again']
      });
      alert.present();
    }
    let toastend = this.toastCtrl.create({
      message: 'Going no where',
      duration: 3000
    });
    toastend.present();
  }

}
