import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, ViewController, AlertController, NavParams, LoadingController, ModalController} from 'ionic-angular';
import { Shared } from '../../providers/shared';
import { RestService } from '../../providers/rest-service';
import { ReviewPage } from '../review/review';
import { Idea } from '../../models/idea';
import { Suggestion } from '../../models/suggestion';

@Component({
  selector: 'page-calculate',
  templateUrl: 'calculate.html'
})
export class CalculatePage {
  idea: Idea;
  suggestion: string;
  suggestionId: string;
  suggestionToggle: boolean;
  suggestions: Suggestion[];
  @ViewChild(Content) content: Content;
  CalculateItemVisibility: boolean;
  LvCycleTime: boolean;
  LvScrapReworkWaste: boolean;
  LvSpaceUtilization: boolean;
  LvInventoryAssets: boolean;
  LvOthers: boolean;
  LvHardSaving: boolean;
  LvSoftSaving: boolean;

  BenefitCategory: string;

  SoftSaving: number;
  HardSaving: number;

  CtTime: number;
  CtCost: number;
  CtFreq: number;
  CtFreqMultiplier: number;
  CtPeople: number;
  CtTotal: number;

  SrwUnitReduction: number;
  SrwCost: number;
  SrwTotal: number;

  SuSpaceReduction: number;
  SuOverhead: number;
  SuTotal: number;

  IaQuantity: number;
  IaCost: number;
  IaTotal: number;

  OoTotal: number;
  OoNotes: string;

  HsPeopleCost: number;
  HsOvertime: number;
  HsTempWorker: number;
  HsSrw: number;
  HsOther: number;
  HsNotes: string;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private shared: Shared,
    private restService: RestService) {
      this.suggestionToggle = true;
    this.idea = navParams.get('idea');
    this.suggestions = navParams.get('suggestions');
    this.suggestion = "";
    this.suggestionId = "";
    this.CalculateItemVisibility = false;
    this.BenefitCategory = "Quality and Safety";
    this.reset();
  }

  ionViewDidLoad() {
    console.log('Hello ReviewPage Page');
  }

  toggleCalculateItemVisibility(event) {
    switch (this.BenefitCategory) {
      case "Quality and Safety":
        this.CalculateItemVisibility = false;
        this.content.resize();
        this.reset();
        break;

      case "Cycle Time":
        this.CalculateItemVisibility = true;
        this.content.resize();
        this.reset();
        this.LvCycleTime = true;
        break;

      case "Scrap/Rework/Waste":
        this.CalculateItemVisibility = true;
        this.content.resize();
        this.reset();
        this.LvScrapReworkWaste = true;
        break;

      case "Space Utilization":
        this.CalculateItemVisibility = true;
        this.content.resize();
        this.reset();
        this.LvSpaceUtilization = true;
        break;

      case "Inventory Assets":
        this.CalculateItemVisibility = true;
        this.content.resize();
        this.reset();
        this.LvInventoryAssets = true;
        break;

      case "Others":
        this.CalculateItemVisibility = true;
        this.content.resize();
        this.reset();
        this.LvOthers = true;
        break;

      default:
        console.log('No case found');
        break;
    }
  }

  toggleSoftSavingCalculator() {
    this.LvSoftSaving = !this.LvSoftSaving;
    this.content.resize();
  }

  toggleHardSavingCalculator() {
    this.LvHardSaving = !this.LvHardSaving;
    this.content.resize();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  modalReview() {
    let review ={
      ideaId: this.idea.id,
      topic: "",
      idea: this.idea.description,
      area: this.idea.area,
      updatedAt: "",
      suggestionId: this.suggestionId,
      suggestion: this.suggestion,
      benefit: "",
      benefitCategory: this.BenefitCategory,
      ideaOwner: this.idea.ideaOwner,
      teamMembers: "",

      imageBefore: "",
      imageAfter: "",

      softSaving: this.SoftSaving,
      hardSaving: this.HardSaving,

      ctTime: this.CtTime,
      ctCost: this.CtCost,
      ctFreq: this.CtFreq,
      ctFreqMultiplier: this.CtFreqMultiplier,
      ctPeople: this.CtPeople,
      ctTotal: this.CtTotal,

      srwUnitReduction: this.SrwUnitReduction,
      srwCost: this.SrwCost,
      srwTotal: this.SrwTotal,

      suSpaceReduction: this.SuSpaceReduction,
      suOverhead: this.SuOverhead,
      suTotal: this.SuTotal,

      iaQuantity: this.IaQuantity,
      iaCost: this.IaCost,
      iaTotal: this.IaTotal,

      ooTotal: this.OoTotal,
      ooNotes: this.OoNotes,

      hsPeopleCost: this.HsPeopleCost,
      hsOvertime: this.HsOvertime,
      hsTempWorker: this.HsTempWorker,
      hsSrw: this.HsSrw,
      hsOther: this.HsOther,
      hsNotes: this.HsNotes
    }

    console.log(review);
    let modal = this.modalCtrl.create(ReviewPage, {review: review});
    modal.present();
  }

  reset() {
    this.LvCycleTime = false;
    this.LvScrapReworkWaste = false;
    this.LvSpaceUtilization = false;
    this.LvInventoryAssets = false;
    this.LvOthers = false;
    this.LvHardSaving = false;
    this.LvSoftSaving = false;

    this.SoftSaving = 0;
    this.HardSaving = 0;

    this.CtTime = 0;
    this.CtCost = 0;
    this.CtFreq = 0;
    this.CtFreqMultiplier = 220;
    this.CtPeople = 0;
    this.CtTotal = 0;

    this.SrwUnitReduction = 0;
    this.SrwCost = 0;
    this.SrwTotal = 0;

    this.SuSpaceReduction = 0;
    this.SuOverhead = 0;
    this.SuTotal = 0;

    this.IaQuantity = 0;
    this.IaCost = 0;
    this.IaTotal = 0;

    this.OoTotal = 0;
    this.OoNotes = "";

    this.HsPeopleCost = 0;
    this.HsOvertime = 0;
    this.HsTempWorker = 0;
    this.HsSrw = 0;
    this.HsOther = 0;
    this.HsNotes = "";
  }

  calculate() {
    this.CtTotal = this.CtTime / 60 * this.CtCost * this.CtFreq * this.CtFreqMultiplier * this.CtPeople;
    this.SrwTotal = this.SrwUnitReduction * this.SrwCost;
    this.SuTotal = this.SuSpaceReduction * this.SuOverhead;
    this.IaTotal = this.IaQuantity * this.IaCost;

    this.HsSrw = this.SrwTotal;

    this.SoftSaving = this.CtTotal + this.SrwTotal + this.SuTotal + this.IaTotal + this.OoTotal;
    this.HardSaving = this.HsPeopleCost + this.HsOvertime + this.HsTempWorker + this.HsSrw + this.HsOther;
  }

  selectSuggestion(suggest: Suggestion){
    this.suggestion = suggest.suggestion;
    this.suggestionId = suggest.id;
    this.suggestionToggle = false;
    this.content.resize();
  }
}
