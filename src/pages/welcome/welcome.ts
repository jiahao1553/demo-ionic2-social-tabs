import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RestService } from '../../providers/rest-service';
import { Shared } from '../../providers/shared';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  mySlideOptions = {
    initialSlide: 0,
    autoplay: 3000,
    direction: 'horizontal',
    pager: true
  };

  username: string;
  fullname: string;

  @ViewChild("fileInput") fileInput;
  fi: any;
  fileExist: boolean;
  slides = [
    {
      title: "Welcome to the new Employee Suggestions System (ESS)",
      description: "The <b>new ESS</b> enable you to upload file to express your idea more! e.g.: images, video, PDF, PowerPoint etc",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "Wish to have a mobile-friendly ESS? Don't worry, we got you!",
      description: "With <b>new ESS</b>, the content is scaled according to what device you're using. Either you're on laptop or mobile, you will get the same seamless experience!",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "New ESS loves \"Search\"",
      description: "With <b>new ESS</b>, you can search almost everything in the system which saves you from \"scrolling\"",
      image: "assets/img/ica-slidebox-img-3.png",
    }
  ];
  constructor(private navCtrl: NavController,
  private navParams: NavParams,
  private loadingCtrl: LoadingController,
  private alertCtrl: AlertController,
  private viewCtrl: ViewController,
  private restService: RestService,
private shared: Shared) {
    this.username = navParams.get('username');
    this.fullname = "";
    this.fileExist = false;
  }

  addFile(): void {
    this.fi = this.fileInput.nativeElement;
    this.fileExist=(this.fi.files && this.fi.files[0]);
  }

  ionViewDidLoad() {
    console.log('Hello WelcomePage Page');
  }

  post(){
    let loading = this.loadingCtrl.create({
      content: "Updating your profile..."
    });
    loading.present();

    if (this.fileExist&&this.fullname.trim().length>0){

      let fileToUpload = this.fi.files[0];
      this.restService
        .uploadFile(fileToUpload)
        .subscribe(res => {
          this.restService.postUser(this.username, this.fullname, res.json(), 0, 0)
            .subscribe(data => {
              loading.dismiss();
              this.shared.userId = data.id;
              this.shared.username = data.username;
              this.shared.fullname = data.fullname;
              this.shared.avatarId = data.avatarId;
              this.shared.ideaNo = data.ideaNo;
              this.shared.actionNo = data.actionNo;
              this.shared.toast(this.username+'\'s profile is updated');
              // let alert = this.alertCtrl.create({
              //   title: 'You\'re ready to use ESS 2.0',
              //   message: "Click \"OK\" to continue",
              //   buttons: ['OK']
              // });
              // alert.present();
              // this.navCtrl.setRoot(LoginPage);
              this.navCtrl.setRoot(TabsPage);
            }, (err) => {
              loading.dismiss();
              let alert = this.alertCtrl.create({
                title: 'User profile update is failed',
                message: err,
                buttons: ['Try again']
              });
              alert.present();
            });
        }, (err) => {
          loading.dismiss();
          console.log(err);
        });
    }
    else{
      loading.dismiss();

      let alert = this.alertCtrl.create({
        title: 'User profile update is failed',
        message: 'Your fullname or profile picture selection is empty',
        buttons: ['Try again']
      });
      alert.present();
    }
  }
}
