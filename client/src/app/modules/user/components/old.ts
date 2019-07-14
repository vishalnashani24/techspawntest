// import { UserService } from '../../../../app/core/services/user.services';
// import { Component, Inject } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { ConfirmationService } from 'primeng/primeng';
// import { AppConfig } from '../../../../app/core/config/app.config';
// import { Utills } from '../../../../app/core/utility/utills';
// import { TmpStorage } from '../../../../app/core/utility/temp.storage';
// declare var google: any;
// import { WebStorage } from '../../../../app/core/utility/web.storage';
// @Component({
//     selector: 'dashboard-component',
//     preserveWhitespaces: false,
//     templateUrl: './view/dashboard.component.html',
//     styleUrls:['./css/dashboard.css']
// })
 
// export class DashboardComponent {
//   constructor(
//     private user: UserService,
//     public config: AppConfig,
//     private toaster: ToastrService,
//     private router: Router,
//     private storage: WebStorage,
//     private utills: Utills,
//     private tmpStorage: TmpStorage,
//     private confirmationService: ConfirmationService
//   ) { }

//   public loading: boolean = true;
//   public listData: any = [];
//   public coordinatesdata: any = [];
//   public selectedItem:any={};
//   public trackingrecord:any={};
//   public totalItems: number = 0;
//   public startlatitude: number;
//   public startlongitude: number;
//   public endlatitude: number;
//   public endlongitude: number;
//   public id:any={};
//   public num:any;
//   public data:any;
//   public requestArray: any = [];  
//   // public renderArray: any = [];
//   public colourArray:any = ['navy', 'grey', 'fuchsia', 'black', 'white', 'lime', 'maroon', 'purple', 'aqua', 'red', 'green', 'silver', 'olive', 'blue', 'yellow', 'teal'];
//   public params: any = {
//     'page': 1,
//     'limit': this.config.perPageDefault,
//     'firstname': '',
//     'lastname': '',
//     'email': '',
//   };
// public range: any = {}
//   public getAllUsers() {
//     this.loading = true;
//     this.user.getAppuserList(this.params).subscribe((result) => {
//       let rs = result.json();
//       if (rs.code == this.config.statusCode.success) {
//         this.listData = rs.returnData.data;
//       } else {
//         this.toaster.error(rs.message);
//       }
//       this.loading = false;
//     });
//   }
//   saverange(newValue) {
//   this.range = newValue;
//   console.log("newValue",newValue)
//   this.storage.localStore('userId', this.range);
//   this.contractorLocation();
//   } 

//   public contractorLocation() {
//     var mapOptions = {
//             center: new google.maps.LatLng(63.677965, -3.768841),
//             zoom: 8,
//             mapTypeControl: false,
//             streetViewControl: false,
//             mapTypeId: google.maps.MapTypeId.ROADMAP
//         };
//     var directionsService = new google.maps.DirectionsService();
//     var num, map, data;
//     // var requestArray = [],
//     var renderArray = [];      
//     map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//     this.id =this.storage.get('userId');
//     this.loading = true;
//     this.user.contractorLocation({ userId: this.id }).subscribe((result) => {
//       let rs = result.json();
//       if (rs.code == this.config.statusCode.success) {
//        var requestarr =[];
//        var tempArr = [];
//        if(rs.userData){
//           rs.trackData.forEach(function(data,index) {
//             if(rs.coordinateData[index] != null){
//             var obj = {
//               origin: new google.maps.LatLng(data.startCordinate.coordinates[1], data.startCordinate.coordinates[0]),
//               destination: new google.maps.LatLng(rs.coordinateData[index].coordinateData.coordinates[1], rs.coordinateData[index].coordinateData.coordinates[0]),
//               optimizeWaypoints: true,
//               travelMode: google.maps.DirectionsTravelMode.WALKING
//             }
//             tempArr.push(obj);
//           }
//           })
//          console.log('tempArr :: ', tempArr)
//        }



    //   let jsonArray = {
    //     Person:  ["26.43122806450644, 80.13427734374999","22.329752304376473,71.21337890625"],
    //     Person1: ["Delhi,India", "nagpur,India"],
    //     Person2: ["goa,India", "kanpur,india"],
    //     Person3: ["jodhpur,India", "haryana,india"],
    //     Person4: ["Agra,India", "lucknow,india"],
    //     Person5: ["bhopal,India", "indore,india"],
    //     Person6: ["pune,India", "surat,india"],
    //     Person7: ["odisha,india", "patna,india"],
    //     Person8: ["raipur,india", "balaghat,India"],
    //     Person9: ["tirupati,India", "kannur,india"],
    //     Person10: ["Pali,India", "ranchi,india"]
    // }
//     // this.colourArray = ['navy', 'grey', 'fuchsia', 'black', 'white', 'lime', 'maroon', 'purple', 'aqua', 'red', 'green', 'silver', 'olive', 'blue', 'yellow', 'teal'];
//        var directionsService = new google.maps.DirectionsService();
//        this.generateRequests(directionsService,jsonArray,map)
//        // this.trackingrecord = rs.TRecord[0].startCordinate.coordinates;
//        // this.startlatitude=this.trackingrecord[1];
//        // this.startlongitude=this.trackingrecord[0];
//        // this.coordinatesdata = rs.data[0].coordinateData.coordinates;
//        // this.endlatitude = this.coordinatesdata[1];
//        // this.endlongitude=this.coordinatesdata[0];
//        // var geocoder = new google.maps.Geocoder;
//        // var service = new google.maps.DistanceMatrixService();
//        // var directionsService = new google.maps.DirectionsService;
//        // var directionsDisplay = new google.maps.DirectionsRenderer;
//        // var map = new google.maps.Map(document.getElementById('map'), {
//        //    zoom: 7,
//        //    mapTypeId: 'satellite',
//        //    center: {lat: 41.85, lng: -87.65}
//        //  });
//        //  var bounds = new google.maps.LatLngBounds;
//        //  var markersArray = [];
//        //  directionsDisplay.setMap(map);
//         // this.calculateAndDisplayRoute(directionsService, directionsDisplay,service,geocoder,bounds,map);
//         // var location_1_1 = new google.maps.LatLng(21.121734661433553, 79.29931640625);
//         // var location_1_2 = new google.maps.LatLng(21.130301295941138,79.07684326171875 );
//         // var location_2_1 = new google.maps.LatLng(21.12874012372802, 79.05744552612305);
//         // var location_2_2 = new google.maps.LatLng(21.132983271361475, 79.0715217590332);
//         // var location_3_1 = new google.maps.LatLng(21.133303503989758, 79.06452655792236);
//         // var location_3_2 = new google.maps.LatLng(21.122695430128857, 79.07250881195068);
//         // var location_4_1 = new google.maps.LatLng(21.12585791645462, 79.056715965271);
//         // var location_4_2 = new google.maps.LatLng(21.13686604531701, 79.07727241516113);
//         // var directionsService = new google.maps.DirectionsService();
//         // directionsDisplay.setMap(map);
//         // var request1 = {
//         //   origin: location_1_1, 
//         //   destination: location_1_2,
//         //   optimizeWaypoints: true,
//         //   travelMode: google.maps.DirectionsTravelMode.DRIVING
//         // };
//         // directionsService.route(tempArr[0], function(response, status) {
//         //   if (status == google.maps.DirectionsStatus.OK) {
//         //     directionsDisplay.setDirections(response);
//         //   }

//         // });
//         // var directionsDisplay3 = new google.maps.DirectionsRenderer;
//         // directionsDisplay3.setMap(map);
//         // var request2 = {
//         //   origin: location_2_1, 
//         //   destination: location_2_2,
//         //   optimizeWaypoints: true,
//         //   travelMode: google.maps.DirectionsTravelMode.DRIVING
//         // };
//         // directionsService.route(tempArr[1], function(response, status) {
//         //   if (status == google.maps.DirectionsStatus.OK) {
//         //     directionsDisplay3.setDirections(response);
//         //   }
//         // });
//       } else {
//         this.toaster.error(rs.message);
//       }
//       this.loading = false;
//     });
//   }

// generateRequests(directionsService,jsonArray,map){
//         this.requestArray = [];
//         for (var route in jsonArray){
//             var waypts = [];
//             var start, finish
//             var lastpoint
//             this.data = jsonArray[route]
//             var limit = this.data.length
//             for (var waypoint = 0; waypoint < limit; waypoint++) {
//                 if (this.data[waypoint] === lastpoint){
//                     continue;
//                 }
//                 lastpoint = this.data[waypoint]
//                 waypts.push({
//                     location: this.data[waypoint],
//                     stopover: true
//                 });
//             }
//             start = (waypts.shift()).location;
//             finish = waypts.pop();
//             if(finish === undefined){
//                 finish = start;
//             } else {
//                 finish = finish.location;
//             }
//             var request = {
//                 origin: start,
//                 destination: finish,
//                 waypoints: waypts,
//                 travelMode: google.maps.TravelMode.DRIVING
//             };
//             this.requestArray.push({"route": route, "request": request});
//         }

//         this.processRequests(directionsService,map,this.requestArray);
//     }

//     processRequests(directionsService,map,requestArray){
//         var renderArray =[];
//         var i = 0;
//         function submitRequest(){
//             directionsService.route(requestArray[i].request, directionResults);
//         }
//         function directionResults(result, status) {
//             if (status == google.maps.DirectionsStatus.OK) {
//                 renderArray[i] = new google.maps.DirectionsRenderer();
//                 renderArray[i].setMap(map);
//                 console.log("result",renderArray[i])
//                 renderArray[i].setOptions({
//                     preserveViewport: true,
//                     suppressInfoWindows: true,
//                     // polylineOptions: {
//                     //     strokeWeight: 4,
//                     //     strokeOpacity: 0.8,
//                     //     // strokeColor: this.colourArray[i]
//                     // },
//                     // markerOptions:{
//                     //     icon:{
                                // http://www.google.com/mapfiles/dd-start.png
//                     //         path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
//                     //         scale: 3,
//                     //         // strokeColor: this.colourArray[i]
//                     //     }
//                     // }
//                 });
//                 renderArray[i].setDirections(result);
//                 nextRequest(requestArray);
//             }

//         }

//         function nextRequest(requestArray){
//             i++;
//             if(i >= requestArray.length){
//                 return;
//             }
//             submitRequest();
//         }
//         submitRequest();
//     }
// 	// calculateAndDisplayRoute(directionsService, directionsDisplay,service,geocoder,bounds,map) {
//         // var location1 = new google.maps.LatLng(21.121734661433553, 79.06439781188965);
//         // var location2 = new google.maps.LatLng(21.130301295941138,79.07684326171875 );
//         // var location3 = new google.maps.LatLng(21.12874012372802, 79.05744552612305);
//         // var location4 = new google.maps.LatLng(21.132983271361475, 79.0715217590332);
//         // this.loading = true;
//         // var origin1 = {lat: 41.85, lng: -3.118};
//         // var origin2 = 'Greenwich, England';
//         // var destinationA = 'Stockholm, Sweden';
//         // var destinationB = {lat: 50.087, lng: 14.421};
//         // var destinationIcon = 'https://chart.googleapis.com/chart?' +
//         //     'chst=d_map_pin_letter&chld=STOP|FF0000|000000';
//         // var originIcon = 'https://chart.googleapis.com/chart?' +
//         //     'chst=d_map_pin_letter&chld=START|FFFF00|000000';
//         //             var markersArray = [];
//         // var map = new google.maps.Map(document.getElementById('map'), {
//         //   center: {lat: 55.53, lng: -87.65},
//         //   zoom: 7
//         // });


//       //   directionsService.route({
//       //     // origin: {lat: this.startlatitude, lng: this.startlongitude},
//       //     // destination: {lat: this.endlatitude, lng: this.endlongitude},
//       //     origin: {lat: this.startlatitude, lng: this.startlongitude},
//       //     destination: {lat: this.endlatitude, lng: this.endlongitude},
//       //     optimizeWaypoints: true,
//       //     travelMode: 'WALKING'
//       //   }, function(response, status) {
//       //     if (status === 'OK') {
//       //       this.loading = false;
//       //       directionsDisplay.setDirections(response);
//       //     } else {
//       //       alert('Directions request failed due to ' + status)
//       //       this.loading = false;
//       //     }
//       // });

//       // service.getDistanceMatrix({
//       //     origins: [location1,location3],
//       //     destinations: [location2,location4],
//       //     travelMode: 'WALKING',
//       //     unitSystem: google.maps.UnitSystem.METRIC,
//       //     avoidHighways: false,
//       //     avoidTolls: false
//       //   }, function(response, status) {
//       //     if (status !== 'OK') {
//       //       alert('Error was: ' + status);
//       //     } else {
//       //      console.log("response",response)
//       //       var originList = response.originAddresses;
//       //       var destinationList = response.destinationAddresses;


//       //       var outputDiv = document.getElementById('output');
//       //       outputDiv.innerHTML = '';
//       //       var showGeocodedAddressOnMap = function(asDestination) {
//       //         var icon = asDestination ? destinationIcon : originIcon;
//       //         return function(results, status) {
//       //           if (status === 'OK') {
//       //             map.fitBounds(bounds.extend(results[0].geometry.location));
//       //             markersArray.push(new google.maps.Marker({
//       //               map: map,
//       //               position: results[0].geometry.location,
//       //               icon: icon
//       //             }));
//       //           } else {
//       //             alert('Geocode was not successful due to: ' + status);
//       //           }
//       //         };
//       //       };
//       //       for (var i = 0; i < originList.length; i++) {
//       //         var results = response.rows[i].elements;
//       //         geocoder.geocode({'address': originList[i]},
//       //         showGeocodedAddressOnMap(false));
//       //         for (var j = 0; j < results.length; j++) {
//       //           geocoder.geocode({'address': destinationList[j]},
//       //          showGeocodedAddressOnMap(true));
//       //           outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
//       //               ': ' + results[j].distance.text + ' in ' +
//       //               results[j].duration.text + '<br>';
//       //         }
//       //       }
//       //     }
//       //   })
//  // }
// ngOnInit() {
// 	this.getAllUsers();
//    this.contractorLocation();
//    setInterval(() => {
//     this.contractorLocation(); 
//   }, 30000);
//     }

// }







