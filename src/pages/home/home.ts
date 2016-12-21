import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestService } from '../../providers/rest-service';
import { Idea } from '../../models/idea';
import { CommentModalPage } from '../comment-modal/comment-modal';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ideas: Idea[];
  moreIdeas: Idea[];
  loadIdeasSkipper: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public restService: RestService) {
      this.loadIdeasSkipper = 0;
      let loading = this.loadingCtrl.create({
        content: "Getting ideas we collected..."
      });
      loading.present();

      this.restService.getIdea(this.loadIdeasSkipper).subscribe(data => {
        this.ideas = data;
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
        console.log('Error');
      });
  }

  doInfinite(infiniteScroll) {
    this.loadIdeasSkipper+=5;
    console.log(this.loadIdeasSkipper);
    setTimeout(() => {
      this.restService.getIdea(this.loadIdeasSkipper).subscribe(data => {
        this.moreIdeas = data;
        this.ideas = this.ideas.concat(this.moreIdeas);
      }, (err) => {
        console.log('Error');
      });
      infiniteScroll.complete();
    }, 3000);
  }

  goToDetailPage(idea: Idea) {
    this.navCtrl.push(DetailPage, { idea });
  }

  openComment() {
    this.navCtrl.push(CommentModalPage);
  }
}
