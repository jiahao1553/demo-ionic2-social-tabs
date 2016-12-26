import { Component, ViewChild } from '@angular/core'; //Viewchild for collapse view model
import { Content } from 'ionic-angular'; //content for collapse view model
import { NavController, ActionSheetController, ViewController, AlertController, NavParams, LoadingController, ModalController } from 'ionic-angular'; //viewcontroller for collapse view model
import { CalculatePage } from '../calculate/calculate';
import { Idea } from '../../models/idea';
import { Suggestion } from '../../models/suggestion';
import { Shared } from '../../providers/shared';
import { RestService } from '../../providers/rest-service';
import { ActionPage } from '../action/action';

@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html'
})
export class SuggestionPage {
  @ViewChild(Content) content: Content;
  CalculateVisibility: boolean;

  gridfsUrl: string;
  i: Idea;
  suggestion: string;
  suggestions: Suggestion[];

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    public shared: Shared,
    public restService: RestService) {
      this.gridfsUrl = this.restService.gridfsUrl;

    let loading = this.loadingCtrl.create({
      content: "Loading suggestion..."
    });
    loading.present();

    this.suggestion = "";
    this.i = navParams.get('idea');
    if(this.i.status=="Closed"){
      this.CalculateVisibility = true;
    }
    else{
      this.CalculateVisibility = false;
    }

    this.restService.getSuggestion(this.i.id).subscribe(data => {
      this.suggestions = data;
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
      console.log('Error');
    });
  }

  ionViewDidLoad() {
    console.log('Hello SuggestionPage Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  modalAction(suggestion: Suggestion) {
    let modal = this.modalCtrl.create(ActionPage, {suggestion});
    modal.present();
  }

  modalCalculate() {
    let modal = this.modalCtrl.create(CalculatePage, {idea: this.i, suggestions: this.suggestions});
    modal.present();
  }

  like(idea: Idea){
    if (idea.likesString.includes(this.shared.username)){
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

  selectProgress() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Current Progress',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            console.log('Open clicked');
            this.i.status = "Open";
            let loading = this.loadingCtrl.create({
              content: "We're updating your status..."
            });
            loading.present();
            this.restService.updateIdea(this.i.id, this.i.status, this.i.likes, this.i.likesString,
              this.i.suggestionsNo, this.i.latestSuggestionOwner,
              this.i.latestSuggestionOwnerFullname, this.i.latestSuggestion)
              .subscribe(data =>{
                loading.dismiss();
                console.log(data);
              }, (err) =>{
                loading.dismiss();
                console.log(err);
              });
            this.CalculateVisibility = false;
            this.content.resize();
          }
        },
        {
          text: 'Going',
          handler: () => {
            console.log('Going clicked');
            this.i.status = "Going";
            let loading = this.loadingCtrl.create({
              content: "We're updating your status..."
            });
            loading.present();
            this.restService.updateIdea(this.i.id, this.i.status, this.i.likes, this.i.likesString,
              this.i.suggestionsNo, this.i.latestSuggestionOwner,
              this.i.latestSuggestionOwnerFullname, this.i.latestSuggestion)
              .subscribe(data =>{
                loading.dismiss();
                console.log(data);
              }, (err) =>{
                loading.dismiss();
                console.log(err);
              });
            this.CalculateVisibility = false;
            this.content.resize();
          }
        },
        {
          text: 'Closed',
          role: 'destructive',
          handler: () => {
            console.log('Process clicked');
            this.i.status = "Closed";
            let loading = this.loadingCtrl.create({
              content: "We're updating your status..."
            });
            loading.present();
            this.restService.updateIdea(this.i.id, this.i.status, this.i.likes, this.i.likesString,
              this.i.suggestionsNo, this.i.latestSuggestionOwner,
              this.i.latestSuggestionOwnerFullname, this.i.latestSuggestion)
              .subscribe(data =>{
                loading.dismiss();
                console.log(data);
              }, (err) =>{
                loading.dismiss();
                console.log(err);
              });
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

  post(){
    if(this.suggestion.trim().length>0){

      let loading = this.loadingCtrl.create({
        content: "Your suggestion is going live :)"
      });
      loading.present();
      this.i.suggestionsNo++;
      this.restService.updateIdea(this.i.id, this.i.status, this.i.likes, this.i.likesString,
        this.i.suggestionsNo, this.shared.username,
        this.shared.fullname, this.suggestion)
        .subscribe(data =>{
          loading.dismiss();
          console.log(data);
        }, (err) =>{
          loading.dismiss();
          console.log(err);
        });

      this.restService.postSuggestion(this.i.id, this.shared.username, this.shared.fullname, this.suggestion)
      .subscribe(data => {
        this.shared.toast('Suggestion uploaded');
        loading.dismiss();
        this.dismiss();
      }, (err) => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Sending suggestion failed',
          message: err,
          buttons: ['Try again']
        });
        alert.present();
      });
    }
  }
}
