(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name hackathonApp.controller:DashboardCtrl
     * @description
     * # DashboardCtrl
     * Controller of the hackathonApp
     */
    angular.module('hackathonApp')
      .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', '$mdDialog', '$rootScope', '$q', 'commonShareService', 'uiGmapGoogleMapApi', 'uiGmapIsReady', 'emiratesAPIs'];

    function DashboardCtrl($scope, $mdDialog, $rootScope, $q, commonShareService, uiGmapGoogleMapApi, uiGmapIsReady, emiratesAPIs){
          var vm = this;
          vm.message = 'Hellow Dashboard';
          vm.onCommentButton = onCommentButton;
          vm.onJoinTrip = onJoinTrip;
          vm.maps = [];
          activate();

          //==================== Function declaration ====================
          function activate(){
            $rootScope.activeTab = 'dashboard';

            var cityName = 'Dubai';
            var noOfPax = 5;
            var date = '31-08-2015';
            vm.destinationList = commonShareService.getDestination();


            //Get Partner Trips
            emiratesAPIs.getArabianAdventureTours(cityName).then(function(toursResponse){
              var promises = [];
              for(var i = 0; i < toursResponse.data.TourName.length; i++){
                var promise = emiratesAPIs.getAdventureAvailability(date, noOfPax, toursResponse.data.TourName[i]);
                promises.push(promise);
              }

              var allPromise = $q.all(promises);
              allPromise.then(function(responses) {
                vm.partnerTrips = [];
                for(var i = 0; i < responses.length; i++){
                  var responseData = responses[i].data;
                  if(responseData.isAvailable){
                    //Make the pr
                    var obj = {};
                    obj.minimumCost = responseData.Price.BasePrice + i;
                    obj.tax = responseData.Price.Tax + i;
                    obj.total = responseData.Price.Total + i;
                    var partnerTrips = commonShareService.getPartnerTrips();
                    for(var j = 0; j < partnerTrips.length; j++){
                      //Right now check by name because service only return name, not id
                      if(partnerTrips[j].title == toursResponse.data.TourName[i]){
                        partnerTrips[j].minimumCost = obj.minimumCost;
                        partnerTrips[j].tax = obj.tax;
                        partnerTrips[j].total = obj.total;
                        vm.partnerTrips.push(partnerTrips[j]);
                      }
                    }

                  }
                }

                vm.partnerTrips.reverse();

                // Add info for partner trips
                for(var k = 0; k < vm.partnerTrips.length; k++){
                  vm.maps.push({ center: { latitude: 45, longitude: -73 }, zoom: 8 });
                  for (var i = 0; i < vm.partnerTrips[k].destinations.length; i++) {
                    for (var j = 0; j < vm.destinationList.length; j++) {
                      if (vm.partnerTrips[k].destinations[i].locationId == vm.destinationList[j].id) {
                        vm.partnerTrips[k].destinations[i].photo = "background-image : url('images/dubai-img/" + vm.destinationList[j].photo + "');";
                        vm.partnerTrips[k].destinations[i].address = vm.destinationList[j].address;
                        vm.partnerTrips[k].destinations[i].description = vm.destinationList[j].description;
                        vm.partnerTrips[k].destinations[i].locationName = vm.destinationList[j].destination;
                        break;
                      }
                    }
                  }
                }

                //Get Customer trips
                vm.listTrips = commonShareService.getTrips();
                vm.listTrips.reverse();

                //Add info for customer trips
                for(var k = 0; k < vm.listTrips.length; k++){
                  for (var j = 0; j < vm.destinationList.length; j++) {
                    if (vm.listTrips[k].destinations[0].locationId == vm.destinationList[j].id) {
                      vm.maps.push({ center: { latitude: vm.destinationList[j].latt, longitude: vm.destinationList[j].longtt }, zoom: 7 });
                    }
                  }


                  for (var i = 0; i < vm.listTrips[k].destinations.length; i++) {
                    for (var j = 0; j < vm.destinationList.length; j++) {
                      if (vm.listTrips[k].destinations[i].locationId == vm.destinationList[j].id) {
                        vm.listTrips[k].destinations[i].photo = "background-image : url('images/dubai-img/" + vm.destinationList[j].photo + "');";
                        vm.listTrips[k].destinations[i].address = vm.destinationList[j].address;
                        vm.listTrips[k].destinations[i].description = vm.destinationList[j].description;
                        vm.listTrips[k].destinations[i].locationName = vm.destinationList[j].destination;
                        break;
                      }
                    }
                  }
                }



                // google Map

                uiGmapIsReady.promise(vm.maps.length).then(function(instances) {
                  var directionsDisplays = [];
                  var myMaps = [];

                  for (var i = 0; i < vm.maps.length; i++) {
                    var map = instances[i].map ;
                    var uuid = map.uiGmap_id;
                    var mapInstanceNumber = instances[i].instance; // Starts at 1.
                    var listTrips = (i >= vm.partnerTrips.length) ? vm.listTrips[i - vm.partnerTrips.length] : vm.partnerTrips[i];
                    var directionsService = new google.maps.DirectionsService;
                    // var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
                    var directionsDisplay = new google.maps.DirectionsRenderer();
                    directionsDisplays.push(directionsDisplay);
                    myMaps.push(map);
                    
                    var orig;
                    var dest;
                    var waypoints = [];

                    for (var j = 1; j < listTrips.destinations.length-1; j++) {
                      for (var k = 0; k < vm.destinationList.length; k++) {
                        if (listTrips.destinations[j].locationId == vm.destinationList[k].id) {
                          var wp = new google.maps.LatLng(vm.destinationList[k].latt, vm.destinationList[k].longtt);
                          waypoints.push(
                            {
                              location: wp,
                              stopover: true
                            }
                          );
                        }
                      }
                    }

                    for (var j = 0; j < vm.destinationList.length; j++) {
                      if (listTrips.destinations[0].locationId == vm.destinationList[j].id) {
                        orig = new google.maps.LatLng(vm.destinationList[j].latt, vm.destinationList[j].longtt);
                      }
                      if (listTrips.destinations[listTrips.destinations.length-1].locationId == vm.destinationList[j].id) {
                        dest = new google.maps.LatLng(vm.destinationList[j].latt, vm.destinationList[j].longtt);
                      }
                    }

                    directionsDisplay.setMap(map);

                
                    console.log(listTrips.destinations[0].locationName + '-' + listTrips.destinations[listTrips.destinations.length-1].locationName, orig, dest, waypoints);

                    (function(myIndex) {
                      directionsService.route({
                        origin: orig,
                        destination: dest,
                        waypoints: waypoints,
                        optimizeWaypoints: true,
                        travelMode: google.maps.TravelMode.DRIVING
                      }, function(response, status) {
                        console.log(listTrips.destinations[0].locationName + '-' + listTrips.destinations[listTrips.destinations.length-1].locationName,
                          orig, dest, waypoints);
                        if (status === google.maps.DirectionsStatus.OK) {
                          directionsDisplays[myIndex].setDirections(response);
                          // var legs = response.routes[ 0 ].legs;
                          // for (var i = 0; i < legs.length; i++) {
                          //   var num = i+1;
                          //   new google.maps.Marker({
                          //     position: legs[i].start_location,
                          //     map: myMaps[myIndex],
                          //     label: num.toString()
                          //   });
                          //   // makeMarker( legs[i].start_location, num.toString());
                          // };
                        } else {
                          // window.alert('Directions request failed due to ' + status);
                        }
                      });
                    })(i);

                    // function makeMarker( position,title ) {
                    //  new google.maps.Marker({
                    //   position: position,
                    //   map: map,
                    //   label: title
                    //  });
                    // }
                  }
                });
              });

            });
          }

          function onCommentButton(index){
            var currentTrip = vm.listTrips[index];
            if(currentTrip.showCommentSection && currentTrip.activeComment && currentTrip.activeComment.length > 0){
              $rootScope.loginInfo = commonShareService.getLoginInfo();
              if($rootScope.loginInfo){
                currentTrip.comments.push({
                        fullname: $rootScope.loginInfo.fullname,
                        avatarURL: $rootScope.loginInfo.avatarURL,
                        comment: currentTrip.activeComment
                    });
                currentTrip.activeComment = '';
              } else{
                login();
              }
            } else{
              currentTrip.showCommentSection = !currentTrip.showCommentSection;
            }
          }

          function onJoinTrip(trip){
            var loginInfo = commonShareService.getLoginInfo();
            loginInfo.tripsJoined.push(trip.tripId);
            commonShareService.setLoginInfo(loginInfo);
          }

          function login(event) {
            $mdDialog.show({
              controller: 'LoginDialogController',
              controllerAs: 'vm',
              templateUrl: 'views/login-dialog.tmpl.html',
              parent: angular.element(document.body),
              // targetEvent: event,
              clickOutsideToClose:true
            })
            .then(function(answer) {
              //Login success
            }, function() {
              //Dialog was cancelled
            });
          };




          // uiGmapGoogleMapApi.then(function(maps) {
          // });
    }



})();





