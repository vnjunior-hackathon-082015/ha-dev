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
          $scope.maps = [];
          activate();

          //==================== Function declaration ====================
          function activate(){
            $rootScope.activeTab = 'dashboard';
            vm.listTrips = commonShareService.getTrips();
            vm.listTrips.reverse();
            vm.destinationList = commonShareService.getDestination();
            for(var k = 0; k < vm.listTrips.length; k++){

              $scope.maps.push({ center: { latitude: 45, longitude: -73 }, zoom: 8 });

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

          uiGmapIsReady.promise().then(function(instances) {
            instances.forEach(function(inst) {
                var map1 = $scope.map.control.getGMap();    // get map object through $scope.map.control getGMap() function
                var map2 = map_instances[0].map;      
              // var map = inst.map;
              // var uuid = map.uiGmap_id;
              // var mapInstanceNumber = inst.instance; // Starts at 1.

              // var directionsService = new google.maps.DirectionsService;
              // // var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
              // var directionsDisplay = new google.maps.DirectionsRenderer();

              // var orig = new google.maps.LatLng(25.00727, 54.98734);
              // var dest = new google.maps.LatLng(25.26736, 55.29685);

              // directionsDisplay.setMap(map);

              // directionsService.route({
              // origin: orig,
              // destination: dest,
              // waypoints: [
              //   {
              //     location:  new google.maps.LatLng(25.13934, 55.18922),
              //     stopover: true
              //   },
              //   {
              //     location:  new google.maps.LatLng(25.19063, 55.27386),
              //     stopover: true
              //   },
              //   {
              //     location:  new google.maps.LatLng(25.11809, 55.20035),
              //     stopover: true
              //   }
              // ],
              // optimizeWaypoints: true,
              // travelMode: google.maps.TravelMode.DRIVING
              // }, function(response, status) {
              //   if (status === google.maps.DirectionsStatus.OK) {
              //     directionsDisplay.setDirections(response);
              //     // var legs = response.routes[ 0 ].legs;
              //     // for (var i = 0; i < legs.length; i++) {
              //     //   var num = i+1
              //     //   makeMarker( legs[i].start_location, num.toString());
              //     // };
              //   } else {
              //     window.alert('Directions request failed due to ' + status);
              //   }
              // });

              // function makeMarker( position,title ) {
              //  new google.maps.Marker({
              //   position: position,
              //   map: map,
              //   label: title
              //  });
              // }
            });
          });

          
          uiGmapGoogleMapApi.then(function(maps) {
          });
    }



})();





