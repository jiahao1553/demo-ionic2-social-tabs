import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { General } from '../../models/general';
import { Idea } from '../../models/idea';
import { RestService } from '../../providers/rest-service';
import { SuggestionPage } from '../suggestion/suggestion';

@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html'
})
export class ListingPage {
  title: string;
generals: General[];

idea: Idea;
notFoundMessageToggle: boolean;
  constructor(private navCtrl: NavController,
    private navParams: NavParams,
  private modalCtrl: ModalController,
  private viewCtrl: ViewController,
private restService: RestService) {
      this.title = navParams.get('title');
      this.generals = navParams.get('generals');
      if(this.generals.length==0){
        this.notFoundMessageToggle = false;
      }
      else{
        this.notFoundMessageToggle = true;
      }
    }

  ionViewDidLoad() {
    console.log('Hello ListingPage Page');
  }

  loadIdea(id: string){
    this.restService.getOneIdea(id).subscribe(data => {
      this.idea = data;
      this.modalSuggestion(this.idea);
    });
  }

  modalSuggestion(idea: Idea) {
      let modal = this.modalCtrl.create(SuggestionPage, {idea});
      modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
