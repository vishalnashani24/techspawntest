    // // Initialise some variables
    // var directionsService = new google.maps.DirectionsService();
    // var num, map, data;
    // var requestArray = [], renderArray = [];

    // // A JSON Array containing some people/routes and the destinations/stops
    //   var jsonArray = {
    //     "Person 1": ["26.43122806450644, 80.13427734374999","22.329752304376473,71.21337890625"],
    //     "Person 2": ["Delhi,India", "nagpur,India"],
    //   "Person 3": ["goa,India", "kanpur,india"],
    //     "Person 4": ["jodhpur,India", "haryana,india"],
    //   "Person 5": ["Agra,India", "lucknow,india"],
    //     "Person 6": ["bhopal,India", "indore,india"],
    //   "Person 7": ["pune,India", "surat,india"],
    //     "Person 8": ["gaya,india", "patna,india"],
    //   "Person 9": ["raipur,india", "balaghat,India"],
    //     "Person 10": ["tirupati,India", "kannur,india"],
    //   "Person 11": ["Pali,India", "ranchi,india"],
    // }
        
    // // 16 Standard Colours for navigation polylines
    // var colourArray = ['navy', 'grey', 'fuchsia', 'black', 'white', 'lime', 'maroon', 'purple', 'aqua', 'red', 'green', 'silver', 'olive', 'blue', 'yellow', 'teal'];
    // function generateRequests(){
    //     requestArray = [];
    //     for (var route in jsonArray){
    //         var waypts = [];
    //         var start, finish
    //         var lastpoint

    //         data = jsonArray[route]

    //         var limit = data.length
    //         for (var waypoint = 0; waypoint < limit; waypoint++) {
    //             if (data[waypoint] === lastpoint){
    //                 continue;
    //             }
    //             lastpoint = data[waypoint]
    //             waypts.push({
    //                 location: data[waypoint],
    //                 stopover: true
    //             });
    //         }
    //         start = (waypts.shift()).location;
    //         finish = waypts.pop();
    //         if(finish === undefined){
    //             finish = start;
    //         } else {
    //             finish = finish.location;
    //         }
    //         var request = {
    //             origin: start,
    //             destination: finish,
    //             waypoints: waypts,
    //             travelMode: google.maps.TravelMode.DRIVING
    //         };
    //         requestArray.push({"route": route, "request": request});
    //     }

    //     processRequests();
    // }

    // function processRequests(){
    //     var i = 0;
    //     function submitRequest(){
    //         directionsService.route(requestArray[i].request, directionResults);
    //     }
    //     function directionResults(result, status) {
    //         if (status == google.maps.DirectionsStatus.OK) {
    //             renderArray[i] = new google.maps.DirectionsRenderer();
    //             renderArray[i].setMap(map);
    //             renderArray[i].setOptions({
    //                                     // suppressMarkers: true,
                    // preserveViewport: true,
                    // suppressInfoWindows: true,
    //                 polylineOptions: {
    //                     strokeWeight: 4,
    //                     strokeOpacity: 0.8,
    //                     strokeColor: colourArray[i]
    //                 },
    //                 markerOptions:{
    //                     icon:{
    //                         path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
    //                         scale: 3,
    //                         strokeColor: colourArray[i]
    //                     }
    //                 }
    //             });
    //             renderArray[i].setDirections(result);
    //             nextRequest();
    //         }

    //     }

    //     function nextRequest(){
    //         i++;
    //         if(i >= requestArray.length){
    //             return;
    //         }
    //         submitRequest();
    //     }
    //     submitRequest();
    // }
    // function init() {
    //     var mapOptions = {
    //         center: new google.maps.LatLng(41.85, -87.65),
    //         zoom: 7,
    //         mapTypeControl: false,
    //         streetViewControl: false,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };
            
    //     map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    //     generateRequests()
    // }
    // google.maps.event.addDomListener(window, 'load', init);