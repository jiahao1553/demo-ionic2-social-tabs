import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestService } from '../../providers/rest-service';
import { Shared } from '../../providers/shared';
import { Post } from '../../models/post';
import { Idea } from '../../models/idea';
import { User } from '../../models/user';
import { CommentModalPage } from '../comment-modal/comment-modal';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts: Post[];
  ideas: Idea[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public restService: RestService,
  public Params:Shared) {
      let loading = this.loadingCtrl.create({
        content: "Getting ideas we collected..."
      });
      loading.present();

      this.restService.getIdea().subscribe(data => {
        console.log(data);
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
        console.log('Error');
      });
      this.posts = Params.Post;
  }
  goToDetailPage(post: Post) {
    this.navCtrl.push(DetailPage, { post });
  }

  openComment() {
    this.navCtrl.push(CommentModalPage);
  }
}
