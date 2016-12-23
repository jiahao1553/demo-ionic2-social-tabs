import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Review page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})
export class ReviewPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ReviewPage Page');
  }

}
