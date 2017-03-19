import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';
import { DateSelectPage } from '../date-select/date-select';

import { Http }          from '@angular/http';
import 'rxjs/add/operator/map';
 
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentLocationActive: boolean;
  userMarker: any;
  marks: any;
  locations: any;
 
  constructor(public navCtrl: NavController, public locationTracker: LocationTracker,public http: Http) {
    this.currentLocationActive = false;
    this.marks = [];
    /*
    this.http.get('https://cryndex.io/api/ru/location/all').map(res=>res.json()).subscribe(body=>{
        for(let location in body.body){
            this.http.get('https//maps.googleapis.com/maps/api/geocode/json?address=${location.address}&key=AIzaSyDaS3Vc0TUNmoyP8iObmU0BkbB9t_Wt4bs').map(res=>res.json()).subscribe(body2=>{
                this.addMarker(body.results[0].geometry.location)
            })
        }
    });
    */
  }
 
 ionViewDidLoad(){
    this.start().then( ()=>{
        this.stop();
        this.loadMap();
        //this.markMap();
    });
    
  }

  start(){
      this.locationTracker.startTracking();
      return new Promise(resolve=>{
          setTimeout(function(){
            resolve()
          },1000);
      })
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }

 
  loadMap(){
    console.log("Coordinates")
    console.log(this.locationTracker.lat)
    console.log(this.locationTracker.lng)
    let latLng = new google.maps.LatLng(this.locationTracker.lat, this.locationTracker.lng);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles:[
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
    
  }

  addCurrentLocation(){
      this.currentLocationActive = !this.currentLocationActive;
      if(this.currentLocationActive){
        var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';
        this.userMarker = new google.maps.Marker({
            position: {lat:this.locationTracker.lat,lng:this.locationTracker.lng},
            map: this.map,
            icon: im
        });
      } else {
          this.userMarker.setMap(null);
      }
      
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

  addMarker(coordinate){
    console.log('mark');
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: coordinate
    });

    this.marks.push(marker);
  
    let content = "<h4>New owner</h4>";          
  
    this.addInfoWindow(marker, content);
  
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  
  }

  calendarPush(){
     this.navCtrl.push(DateSelectPage);
  }
}
 