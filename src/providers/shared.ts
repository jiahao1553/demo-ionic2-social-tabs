import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RestService } from './rest-service';
import { ToastController } from 'ionic-angular';
import { User } from '../models/user';

@Injectable()
export class Shared {
  AreaSet: any = [];
  userId:any;
  username: any;
  nickname: any;
  avatarId: any;
  users: User[];
  constructor(private http: Http,
    private toastCtrl: ToastController,
    private restService: RestService) {
    console.log('Hello Shared Provider');
    this.AreaSet = [
      {id: 'pl', value: 'Production-LCMS'},
      {id: 'aa', value: 'AAS'},
      {id: 'ar', value: 'ARES'},
      {id: 'bp', value: 'Button Up'},
      {id: 'ct', value: 'ChemTest'},
      {id: 'eo', value: 'EMOD'},
      {id: 'es', value: 'ESS'},
      {id: 'el', value: 'Engineering-LCMS'},
      {id: 'fa', value: 'Final Assembly'},
      {id: 'gc', value: 'GFM/CDS'},
      {id: 'io', value: 'Ion Optics'},
      {id: 'if', value: 'Ion Funnel'},
      {id: 'lo', value: 'Logistics'},
      {id: 'ms', value: 'Mass Filter'},
      {id: 'me', value: 'Material Engineering'},
      {id: 'md', value: 'Medusa/DEI'},
      {id: 'mt', value: 'Mirrors/Pulsers/Towers'},
      {id: 'nc', value: 'NCM'},
      {id: 'np', value: 'NPI'},
      {id: 'pc', value: 'Procurement'},
      {id: 'qd', value: 'Quad Driver'},
      {id: 'qq', value: 'Quality'},
      {id: 'rd', value: 'R&D'},
      {id: 'sf', value: 'SFC'},
      {id: 'sc', value: 'Scanner'},
      {id: 'sd', value: 'Source/Desolvation'},
      {id: 'tp', value: 'TIS/Planning'},
      {id: 'tr', value: 'Training'},
      {id: 'ot', value: 'Others'}
    ];
    this.userId="";
    this.username = "Anonymous";
    this.nickname = "Anonymous";
    this.avatarId = "5859f2943c5f0e00047e4cb6";
  }

  toast(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  getUserInformation(username: string){
    this.restService.searchUser("username", username).subscribe(data => {
      this.users = data;
      this.userId = this.users[0].id;
      this.username = this.users[0].username;
      this.nickname = this.users[0].nickname;
      this.avatarId = this.users[0].avatarId;
    }, (err) => {
      console.log('Error');
    });
  }

  getToday():string{
    var utc = new Date().toJSON().slice(0,10);
    return utc;
  }
}
