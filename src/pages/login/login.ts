import { Component, ViewChild} from '@angular/core';
import { NavController, LoadingController, AlertController, ViewController, Content } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RestService } from '../../providers/rest-service';
import { Shared } from '../../providers/shared';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  Username: string;
  Email: string;
  Password: string;

  constructor(
    public navCtrl: NavController,
    public restService: RestService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public shared: Shared) {
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
      this.restService.getUser(this.Username, this.Password).subscribe(data => {
        loading.dismiss();
        console.log(data);
        this.shared.username = this.Username;
        if (Object.keys(data).length == 0) {
          console.log('Object is empty');
          let alert = this.alertCtrl.create({
            title: 'Login Failed',
            message: 'Username or Password is incorrect',
            buttons: ['Try again']
          });
          alert.present();
        }
        else {
          this.navCtrl.setRoot(TabsPage);
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
      this.Email = "";
    }
  }
}
