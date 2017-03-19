import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  CameraPosition,
  GoogleMapsMarkerOptions,
  GoogleMapsMarker,
  GoogleMapsMapTypeId
} from 'ionic-native';

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map = new GoogleMap(element);

    // create LatLng object
    let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904, -89.3809802);

    // create CameraPosition
    let position: CameraPosition = {
      target: ionic,
      zoom: 18,
      tilt: 30
    };

    // listen to MAP_READY event
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      // move the map's camera to position
      map.moveCamera(position); // works on iOS and Android
    })


    // create new marker
    let markerOptions: GoogleMapsMarkerOptions = {
      position: ionic,
      title: 'Ionic'
    };

    map.addMarker(markerOptions)
      .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
      });


  }
}