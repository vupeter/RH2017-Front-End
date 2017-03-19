import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';
import { DateSelectPage } from '../date-select/date-select';
 
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
 
  constructor(public navCtrl: NavController, public locationTracker: LocationTracker) {
    this.currentLocationActive = false;
  }
 
 ionViewDidLoad(){
    this.start().then( ()=>{
        this.stop();
        this.loadMap();
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

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  
    let content = "<h4>Information!kkhlkjhlkjhlkjhlkjhlkjhlkjhlkjhlkjhlkjhlkjhlkjhlkj</h4>";          
  
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
 