import { Component, ViewChild } from '@angular/core'; //Viewchild for collapse view model
import { Content } from 'ionic-angular'; //content for collapse view model
import { NavController, ActionSheetController, ViewController, NavParams} from 'ionic-angular'; //viewcontroller for collapse view model

import { CommentModalPage } from '../comment-modal/comment-modal';
import { CalculateModalPage } from '../calculate-modal/calculate-modal';
import { Post } from '../../models/post';
import { Shared } from '../../providers/shared';
/*
  Generated class for the Detail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  @ViewChild(Content) content: Content;
  Area: string = "Production-LCMS";
  CompletionDate: string="2016-11-19";
  YourActionVisibility: boolean=false;
  CalculateVisibility: boolean=false;
  post: Post;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public viewCtrl: ViewController,
    private navParams: NavParams,
    public Params: Shared) {
      this.post = navParams.get('post');
    }

  ionViewDidLoad() {
    console.log('Hello DetailPage Page');
  }


selectProgress() {
let actionSheet = this.actionSheetCtrl.create({
  title: 'Current Progress',
  buttons: [
    {
      text: 'Open',
      //role: 'destructive',
      handler: () => {
        console.log('Open clicked');
        this.post.Progress = "Open";
        this.YourActionVisibility = false;
        this.CalculateVisibility = false;
        this.content.resize();
      }
    },
    {
      text: 'Process',
      handler: () => {
        console.log('Process clicked');
        this.post.Progress = "Process";
        this.YourActionVisibility = true;
        this.CalculateVisibility = false;
        this.content.resize();
      }
    },
    {
      text: 'Closed',
      role: 'destructive',
      handler: () => {
        console.log('Process clicked');
        this.post.Progress = "Closed";
        this.YourActionVisibility = false;
        this.CalculateVisibility = true;
        this.content.resize();
      }
    },
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }
  ]
});
actionSheet.present();
}

openComment() {
      this.navCtrl.push(CommentModalPage);
    }
openCalculate() {
  this.navCtrl.push(CalculateModalPage);
      }

}
