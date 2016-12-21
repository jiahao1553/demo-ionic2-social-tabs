import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Idea } from '../../models/idea';
// import { Shared } from '../../providers/shared';

/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
idea: Idea;
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AccountPage Page');
  }

}
