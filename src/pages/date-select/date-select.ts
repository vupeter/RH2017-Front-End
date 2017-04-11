import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
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
  body: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) { 
    this.body = "Test"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateSelectPage');
    this.color = "light";
    this.start = 'Start Date';
    this.end = 'End Date';
    let dis = this;

    this.body = "Running";
    this.http.get('https://cryndex.io/api/ru/location/all').map(res => res.json()).subscribe(body => {
        dis.body = "Ran";
        dis.body = JSON.stringify(body);
        for (let location in body.body) {
            this.http.get('https//maps.googleapis.com/maps/api/geocode/json?address=${location.address}&key=AIzaSyDaS3Vc0TUNmoyP8iObmU0BkbB9t_Wt4bs').map(res => res.json()).subscribe(body2 => {
                //this.addMarker(body.results[0].geometry.location)
            })
        }
    });
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
