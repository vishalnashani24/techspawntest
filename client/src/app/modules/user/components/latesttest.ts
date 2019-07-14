// import { UserService } from '../../../../app/core/services/user.services';
// import { Component, Inject } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { ConfirmationService } from 'primeng/primeng';
// import { AppConfig } from '../../../../app/core/config/app.config';
// import { Utills } from '../../../../app/core/utility/utills';
// import { TmpStorage } from '../../../../app/core/utility/temp.storage';
// import { WebStorage } from '../../../../app/core/utility/web.storage';
// declare var google: any;
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
//   public jsonArray:any=[]
//   public requestArray: any = [];  
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
//   this.contractorLocation();
//   } 
//   public contractorLocation() {
//   this.storage.localStore('userId', Object.keys(this.range).length>0?this.range:"All");
//      var  infowindow = new google.maps.InfoWindow();
//     let mapOptions = {
//             center: new google.maps.LatLng(18.021, 79.607),
//             zoom: 8,
//             mapTypeControl: true,
//             streetViewControl: true,
//             mapTypeId: google.maps.MapTypeId.ROADMAP
//         };
//     let directionsDisplay = new google.maps.DirectionsRenderer;    
//     let directionsService = new google.maps.DirectionsService();
//     let map;
//     let renderArray = [];      
//     map = new google.maps.Map(document.getElementById('map'), mapOptions);
//     this.id =this.storage.get('userId');
//     // this.loading = true;
//     this.user.contractorLocation({ userId: this.id }).subscribe((result) => {
//       let rs = result.json();
//       if (rs.code == this.config.statusCode.success) {
//        let requestarr =[];
//        let tempArr = [];
//        var jsondata={};
//        if(rs.trackData){
//           rs.trackData.forEach(function(data,index) {
//             if(rs.coordinateData[index] != null){
//              jsondata = data.startCordinate.coordinates,rs.coordinateData[index].coordinateData.coordinates;
//              var jsonArray = {
//               key:[data.startCordinate.coordinates[1]+','+ data.startCordinate.coordinates[0],rs.coordinateData[index].coordinateData.coordinates[1]+','+ rs.coordinateData[index].coordinateData.coordinates[0]]
//             }
//             tempArr.push(jsonArray);
//           }
//           })

//           var obj2 = {};
//           for (var i = 0; i < tempArr.length; i++) {
//           var text = 'person'+i;
//           var arr = [tempArr[i].key[0], tempArr[i].key[1]];
//           obj2[text] = arr;
//         }
//       let colourArray = ['black','maroon','navy', 'grey', 'fuchsia',  'white', 'lime', 'purple', 'aqua', 'red', 'green', 'silver', 'olive', 'blue', 'yellow', 'teal'];
//       this.generateRequests(directionsService,obj2,map,colourArray,infowindow)
//       }else{
//        let mapOptions1 = {
//             center: new google.maps.LatLng(18.021, 79.607),
//             zoom: 8,
//             mapTypeControl: true,
//             streetViewControl: true,
//             mapTypeId: google.maps.MapTypeId.ROADMAP
//         };
//         let directionsDisplay1 = new google.maps.DirectionsRenderer;    
//         let directionsService1 = new google.maps.DirectionsService();
//         let maps;   
//         maps = new google.maps.Map(document.getElementById('map'), mapOptions1);
//         directionsDisplay1.setMap(maps);
//        this.trackingrecord = rs.TRecord[0].startCordinate.coordinates;
//        this.startlatitude=this.trackingrecord[1];
//        this.startlongitude=this.trackingrecord[0];
//        this.coordinatesdata = rs.data[0].coordinateData.coordinates;
//        this.endlatitude = this.coordinatesdata[1];
//        this.endlongitude=this.coordinatesdata[0];
//        this.calculateAndDisplayRoute(directionsService1, directionsDisplay1,map);
//       }
//       } else {
//         this.toaster.error(rs.message);
//       }
//       this.loading = false;
//     });
//   }
//  calculateAndDisplayRoute(directionsService1,directionsDisplay1,map) {
//         directionsService1.route({
//           origin: {lat: this.startlatitude, lng: this.startlongitude},
//           destination: {lat: this.endlatitude, lng: this.endlongitude},
//           optimizeWaypoints: true,
//           travelMode: 'WALKING'
//         }, function(response, status) {
//           if (status === 'OK') {
//             directionsDisplay1.setDirections(response);
//           } else {
//             alert('Directions request failed due to ' + status)
//             this.loading = false;
//           }
//       });
//   }
//  generateRequests(directionsService,jsonArray,map,colourArray,infowindow){
//         this.requestArray = [];
//         for (let route in jsonArray){
//             let waypts = [];
//             let start, finish
//             let lastpoint
//             this.data = jsonArray[route]
//             let limit = this.data.length
//             for (let waypoint = 0; waypoint < limit; waypoint++) {
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
//             let request = {
//                 origin: start,
//                 destination: finish,
//                 waypoints: waypts,
//                 travelMode: google.maps.TravelMode.WALKING
//             };
//             this.requestArray.push({"route": route, "request": request});
//         }
//         this.processRequests(directionsService,map,this.requestArray,colourArray);
//     }
//   processRequests(directionsService,map,requestArray,colourArray){
//         let renderArray =[];
//         let i = 0;
//         function submitRequest(){
//             directionsService.route(requestArray[i].request, directionResults);
//         }
//         function directionResults(result, status) {
//             if (status == google.maps.DirectionsStatus.OK) {
//                 var leg = result.routes[0].legs[0];
//                 console.log("distance",leg.distance.text)
//                 console.log("duration",leg.duration.text)
//                 console.log("start_address",leg.start_address)
//                 console.log("end_address",leg.end_address)
//                 renderArray[i] = new google.maps.DirectionsRenderer();
//                 renderArray[i].setMap(map);
//                 renderArray[i].setOptions({
//                     // suppressMarkers: true,
//                     // preserveViewport: true,
//                     // suppressInfoWindows: true,
//                     polylineOptions: {
//                         strokeWeight: 4,
//                         strokeOpacity: 0.8,
//                         strokeColor: colourArray[i]
//                     },

//                     markerOptions:{
//                         icon:{
//                             path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
//                             scale: 4,
//                             strokeColor: colourArray[i]
//                         }
//                     }
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
// ngOnInit() {
// 	 this.getAllUsers();
//    this.contractorLocation();
//    setInterval(() => {
//     this.contractorLocation(); 
//   }, 30000);
//     }
// }







