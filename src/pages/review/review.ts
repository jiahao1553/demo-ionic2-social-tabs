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
  @ViewChild("fileInputBefore") fileInputBefore;
  @ViewChild("fileInputAfter") fileInputAfter;
  fiBefore: any;
    fiAfter: any;
    fileIdBefore: string;
    fileIdAfter: string;
  fileBeforeExist: boolean;
    fileAfterExist: boolean;

loading: any;

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

        this.fileBeforeExist=false;
          this.fileAfterExist=false;

          this.loading = this.loadingCtrl.create({
            content: "We're submitting your review. Be patient."
          });
    }

  ionViewDidLoad() {
    console.log('Hello ReviewPage Page');
  }

  addFile(mode: boolean){
    if(mode){
      this.fiBefore = this.fileInputBefore.nativeElement;
      this.fileBeforeExist= (this.fiBefore.files && this.fiBefore.files[0]);
    }
    else{
      this.fiAfter = this.fileInputBefore.nativeElement;
      this.fileBeforeExist= (this.fiAfter.files && this.fiAfter.files[0]);
    }
  }

  postBeforeFile(){
      let fileToUpload = this.fiBefore.files[0];
      this.restService
        .uploadFile(fileToUpload)
        .subscribe(res => {
          this.review.imageBefore=res.json();
          this.postAfterFile();
        },(err) => {
          let alert = this.alertCtrl.create({
            title: 'Sending file failed',
            message: err,
            buttons: ['Try again']
          });
          alert.present();
        });
  }

  postAfterFile(){
      let fileToUpload = this.fiAfter.files[0];
      this.restService
        .uploadFile(fileToUpload)
        .subscribe(res => {
          this.review.imageAfter=res.json();
          this.postReview();
        },(err) => {
          let alert = this.alertCtrl.create({
            title: 'Sending file failed',
            message: err,
            buttons: ['Try again']
          });
          alert.present();
        });
  }

  postReview(){
    this.restService.postReview(this.review)
    .subscribe(data => {
      this.loading.dismiss();
      this.navCtrl.setRoot(TabsPage);
      this.shared.toast("The application is sent to CI team for review. Thanks.");
    }, (err) => {
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Sending review failed',
        message: err,
        buttons: ['Try again']
      });
      alert.present();
    });
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
      this.loading.present();

      if(this.fileBeforeExist&&this.fileAfterExist){
        this.postBeforeFile();
      }
      else{
        this.postReview();
      }

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
