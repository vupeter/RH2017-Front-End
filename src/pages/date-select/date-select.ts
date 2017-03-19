import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


/*
  Generated class for the DateSelect page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-date-select',
  templateUrl: 'date-select.html'
})
export class DateSelectPage {
  click1: boolean;
  click2: boolean;
  start: any
  end: any
  color: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateSelectPage');
    this.color = "light";
    this.start = 'Start Date';
    this.end = 'End Date';
  }

  over1(){
    if(this.click1) return;
    this.click1=!this.click1;
    this.start = new Date()
  }

  over2(){
    if(this.click2) return;
    this.click2=!this.click2;
    this.end = this.start;
  }

}
