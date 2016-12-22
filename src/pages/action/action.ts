import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { Suggestion } from '../../models/suggestion';
import { Action } from '../../models/action';
import { RestService } from '../../providers/rest-service';
import { Shared } from '../../providers/shared';

@Component({
  selector: 'page-action',
  templateUrl: 'action.html'
})
export class ActionPage {
  suggestion: Suggestion;
  actions: Action[];
  action: string;
  actionOwner: string;
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
    this.actionDeadline = "2017-01-01";

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

  dismiss() {
    this.viewCtrl.dismiss();
  }

  post() {
    if ((this.action.trim().length > 0) && (this.actionOwner.trim().length > 0)) {

      let loading = this.loadingCtrl.create({
        content: "Your action is going live :)"
      });
      loading.present();

      this.restService.postAction(this.suggestion.ideaId, this.suggestion.id, this.actionOwner, this.action, this.actionDeadline)
        .subscribe(data => {
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
