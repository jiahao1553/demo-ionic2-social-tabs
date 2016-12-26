import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, ViewController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { RestService } from '../../providers/rest-service';
import { Shared } from '../../providers/shared';
import { Review } from '../../models/review';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})
export class ReviewPage {
  @ViewChild(Content) content: Content;
    Vacants: any = [];
    TeamMembers: any = [];
    Count: number;

    review: Review;

    constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  private restService: RestService,
private shared: Shared)
      {
        this.review = navParams.get('review');
        this.Count=0;
        this.Vacants=[{id: this.Count, value: 'Team Member 1'}];
    }

  ionViewDidLoad() {
    console.log('Hello ReviewPage Page');
  }

  increaseArray(){
    this.Count++;
    this.Vacants.push({ id: this.Count, value: 'Team Member '+(this.Count+1)});
  }

  decreaseArray(){
    this.Count--;
    this.Vacants.pop();
  }

  post(){
    this.review.teamMembers = this.TeamMembers.toString();
    if((this.review.benefit.trim().length>0)&&(this.review.teamMembers.trim().length>0)){
      let loading = this.loadingCtrl.create({
        content: "Your review will be submitted for rewarding :)"
      });
      loading.present();

      this.restService.postReview(this.review)
      .subscribe(data => {
        loading.dismiss();
        this.shared.toast('Review uploaded');
        this.navCtrl.setRoot(TabsPage);
      }, (err) => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Sending review failed',
          message: err,
          buttons: ['Try again']
        });
        alert.present();
      });
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Sending review failed',
        message: "Looks like you haven't key in the benefit description or team members involved",
        buttons: ['Try again']
      });
      alert.present();
    }
  }

dismiss() {
  this.viewCtrl.dismiss();
  //this.navCtrl.pop(); 2 times also can
}
}
