import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams, LoadingController, ModalController, AlertController} from 'ionic-angular';
import { Shared } from '../../providers/shared';
import { RestService } from '../../providers/rest-service';
import { Idea } from '../../models/idea';
import { SuggestionPage } from '../suggestion/suggestion';
import { PostPage } from '../post/post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  gridfsUrl: string;
    @ViewChild(Content) content: Content;
  ideas: Idea[];
  moreIdeas: Idea[];
  loadIdeasSkipper: number;
  refreshToggle: boolean;
  // notFoundMessageToggle: boolean;
  loading: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public restService: RestService,
    private shared: Shared) {
      this.gridfsUrl= this.restService.gridfsUrl;
      this.loading = this.loadingCtrl.create({
        content: "Getting ideas we collected..."
      });
      this.reset();
  }

refresh(){
  this.reset();
  this.content.resize();
}

  reset(){
    this.refreshToggle = false;

      this.loadIdeasSkipper = 0;

      this.loading.present();

      this.restService.getIdea(this.loadIdeasSkipper).subscribe(data => {
        this.ideas = data;
        // if(this.ideas.length==0){
        //   this.notFoundMessageToggle = false;
        // }
        // else{
        //   this.notFoundMessageToggle = true;
        // }
        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
        console.log('Error');
      });
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  doInfinite(infiniteScroll) {
    this.refreshToggle = true;
    this.content.resize();

    this.loadIdeasSkipper+=10;
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

  like(idea: Idea){
    if(idea.likesString.includes(this.shared.username)){
      let alert = this.alertCtrl.create({
            title: 'Oops!',
            message: 'You liked the idea before',
            buttons: ['OK']
          });
          alert.present();
    }
    else{
      let loading = this.loadingCtrl.create({
        content: "Submitting like..."
      });
      loading.present();

      idea.likes.push(this.shared.username);
      idea.likesString = idea.likes.toString();
      this.restService.updateIdea(idea.id, idea.status, idea.likes, idea.likesString,
        idea.suggestionsNo, idea.latestSuggestionOwner,
        idea.latestSuggestionOwnerFullname, idea.latestSuggestion)
        .subscribe(data =>{
          loading.dismiss();
          console.log(data);
        }, (err) =>{
          loading.dismiss();
          console.log(err);
        });
    }
  }

  modalSuggestion(idea: Idea) {
    let modal = this.modalCtrl.create(SuggestionPage, {idea});
    modal.present();
  }

  modalPost() {
    let modal = this.modalCtrl.create(PostPage);
    modal.present();
  }
}
