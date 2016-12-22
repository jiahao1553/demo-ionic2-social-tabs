import { Component, ViewChild } from '@angular/core'; //Viewchild for collapse view model
import { Content } from 'ionic-angular'; //content for collapse view model
import { NavController, ActionSheetController, ViewController, AlertController, NavParams, LoadingController, ModalController } from 'ionic-angular'; //viewcontroller for collapse view model
import { CalculateModalPage } from '../calculate-modal/calculate-modal';
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
  CalculateVisibility: boolean = false;
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
    let loading = this.loadingCtrl.create({
      content: "Getting suggestions we collected..."
    });
    loading.present();
    this.suggestion = "";
    this.i = navParams.get('idea');

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
    this.navCtrl.push(CalculateModalPage);
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
            this.CalculateVisibility = false;
            this.content.resize();
          }
        },
        {
          text: 'Going',
          handler: () => {
            console.log('Going clicked');
            this.i.status = "Going";
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
        content: "Your idea is going live :)"
      });
      loading.present();

      this.restService.postSuggestion(this.i.id, this.shared.username, this.suggestion)
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
