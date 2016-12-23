import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { RestService } from '../../providers/rest-service';
import { Shared } from '../../providers/shared';
import { Idea } from '../../models/idea';
import { Suggestion } from '../../models/suggestion';
import { Action } from '../../models/action';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
ideas: Idea[];
suggestions: Suggestion[];
actions: Action[];

  areas: any = [];
  area: string;
  status: string;
  startDate: number;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private restService: RestService,
    public shared: Shared) {
    this.areas = this.shared.AreaSet;
    this.area = "";
    this.status = "";
    this.startDate = 0;
  }

  ionViewDidLoad() {
    console.log('Hello SearchPage Page');
  }

  search(searchEvent) {
    let term = searchEvent.target.value;
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 3) {
      this.ideas = [];
      this.suggestions = [];
      this.actions = [];
    }
    // else {
    //   // Get the searched results
    //   this.restService.searchIdeas(term, this.area, this.status, this.startDate).subscribe(data => {
    //     this.ideas = data;
    //   });
    //
    //   this.restService.searchSuggestions(term, this.area, this.status, this.startDate).subscribe(data => {
    //     this.suggestions = data;
    //   });
    //
    //   this.restService.searchActions(term, this.area, this.status, this.startDate).subscribe(data => {
    //     this.actions = data;
    //   });
    // }
  }



}
