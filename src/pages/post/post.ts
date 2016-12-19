import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { Shared } from '../../providers/shared';
import { RestService } from '../../providers/rest-service';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
  @ViewChild("fileInput") fileInput;
  Areas: any = [];
  Area: string;
  imageUri: string;
  Description: string;
  Suggestion: string;
  username: string;
  mediaId: string;
  fi: any;

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
    this.mediaId = "";
  }

  ionViewDidLoad() {
    console.log(/*'Hello PostPage Page'+this.shared.user*/this.username);
    // console.log(this.user.id);
  }

  addFile(): void {
    this.fi = this.fileInput.nativeElement;
  }

  post() {
    let loading = this.loadingCtrl.create({
      content: "Your idea is going live :)"
    });
    loading.present();
    if (this.fi.files && this.fi.files[0]) {
      let fileToUpload = this.fi.files[0];
      this.restService
        .uploadFile(fileToUpload)
        .subscribe(res => {
          console.log(res);
          this.mediaId=res.json();
          console.log(this.mediaId);
          this.restService.postIdea(this.Description, this.Suggestion, this.Area, this.username, res.json())
            .subscribe(data => {
              console.log(data);
              // this.idea = data;
              let toast = this.toastCtrl.create({
                message: 'Posted text',
                duration: 3000
              });
              toast.present();

              loading.dismiss();

              // this.navCtrl.parent.select(0);
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
        });
    }
    else{
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

          // this.navCtrl.parent.select(0);
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

    // let toast = this.toastCtrl.create({
    //   message: 'Post' + this.username + ' ' + this.Area + ' ' + this.Description + ' ' + this.Suggestion + ' ' + this.mediaId,
    //   duration: 3000
    // });
    // toast.present();
    // let data = {
    //   description: this.Description,
    //   suggestion: this.Suggestion,
    //   area: this.Area,
    //   userId: this.shared.user._id
    // };
  }
}
