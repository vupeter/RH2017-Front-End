import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';
import { DateSelectPage } from '../date-select/date-select';
import { TimeSelectPage } from '../time-select/time-select';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var google;

@Component({
    selector: 'home-page',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    userMarker: any;
    marks: any;
    locations: any;
    body: any;

    profile: boolean;

    avatar: string;
    name: string;
    description: string;
    address: string;
    time: string;
    price: number;

    constructor(public navCtrl: NavController, public locationTracker: LocationTracker, public http: Http, private _zone:NgZone) {
        this.marks = [];
    }

    ionViewDidLoad() {
        this.start().then(() => {
            this.stop();
            this.loadMap();
            let dis = this;
            
            this.http.get('https://cryndex.io/api/ru/location/all').map(res => res.json()).subscribe(body => {
                dis.body = body;
                for (let location of body) {
                    this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.address}&key=AIzaSyDaS3Vc0TUNmoyP8iObmU0BkbB9t_Wt4bs`).map(res => res.json()).subscribe(body2 => {
                        if(!body2.results.length) return;
                        this.addMarker(body2.results[0].geometry.location,location)
                    })
                }
            });
            
        });

    }

    start() {
        this.locationTracker.startTracking();
        return new Promise(resolve => {
            setTimeout(function () {
                resolve()
            }, 4000);
        })
    }

    stop() {
        this.locationTracker.stopTracking();
    }


    loadMap() {
        let latLng = new google.maps.LatLng(this.locationTracker.lat, this.locationTracker.lng);

        let mapOptions = {
            center: latLng,
            zoom: 13,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
                {
                    "featureType": "administrative",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": "-100"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 65
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": "50"
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": "-100"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "all",
                    "stylers": [
                        {
                            "lightness": "30"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "all",
                    "stylers": [
                        {
                            "lightness": "40"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "hue": "#ffff00"
                        },
                        {
                            "lightness": -25
                        },
                        {
                            "saturation": -97
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "lightness": -25
                        },
                        {
                            "saturation": -100
                        }
                    ]
                }
            ]
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';
        this.userMarker = new google.maps.Marker({
            position: { lat: this.locationTracker.lat, lng: this.locationTracker.lng },
            map: this.map,
            icon: im
        });

    }

    addCurrentLocation() {
        let latLng = new google.maps.LatLng(this.locationTracker.lat, this.locationTracker.lng);
        this.map.panTo(latLng);
    }

    /*
  
    markMap(){
        console.log('test')
        this.http.get('')
                 .map(res => res.json()).subscribe(response => {
                     console.log('tes7987t');
                     let body = response.data;
                     for(let location of body){
                         console.log('count')
                      this.http.get(``).map(res => res.json()).subscribe(response => {
                              let body = response.data;
                              this.addMarker(body.results[0].geometry.location);
                          })
                     }
                 })
  
                 
    }
  
     /*
      markMap() {
          console.log('test')
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.open("GET", 'https://cryndex.io/api/ru/location/all', false); // false for synchronous request
          xmlHttp.send(null);
          let body = JSON.parse(xmlHttp.responseText).data;
          for (let location of body) {
              var xmlHttp = new XMLHttpRequest();
              xmlHttp.open("GET", 'https//maps.googleapis.com/maps/api/geocode/json?address=${location.address}&key=AIzaSyDaS3Vc0TUNmoyP8iObmU0BkbB9t_Wt4bs', false); // false for synchronous request
              xmlHttp.send(null);
              let body2 = JSON.parse(xmlHttp.responseText).data;
                  this.addMarker(body2.results[0].geometry.location);
          }
  
  
      }
      */

    addMarker(coordinate,location) {
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: coordinate
        });

        this.marks.push(marker);

        this.addInfoWindow(marker, location);

    }

    addInfoWindow(marker, content) {
        let dis = this;
        google.maps.event.addListener(marker, 'click', () => {
            this.map.panTo(marker.position);
            this._zone.run(() => {
                dis.avatar = content.avatarURL;
                dis.name = content.name;
                dis.description = content.description;
                dis.address = content.address;
                dis.price = content.price;
                dis.time = '';

                if(content.availability[0].start === 0){
                    dis.time += '12:00AM ';
                } else if(content.availability[0].start < 13){
                    dis.time += `${content.availability[0].start}:00AM - `
                } else {
                    dis.time += `${content.availability[0].start-12}:00PM - `
                }

                if(content.availability[0].end === 0){
                    dis.time += '12:00AM ';
                } else if(content.availability[0].end < 13){
                    dis.time += `${content.availability[0].end}:00AM`
                } else {
                    dis.time += `${content.availability[0].end-12}:00PM`
                }

                dis.profile = true;
            });
        });

    }

    calendarPush() {
        this.navCtrl.push(TimeSelectPage);
    }

    closeProfile(){
        this.profile = false;
    }
}
