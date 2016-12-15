import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Shared } from '../../providers/shared';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  Progress: string = "open";
  Areas: any = [];
  Area: string = "Area 0";
  StartDateUnix: number = 86400;
  SearchbyTopic: boolean = true;
  SearchbyUser: boolean = false;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public shared: Shared) {
    // this.Area = this.shared.Area;
    this.Areas = this.shared.AreaSet;
  }

  ionViewDidLoad() {
    console.log('Hello SearchPage Page');
  }

}
