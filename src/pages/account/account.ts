import { Component,/* ViewChild */} from '@angular/core';
import { NavController, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { App, /*Content*/ } from 'ionic-angular';
import { LoginPage } from '../login/login';
// import { Idea } from '../../models/idea';
// import { User } from '../../models/user';
import { Shared } from '../../providers/shared';
import { RestService } from '../../providers/rest-service';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  // userId: string;
  // username: string;
  // fullname: string
  // avatarId: string;
  // fuel: string;
  //
  // @ViewChild("fileInput") fileInput;
  // fi: any;
  //
  // @ViewChild(Content) content: Content;
  // editProfileToggle: boolean;

  constructor(private app: App,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private restService: RestService,
    private shared: Shared) {
    // this.editProfileToggle = false;

  }

  ionViewDidLoad() {
    console.log('Hello AccountPage Page');
  }

  // toggleEditProfile() {
  //   this.editProfileToggle = true;
  //   this.content.resize();
  // }
  //
  // updateProfilePicture() {
  //   this.editProfileToggle = false;
  //   this.content.resize();
  //   this.fi = this.fileInput.nativeElement;
  //
  //   let confirm = this.alertCtrl.create({
  //     title: 'Confirmation',
  //     message: 'Do you want to update your profile picture now?',
  //     buttons: [
  //       {
  //         text: 'No',
  //         handler: () => {
  //           console.log('Disagree clicked');
  //         }
  //       },
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           console.log('Agree clicked');
  //           if (this.fi.files && this.fi.files[0]) {
  //
  //             let loading = this.loadingCtrl.create({
  //               content: "Uploading profile picture"
  //             });
  //             loading.present();
  //
  //             let fileToUpload = this.fi.files[0];
  //             this.restService
  //               .uploadFile(fileToUpload)
  //               .subscribe(res => {
  //                 this.avatarId = res.json();
  //
  //                 this.restService.updateUser(this.userId, this.fullname, this.avatarId, this.fuel)
  //                   .subscribe(data => {
  //                     this.shared.toast('Profile picture updated');
  //                     loading.dismiss();
  //                   }, (err) => {
  //                     loading.dismiss();
  //                     let alert = this.alertCtrl.create({
  //                       title: 'Sending picture failed',
  //                       message: err,
  //                       buttons: ['Try again']
  //                     });
  //                     alert.present();
  //                   });
  //               }, (err) => {
  //                 loading.dismiss();
  //                 console.log(err);
  //               });
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }
  //
  // updatefullname(){
  //   let prompt = this.alertCtrl.create({
  //     title: 'Edit fullname',
  //     message: "Enter your new fullname below",
  //     inputs: [
  //       {
  //         name: 'fullname',
  //         placeholder: 'New fullname'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Update',
  //         handler: data => {
  //           console.log('Saved clicked');
  //
  //           let loading = this.loadingCtrl.create({
  //             content: "Getting ideas we collected..."
  //           });
  //           loading.present();
  //
  //           this.fullname = data.fullname;
  //           this.restService.updateUser(this.userId, this.fullname, this.avatarId)
  //             .subscribe(data => {
  //               this.shared.toast('fullname updated');
  //               loading.dismiss();
  //             }, (err) => {
  //               loading.dismiss();
  //               let alert = this.alertCtrl.create({
  //                 title: 'Update fullname failed',
  //                 message: err,
  //                 buttons: ['Try again']
  //               });
  //               alert.present();
  //             });
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  goToLogin(){
    this.app.getRootNav().push(LoginPage);
  }
}
