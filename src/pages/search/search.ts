import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
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
  @ViewChild(Content) content: Content;
  refreshToggle:boolean;
  idea: Idea;
ideas: Idea[];
suggestions: Suggestion[];
actions: Action[];

  areas: any = [];
  area: string;
  status: string;
  startDate: string;
  endDate: string;
  term: string;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private restService: RestService,
    public shared: Shared) {
    this.areas = this.shared.AreaSet;
    this.reset();
  }

  ionViewDidLoad() {
    console.log('Hello SearchPage Page');
  }

  searchIdea(event){
    this.restService.searchIdea("description", this.term, this.area, this.status, this.startDate, this.endDate).subscribe(data => {
      this.ideas = data;
    });
    this.refreshToggle = true;
    this.content.resize();
  }

  searchAll(event){
    this.restService.searchIdea("description", this.term, this.area, this.status, this.startDate, this.endDate).subscribe(data => {
      this.ideas = data;
    });

    this.restService.searchSuggestion("suggestion", this.term, this.startDate, this.endDate).subscribe(data => {
      this.suggestions = data;
    });

    this.restService.searchAction("action", this.term, this.startDate, this.endDate).subscribe(data => {
      this.actions = data;
    });

    this.refreshToggle = true;
    this.content.resize();
  }

  search(searchEvent) {
    this.term = searchEvent.target.value;
    // Only perform the search if we have 3 or more characters
    if (this.term.trim() === '' || this.term.trim().length < 3) {
      this.ideas = [];
      this.suggestions = [];
      this.actions = [];
    }
    else {
      // Get the searched results
      this.restService.searchIdea("description", this.term, this.area, this.status, this.startDate, this.endDate).subscribe(data => {
        this.ideas = data;
      });

      this.restService.searchSuggestion("suggestion", this.term, this.startDate, this.endDate).subscribe(data => {
        this.suggestions = data;
      });

      this.restService.searchAction("action", this.term, this.startDate, this.endDate).subscribe(data => {
        this.actions = data;
      });
    }

    this.refreshToggle = true;
    this.content.resize();
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

refresh(){
  this.reset();
  this.content.resize();
}
  reset(){
    this.refreshToggle = false;
    this.area = "";
    this.status = "";
    this.startDate = "2016-01-01";
    this.endDate = this.shared.getToday();
    this.term = "";
  }
}
