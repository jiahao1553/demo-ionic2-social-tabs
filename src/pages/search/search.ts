import { Component } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';
import { RestService } from '../../providers/rest-service';
import { Shared } from '../../providers/shared';
import { Idea } from '../../models/idea';
import { Suggestion } from '../../models/suggestion';
import { Action } from '../../models/action';
import { SuggestionPage } from '../suggestion/suggestion';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  idea: Idea;
ideas: Idea[];
suggestions: Suggestion[];
actions: Action[];

  areas: any = [];
  area: string;
  status: string;
  startDate: string;
  endDate: string;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private restService: RestService,
    public shared: Shared) {
    this.areas = this.shared.AreaSet;
    this.area = "";
    this.status = "";
    this.startDate = "2016-01-01";
    this.endDate = this.shared.getToday();
  }

  ionViewDidLoad() {
    console.log('Hello SearchPage Page');
  }

  search(searchEvent) {
    let term = searchEvent.target.value;
    // Only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 3) {
      this.ideas = [];
      this.suggestions = [];
      this.actions = [];
    }
    else {
      // Get the searched results
      this.restService.searchIdea("description", term, this.area, this.status, this.startDate, this.endDate).subscribe(data => {
        this.ideas = data;
      });

      this.restService.searchSuggestion("suggestion", term, this.startDate, this.endDate).subscribe(data => {
        this.suggestions = data;
      });

      this.restService.searchAction("action", term, this.startDate, this.endDate).subscribe(data => {
        this.actions = data;
      });
    }
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

}
