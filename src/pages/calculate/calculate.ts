import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Calculate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-calculate',
  templateUrl: 'calculate.html'
})
export class CalculatePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello CalculatePage Page');
  }

}
