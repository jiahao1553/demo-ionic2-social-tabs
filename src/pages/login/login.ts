import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { WelcomePage } from '../welcome/welcome';
import { RestService } from '../../providers/rest-service';
import { Shared } from '../../providers/shared';
import { User } from '../../models/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  Username: string;
  Password: string;
  users: User[];
  constructor(
    private navCtrl: NavController,
    private restService: RestService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private shared: Shared) {
    this.Username = "";
    this.Password = "";
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  login() {
    if ((this.Username.trim().length > 0)
      && (this.Password.trim().length > 0)) {

      let loading = this.loadingCtrl.create({
        content: "Signing in..."
      });
      loading.present();

      this.restService.authUser(this.Username, this.Password).subscribe(data => {
        loading.dismiss();
        if (data) {
          this.restService.searchUser("username", this.Username).subscribe(data => {
            loading.dismiss();
            this.users = data;
            if (this.users.length>0){
              this.shared.userId = this.users[0].id;
              this.shared.username = this.users[0].username;
              this.shared.fullname = this.users[0].fullname;
              this.shared.avatarId = this.users[0].avatarId;
              this.shared.ideaNo = this.users[0].ideaNo;
              this.shared.actionNo = this.users[0].actionNo;
              this.navCtrl.setRoot(TabsPage);
              this.shared.toast("Logged in as " + this.Username);
              console.log(this.shared.ideaNo+' '+this.shared.actionNo);
            }
            else{
              this.navCtrl.push(WelcomePage, {username: this.Username});
            }
          }, (err) => {
            loading.dismiss();
            console.log('Error');
          });
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Login Failed',
            message: 'Username or Password is incorrect',
            buttons: ['Try again']
          });
          alert.present();
        }
      }, (err) => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Login Failed',
          message: err,
          buttons: ['Try again']
        });
        alert.present();
      });
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Login Failed',
        message: 'Username or Password is empty',
        buttons: ['Try again']
      });
      alert.present();
      this.Username = "";
      this.Password = "";
    }
  }
}
