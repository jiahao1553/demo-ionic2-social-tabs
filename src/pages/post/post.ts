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
  ideaOwner:string;
  ideaOwnerFullname: string;
  ideaOwnerAvatar: string;
  description: string;
  mediaId: string;
  mediaType: string;
  area: string;
  status: string;
  likes: string[];
  likesString: string;
  suggestionsNo: number;
  latestSuggestionOwner: string;
  latestSuggestionOwnerFullname: string;
  latestSuggestion: string;
  areas: any = [];
  fi: any;
  filename: string;
  fileExist: boolean;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public shared: Shared,
    public restService: RestService,
    public navParams: NavParams) {
    this.ideaOwner = shared.username;
    this.ideaOwnerFullname = shared.fullname;
    this.ideaOwnerAvatar = shared.avatarId;
    this.description = "";
    this.mediaId = "";
    this.mediaType = "";
    this.area = "";
    this.status = "Open";
    this.likes = [];
    this.likesString = "";
    this.suggestionsNo = 1;
    this.latestSuggestionOwner = shared.username;
    this.latestSuggestionOwnerFullname = shared.fullname;
    this.latestSuggestion = "";
    this.areas = this.shared.AreaSet;
    this.filename = "";
    this.fileExist = false;
  }

  ionViewDidLoad() {
    console.log('Hello PostPage Page');
  }

  addFile(): void {
    this.fi = this.fileInput.nativeElement;
    this.filename = this.fi.files[0].name;
    this.mediaType = this.filename.substr(this.filename.lastIndexOf(".")).toLowerCase();
    this.fileExist= (this.fi.files && this.fi.files[0]);
  }

  updateIdeaNo(){
    this.shared.ideaNo++;
    this.restService.updateUser(this.shared.userId, this.shared.fullname, this.shared.avatarId, this.shared.ideaNo, this.shared.actionNo)
    .subscribe(res => {
      console.log(this.shared.ideaNo);
    }, (err) => {
      console.log(err);
    });
  }

  post() {
    if((this.description.trim().length>0)
    &&(this.latestSuggestion.trim().length>0)
    &&(this.area.trim().length>0)){
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
            this.restService.postIdea(
              this.ideaOwner, this.ideaOwnerFullname, this.ideaOwnerAvatar,
              this.description, res.json(), this.mediaType,
              this.area, this.status, this.likes, this.likesString, this.suggestionsNo,
              this.latestSuggestionOwner, this.latestSuggestionOwnerFullname, this.latestSuggestion)
              .subscribe(data => {
                console.log(data);
                this.updateIdeaNo();
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
        this.restService.postIdea(
          this.ideaOwner, this.ideaOwnerFullname, this.ideaOwnerAvatar,
          this.description, this.mediaId, this.mediaType,
          this.area, this.status, this.likes, this.likesString, this.suggestionsNo,
          this.latestSuggestionOwner, this.latestSuggestionOwnerFullname, this.latestSuggestion)
          .subscribe(data => {
            this.updateIdeaNo();
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
