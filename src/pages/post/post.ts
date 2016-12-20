import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController, NavParams } from 'ionic-angular';
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
  // imageUri: string;
  Description: string;
  Suggestion: string;
  username: string;
  mediaId: string;
  fi: any;
  fileExist: boolean;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public shared: Shared,
    public restService: RestService,
    public navParams: NavParams) {
    this.Areas = this.shared.AreaSet;
    this.Area = "";
    this.Description = "";
    this.Suggestion = "";
    this.username = shared.username;
    this.mediaId = "";
    this.fileExist = false;
  }

  ionViewDidLoad() {
    console.log('Hello PostPage Page');
  }

  addFile(): void {
    this.fi = this.fileInput.nativeElement;
    this.fileExist= (this.fi.files && this.fi.files[0]);
  }

  post() {
    if((this.Description.trim().length>0)
    &&(this.Suggestion.trim().length>0)
    &&(this.Area.trim().length>0)){
      let loading = this.loadingCtrl.create({
        content: "Your idea is going live :)"
      });
      loading.present();

      if (this.fileExist) {
        let fileToUpload = this.fi.files[0];
        this.restService
          .uploadFile(fileToUpload)
          .subscribe(res => {
            this.mediaId=res.json();
            this.restService.postIdea(this.Description, this.Suggestion, this.Area, this.username, res.json())
              .subscribe(data => {
                console.log(data);
                this.shared.toast('Idea uploaded');
                loading.dismiss();
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
        this.restService.postIdea(this.Description, this.Suggestion, this.Area, this.username, this.mediaId)
          .subscribe(data => {
            this.shared.toast('Idea sent!');
            loading.dismiss();
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
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        message: 'Forgot to write your brilliance idea?',
        buttons: ['Try again']
      });
      alert.present();
    }
  }
}
