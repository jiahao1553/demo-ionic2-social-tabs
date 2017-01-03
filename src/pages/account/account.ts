import { Component} from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, ViewController } from 'ionic-angular';
import { App} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ListingPage } from '../listing/listing';
import { General } from '../../models/general';
import { Idea } from '../../models/idea';
import { Action } from '../../models/action';
import { Suggestion } from '../../models/suggestion';
import { Shared } from '../../providers/shared';
import { RestService } from '../../providers/rest-service';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  fuel:number;
  constructor(private app: App,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private restService: RestService,
    private shared: Shared) {
      this.fuel = shared.ideaNo/2+shared.actionNo/2;
  }

  ionViewDidLoad() {
    console.log('Hello AccountPage Page');
  }

  ideaToGeneral(ideas: Idea[]): General[] {
    var generals: General[] = [];
    for (let i = 0; i < ideas.length; i++) {
      let data = [{
        id: ideas[i].id,
        description: ideas[i].description,
        date: ideas[i].updatedAt
      }];
      if (generals.length > 0) {
        generals = generals.concat(data);
      }
      else {
        generals = data;
      }
    }
    return generals;
  }

  actionToGeneral(actions: Action[]): General[] {
    var generals: General[] = [];
    for (let i = 0; i < actions.length; i++) {
      let data = [{
        id: actions[i].ideaId,
        description: actions[i].action,
        date: actions[i].actionDeadline
      }];
      if (generals.length > 0) {
        generals = generals.concat(data);
      }
      else {
        generals = data;
      }
    }
    return generals;
  }

  suggestionToGeneral(suggestions: Suggestion[]): General[] {
    var generals: General[] = [];
    for (let i = 0; i < suggestions.length; i++) {
      let data = [{
        id: suggestions[i].ideaId,
        description: suggestions[i].suggestion,
        date: suggestions[i].updatedAt
      }];
      if (generals.length > 0) {
        generals = generals.concat(data);
      }
      else {
        generals = data;
      }
    }
    return generals;
  }

  loadIdeas(mode: number) {
    let loading = this.loadingCtrl.create({
      content: "Getting your ideas..."
    });
    loading.present();

    var key: string;
    var value: string;
    var title: string;

    switch (mode) {
      case 0:
        key = "ideaOwner";
        value = this.shared.username;
        title = "Ideas";
        break;
      case 1:
        key = "status";
        value = "Closed";
        title = "Closed Ideas";
        break;
      case 2:
        key = "likesString";
        value = this.shared.username;
        title = "Liked Ideas";
        break;
      default:
        key = "ideaOwner";
        value = this.shared.username;
        title = "Ideas";
        break;
    }
    this.restService.searchIdea(key, value, "", "", "2016-01-01", "2036-01-01")
      .subscribe(data => {
        loading.dismiss();
        this.modalListing(title, this.ideaToGeneral(data));
      }, (err) => {
        loading.dismiss();
        console.log(err);
      });
  }

  loadActions() {
    let loading = this.loadingCtrl.create({
      content: "Getting your actions..."
    });
    loading.present();

    this.restService.searchAction("actionOwner", this.shared.username, "2016-01-01", "2036-01-01")
      .subscribe(data => {
        loading.dismiss();
        this.modalListing("Actions", this.actionToGeneral(data));
      }, (err) => {
        loading.dismiss();
        console.log(err);
      });
  }

  loadSuggestions() {
    let loading = this.loadingCtrl.create({
      content: "Getting your suggestions..."
    });
    loading.present();

    this.restService.searchSuggestion("suggestionOwner", this.shared.username, "2016-01-01", "2036-01-01")
      .subscribe(data => {
        loading.dismiss();
        this.modalListing("Suggestions", this.suggestionToGeneral(data));
      }, (err) => {
        loading.dismiss();
        console.log(err);
      });
  }

  modalListing(title: string, generals: General[]) {
    console.log(generals);
    let modal = this.modalCtrl.create(ListingPage, { title: title, generals: generals });
    modal.present();
  }

  goToLogin() {
    this.app.getRootNav().push(LoginPage);
  }
}
