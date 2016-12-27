import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { Suggestion } from '../../models/suggestion';
import { User } from '../../models/user';
import { Action } from '../../models/action';
import { RestService } from '../../providers/rest-service';
import { Shared } from '../../providers/shared';

@Component({
  selector: 'page-action',
  templateUrl: 'action.html'
})
export class ActionPage {
  users: User[];
  suggestion: Suggestion;
  actions: Action[];
  action: string;
  actionOwner: string;
  actionOwnerFullname:string;
  actionDeadline: string;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private restService: RestService,
    private shared: Shared) {
    let loading = this.loadingCtrl.create({
      content: "Getting actions we collected..."
    });
    loading.present();

    this.action = "";
    this.actionOwner = "";
    this.actionOwnerFullname ="";
    this.actionDeadline = this.shared.getToday();

    this.suggestion = this.navParams.get('suggestion');
    this.restService.getAction(this.suggestion.id).subscribe(data => {
      loading.dismiss();
      this.actions = data;
    }, (err) => {
      loading.dismiss();
      console.log('Error');
    });
  }

  ionViewDidLoad() {
    console.log('Hello ActionPage Page');
  }

  updateActionNo(){
    this.shared.actionNo++;
    this.restService.updateUser(this.shared.userId, this.shared.fullname, this.shared.avatarId, this.shared.ideaNo, this.shared.actionNo)
    .subscribe(res => {
      console.log(this.shared.actionNo);
    }, (err) => {
      console.log(err);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  search(searchEvent) {
    this.actionOwnerFullname = searchEvent.target.value;
    // Only perform the search if we have 3 or more characters
    if (this.actionOwnerFullname.trim() === '' || this.actionOwnerFullname.trim().length < 3) {
      this.users = [];
    }
    else {
      this.restService.searchUser("fullname", this.actionOwnerFullname).subscribe(data => {
        this.users = data;
      }, (err) =>{
        console.log(err);
      });
    }
  }

  selectUser(user: User){
    this.actionOwner = user.username;
    this.actionOwnerFullname = user.fullname;
    this.users = [];
  }

  post() {
    if ((this.action.trim().length > 0) && (this.actionOwnerFullname.trim().length > 0)) {

      let loading = this.loadingCtrl.create({
        content: "Your action is going live :)"
      });
      loading.present();

      this.restService.postAction(this.suggestion.ideaId, this.suggestion.id, this.actionOwner, this.actionOwnerFullname, this.action, this.actionDeadline)
        .subscribe(data => {
          this.updateActionNo();
          this.shared.toast('Action uploaded');
          loading.dismiss();
          this.dismiss();
        }, (err) => {
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Sending action failed',
            message: err,
            buttons: ['Try again']
          });
          alert.present();
        });
    }
  }
}
