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

    DashboardCtrl.$inject = ['$scope', '$mdDialog', '$rootScope', 'commonShareService', 'uiGmapGoogleMapApi', 'uiGmapIsReady'];

    function DashboardCtrl($scope, $mdDialog, $rootScope, commonShareService, uiGmapGoogleMapApi, uiGmapIsReady){
          var vm = this;
          vm.message = 'Hellow Dashboard';
          vm.onCommentButton = onCommentButton;
          vm.onJoinTrip = onJoinTrip;
          $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
          activate();

          //==================== Function declaration ====================
          function activate(){
            $rootScope.activeTab = 'dashboard';
            vm.listTrips = commonShareService.getTrips();
            vm.listTrips.reverse();
            vm.destinationList = commonShareService.getDestination();
            for(var k = 0; k < vm.listTrips.length; k++){
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

          /*google Map*/

          uiGmapIsReady.promise(1).then(function(instances) {
            instances.forEach(function(inst) {
              var map = inst.map;
              var uuid = map.uiGmap_id;
              var mapInstanceNumber = inst.instance; // Starts at 1.

              var directionsService = new google.maps.DirectionsService;
              var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

              directionsDisplay.setMap(map);

              directionsService.route({
              origin: {lat: 25.00727, lng: 54.98734},
              destination: {lat: 25.26736, lng: 55.29685},
              waypoints: [
                {
                  location: {lat: 25.13934, lng: 55.18922},
                  stopover: true
                },
                {
                  location: {lat: 25.19063, lng: 55.27386},
                  stopover: true
                },
                {
                  location: {lat: 25.11809, lng: 55.20035},
                  stopover: true
                }
              ],
              optimizeWaypoints: true,
              travelMode: google.maps.TravelMode.DRIVING
              }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setDirections(response);
                  var legs = response.routes[ 0 ].legs;
                  for (var i = 0; i < legs.length; i++) {
                    var num = i+1
                    makeMarker( legs[i].start_location, num.toString());
                  };
                } else {
                  window.alert('Directions request failed due to ' + status);
                }
              });

              function makeMarker( position,title ) {
               new google.maps.Marker({
                position: position,
                map: map,
                label: title
               });
              }
            });
          });

          

          uiGmapGoogleMapApi.then(function(maps) {
          });
    }



})();





