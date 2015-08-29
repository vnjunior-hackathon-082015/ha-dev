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

    DashboardCtrl.$inject = ['$scope', '$mdDialog', '$rootScope', '$q',
            'commonShareService', 'uiGmapGoogleMapApi', 'uiGmapIsReady', 'emiratesAPIs', 'blockUI'];

    function DashboardCtrl($scope, $mdDialog, $rootScope, $q,
            commonShareService, uiGmapGoogleMapApi, uiGmapIsReady, emiratesAPIs, blockUI){
          var vm = this;
          vm.message = 'Hello Dashboard';
          vm.onTripCommentButton = onTripCommentButton;
          vm.onPartnerTripCommentButton = onPartnerTripCommentButton;
          vm.isDisableJoinButton = isDisableJoinButton;
          vm.onJoinTrip = onJoinTrip;
          vm.maps = [];
          var locationOffers = [];
          activate();

          //==================== Function declaration ====================
          function activate(){
            $rootScope.activeTab = 'dashboard';
            vm.destinationList = commonShareService.getDestination();

            blockUI.start();
            //Get Partner Trips
            getPartnerTrip().then(function(toursResponse){
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
                      angular.forEach(locationOffers, function(offer){
                        if (offer.location ==  vm.destinationList[j].id){
                          vm.listTrips[k].destinations[i].offers.push(offer);
                        }
                      });
                      break;
                    }
                  }
                }
              }

              var offerPromises = [];
              for(var i = 0; i < vm.destinationList.length; i++){
                var offerPromise = emiratesAPIs.getCardOfferByArea(vm.destinationList[i].latt, vm.destinationList[i].longtt, 100);
                offerPromises.push(offerPromise);
              }
              var allOfferPromise = $q.all(offerPromises);
              allOfferPromise.then(function(responses) {
                for (var i = 0; i < vm.destinationList.length; i++) {
                  angular.forEach(responses[i].data['Offer'], function (offer) {
                    offer.location = vm.destinationList[i].id;
                    locationOffers.push(offer);
                  });
                }
                for (var i = 0; i < vm.partnerTrips.length; i++){
                  for(var j = 0; j < vm.partnerTrips[i].destinations.length; j++){
                    vm.partnerTrips[i].destinations[j].offers = [];
                    angular.forEach(locationOffers, function(offer){
                      if (offer.location ==  vm.partnerTrips[i].destinations[j].locationId){
                        vm.partnerTrips[i].destinations[j].offers.push(offer);
                      }
                    });
                  }
                }

                for (var i = 0; i < vm.listTrips.length; i++){
                  for(var j = 0; j < vm.listTrips[i].destinations.length; j++){
                    vm.listTrips[i].destinations[j].offers = [];
                    angular.forEach(locationOffers, function(offer){
                      if (offer.location ==  vm.listTrips[i].destinations[j].locationId){
                        vm.listTrips[i].destinations[j].offers.push(offer);
                      }
                    });
                  }
                }
              });



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
                  var directionsDisplay = new google.maps.DirectionsRenderer();
                  directionsDisplays.push(directionsDisplay);
                  myMaps.push(map);
                  // var directionsDisplay = new google.maps.DirectionsRenderer();

                  var orig;
                  var dest;
                  var waypoints = [];

                  for (var j = 1; j < listTrips.destinations.length - 1; j++) {
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
                  blockUI.stop();
                  (function(myIndex) {
                    directionsService.route({
                      origin: orig,
                      destination: dest,
                      waypoints: waypoints,
                      optimizeWaypoints: true,
                      travelMode: google.maps.TravelMode.DRIVING
                    }, function(response, status) {
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
                  }
                });
              });
          }


          function getPartnerTrip(){
            var cityName = 'Dubai';
            var noOfPax = 5;
            var date = '31-08-2015';
            //Get Partner Trips
            return emiratesAPIs.getArabianAdventureTours(cityName).then(function(toursResponse){
              var promises = [];
              for(var i = 0; i < toursResponse.data.TourName.length; i++){
                var promise = emiratesAPIs.getAdventureAvailability(date, noOfPax, toursResponse.data.TourName[i]);
                promises.push(promise);
              }

              var allPromise = $q.all(promises);
              return allPromise.then(function(responses) {
                // Get Location Offers
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

              });
            });
          }

          function onTripCommentButton(index){
            var currentTrip = vm.listTrips[index];
            onCommentButton(currentTrip);
          }

          function onPartnerTripCommentButton(index){
            var currentTrip = vm.partnerTrips[index];
            onCommentButton(currentTrip);
          }

          function onCommentButton(currentTrip){
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

          function onJoinTrip(trip, event){
            var loginInfo = commonShareService.getLoginInfo();
            if(!loginInfo){
              login();
              return;
            }
            loginInfo.tripsJoined.push(trip.tripId);
            commonShareService.setLoginInfo(loginInfo);
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.body))
                .clickOutsideToClose(true)
                .title('Join Successfuly')
                .content('You successfully joined this trip')
                .ariaLabel('Joined trip')
                .ok('OK!')
                .targetEvent(event)
              );
          }

          function isDisableJoinButton(trip){
            var loginInfo = commonShareService.getLoginInfo();
            if(!loginInfo){
              return false;
            }

            for(var i = 0 ; i < loginInfo.tripsJoined.length; i++){
              if(loginInfo.tripsJoined[i] === trip.tripId){
                return true;
              }
            }
            return false;
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





