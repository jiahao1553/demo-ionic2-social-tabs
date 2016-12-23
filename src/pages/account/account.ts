import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { Content } from 'ionic-angular';
// import { Idea } from '../../models/idea';
// import { User } from '../../models/user';
import { Shared } from '../../providers/shared';
import { RestService } from '../../providers/rest-service';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  userId: string;
  username: string;
  nickname: string
  avatarId: string;

  @ViewChild("fileInput") fileInput;
  fi: any;
  filename: string;

  @ViewChild(Content) content: Content;
  editProfileToggle: boolean;

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private restService: RestService,
    private shared: Shared) {
    this.userId = this.shared.userId;
    this.username = this.shared.username;
    this.nickname = this.shared.nickname;
    this.avatarId = this.shared.avatarId;

    this.editProfileToggle = false;
  }

  ionViewDidLoad() {
    console.log('Hello AccountPage Page');
  }

  toggleEditProfile() {
    this.editProfileToggle = true;
    this.content.resize();
  }

  updateProfilePicture() {
    this.editProfileToggle = false;
    this.content.resize();
    this.fi = this.fileInput.nativeElement;

    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you want to update your profile picture now?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            if (this.fi.files && this.fi.files[0]) {

              let loading = this.loadingCtrl.create({
                content: "Getting ideas we collected..."
              });
              loading.present();

              let fileToUpload = this.fi.files[0];
              this.restService
                .uploadFile(fileToUpload)
                .subscribe(res => {
                  this.avatarId = res.json();

                  this.restService.updateUser(this.userId, this.nickname, this.avatarId)
                    .subscribe(data => {
                      this.shared.toast('Profile picture updated');
                      loading.dismiss();
                    }, (err) => {
                      loading.dismiss();
                      let alert = this.alertCtrl.create({
                        title: 'Sending picture failed',
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
          }
        }
      ]
    });
    confirm.present();
  }

  updateNickname(){
    let prompt = this.alertCtrl.create({
      title: 'Edit Nickname',
      message: "Enter your new nickname below",
      inputs: [
        {
          name: 'nickname',
          placeholder: 'New nickname'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            console.log('Saved clicked');

            let loading = this.loadingCtrl.create({
              content: "Getting ideas we collected..."
            });
            loading.present();

            this.nickname = data.nickname;
            this.restService.updateUser(this.userId, this.nickname, this.avatarId)
              .subscribe(data => {
                this.shared.toast('Nickname updated');
                loading.dismiss();
              }, (err) => {
                loading.dismiss();
                let alert = this.alertCtrl.create({
                  title: 'Update nickname failed',
                  message: err,
                  buttons: ['Try again']
                });
                alert.present();
              });
          }
        }
      ]
    });
    prompt.present();
  }
}
