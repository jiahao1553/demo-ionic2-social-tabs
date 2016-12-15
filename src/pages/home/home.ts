import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Shared } from '../../providers/shared';
import { Post } from '../../models/post';
import { CommentModalPage } from '../comment-modal/comment-modal';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  post: Post[];
  constructor(public navCtrl: NavController, public Params: Shared,public navParams: NavParams) {
this.post = Params.Post;
  }
  goToDetailPage(post:Post) {
      this.navCtrl.push(DetailPage, {post});
    }

    openComment() {
    this.navCtrl.push(CommentModalPage);
  }
}
