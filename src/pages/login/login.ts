import { Component, ViewChild} from '@angular/core';
import { NavController, LoadingController, AlertController, ViewController, Content } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
// import { User } from '../../models/user';
import { RestService } from '../../providers/rest-service';
import { Shared } from '../../providers/shared';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild(Content) content: Content;
  RegisterChecked: boolean;
  Username: string;
  Email: string;
  Password: string;

  constructor(
    public navCtrl: NavController,
    public restService: RestService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public shared: Shared) {
    this.RegisterChecked = false;
    this.Username = "";
    this.Password = "";
    this.Email = "";
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
          // this.user = data;
          this.shared.username = this.Username;
          if(Object.keys(data).length == 0){
            console.log('Object is empty');
            let alert = this.alertCtrl.create({
              title: 'Login Failed',
              message: 'Username or Password is incorrect',
              buttons: ['Try again']
            });
            alert.present();
          }
          else{
            this.navCtrl.setRoot(TabsPage);
          }
        },(err) => {
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Login Failed',
            message: err,
            buttons: ['Try again']
          });
          alert.present();
          // console.log(err);
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

  register() {
    if (!this.RegisterChecked) {
      console.log('Check for RegisterChecked');
      this.RegisterChecked = true;//!= this.RegisterChecked;
      this.content.resize();
    }
    else {
      console.log('Registering ' + this.Username + " " + this.Email + " " + this.Password);
      if ((this.Username.trim().length > 0)
        && (this.Email.trim().length > 0)
        && (this.Password.trim().length > 0)) {
        // let data = { username: this.Username, email: this.Email, password: this.Password };
        let loading = this.loadingCtrl.create({
          content: "Registering..."
        });
        loading.present();

        // this.restService.postUser(data).subscribe(data => {
        this.restService.postUser(this.Username, this.Email, this.Password).subscribe(data => {
          loading.dismiss();
          this.shared.username = this.Username;
          console.log(data);
          // this.shared.user = this.user;
          this.navCtrl.setRoot(TabsPage);
        }, (err) => {
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Registration Failed',
            message: err,
            buttons: ['Try again']
          });
          alert.present();
          // console.log(err);
        });
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'Registration Failed',
          message: 'Username or Email or Password is empty',
          buttons: ['Try again']
        });
        alert.present();
        this.Username = "";
        this.Password = "";
        this.Email = "";
      }
    }
  }

}
