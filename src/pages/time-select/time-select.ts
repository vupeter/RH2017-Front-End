import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LocationTracker } from '../../providers/location-tracker';

/*
  Generated class for the TimeSelect page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-time-select',
  templateUrl: 'time-select.html'
})
export class TimeSelectPage {
  long: any;
  lat: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public locationTracker: LocationTracker) {
    this.long = "Not defined yet";
    this.lat = "Not defined yet";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeSelectPage');
    this.start();
  }

  start() {
        this.locationTracker.startTracking();
        this.long = this.locationTracker.lng;
        this.lat = this.locationTracker.lat;
    }

    stop() {
        this.locationTracker.stopTracking();
    }

}
