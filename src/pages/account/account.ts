import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
// import { User } from '../../models/user';
import { RestService } from '../../providers/rest-service';
import { Shared } from '../../providers/shared';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
username:string;
avatarId:string;
@ViewChild("fileInput") fileInput;
fi: any;
filename: string;

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private restService: RestService,
    private shared: Shared) {
    this.username=<string>this.shared.user.username;
    this.avatarId=<string>this.shared.user.avatarId;
    console.log(this.username + this.avatarId);
  }

  ionViewDidLoad() {
    console.log('Hello AccountPage Page');
    console.log(this.username);
    console.log(this.avatarId);
  }

  // addFile(){
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
  //           if(this.fi.files && this.fi.files[0]){
  //             let loading = this.loadingCtrl.create({
  //               content: "Getting ideas we collected..."
  //             });
  //             loading.present();
  //
  //             let fileToUpload = this.fi.files[0];
  //             this.restService
  //               .uploadFile(fileToUpload)
  //               .subscribe(res => {
  //                 this.avatarId = res.json();
  //                 this.restService.updateUser(this.id, this.nickname, this.user.avatarId)
  //                 .subscribe(data => {
  //                   console.log(data);
  //                   this.shared.toast('Profile picture updated');
  //                   loading.dismiss();
  //                 }, (err) => {
  //                   loading.dismiss();
  //                   let alert = this.alertCtrl.create({
  //                     title: 'Sending picture failed',
  //                     message: err,
  //                     buttons: ['Try again']
  //                   });
  //                   alert.present();
  //                 });
  //               });
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }

}
