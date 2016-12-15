import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { Shared } from '../../providers/shared';
import { RestService } from '../../providers/rest-service';
import { Camera } from 'ionic-native';
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
    public navParams: NavParams) {
      this.Areas = this.shared.AreaSet;
      this.Area = "Choose a Category";
      this.username = shared.username;
      this.mediaId = "na";
    }

  ionViewDidLoad() {
    console.log(/*'Hello PostPage Page'+this.shared.user*/this.username);
    // console.log(this.user.id);
  }

  accessGallery(){
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

  takePhoto(){
    Camera.getPicture({
      mediaType: Camera.MediaType.ALLMEDIA,
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.FILE_URI
    }).then((imageData) => {
       this.imageUri = imageData
    }, (err) => {
       console.log(err);
    });
  }

  post(){
    console.log('Post '+this.username+' '+this.Area+' '+this.Description+' '+this.Suggestion);
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

    if (this.imageUri){
      this.mediaId = this.restService.postMedia(this.imageUri);
    }

    if (this.mediaId=="error"){
      loading.dismiss();
    }
    else{
      this.restService.postIdea(this.Description, this.Suggestion, this.Area, this.username, this.mediaId)
      .subscribe(data =>
      {
            console.log(data);
            // this.idea = data;
            loading.dismiss();
            this.navCtrl.parent.switch(0);
            this.navCtrl.setRoot(TabsPage);
      }, (err) =>
      {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Sending idea failed',
          message: err,
          buttons: ['Try again']
        });
        alert.present();
      });
    }

    // if (this.imageURI){
    //   this.restService.postMedia(this.idea.id, this.imageURI).subscribe(data => {
    //     loading.dismiss();
    //     console.log(data);
    //     this.navCtrl.setRoot(TabsPage);
    //   }, (err) => {
    //     loading.dismiss();
    //     let alert = this.alertCtrl.create({
    //       title: 'Sending idea failed',
    //       message: err,
    //       buttons: ['Try again']
    //     });
    //     alert.present();
    //     // console.log(err);
    //   });
    // }
    // else{
    //   loading.dismiss();
    //   this.navCtrl.setRoot(TabsPage);
    // }
  }

}
