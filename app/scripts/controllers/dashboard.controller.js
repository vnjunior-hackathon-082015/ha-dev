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
              for (var j = 0; j < vm.destinationList.length; j++) {
                if (vm.listTrips[k].destinations[0].locationId == vm.destinationList[j].id) {
                  $scope.maps.push({ center: { latitude: vm.destinationList[j].latt, longitude: vm.destinationList[j].longtt }, zoom: 7 });
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

          // google Map

          uiGmapIsReady.promise(vm.listTrips.length).then(function(instances) {
            for (var i = 0; i < 1; i++) {
              var map = instances[i].map ;
              var uuid = map.uiGmap_id;
              var mapInstanceNumber = instances[i].instance; // Starts at 1.

              var directionsService = new google.maps.DirectionsService;
              var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
              // var directionsDisplay = new google.maps.DirectionsRenderer();

              var orig;
              var dest;
              var waypoints = [];

              for (var j = 0; j < vm.listTrips[i].destinations.length; j++) {
                for (var k = 0; k < vm.destinationList.length; k++) {
                  if (vm.listTrips[i].destinations[0].locationId == vm.destinationList[k].id && j > 0 && j <vm.destinationList.length-1) {
                    waypoints.push(
                      {
                        location: new google.maps.LatLng(vm.destinationList[k].latt,vm.destinationList[k].latt),
                        stopover: true
                      }
                    );
                  }
                }
              }

              for (var j = 0; j < vm.destinationList.length; j++) {
                if (vm.listTrips[i].destinations[0].locationId == vm.destinationList[j].id) {
                  orig = new google.maps.LatLng(vm.destinationList[j].latt, vm.destinationList[j].longtt);
                }
                if (vm.listTrips[i].destinations[vm.listTrips[i].destinations.length-1].locationId == vm.destinationList[j].id) {
                  dest = new google.maps.LatLng(vm.destinationList[j].latt, vm.destinationList[j].longtt);
                }
              }

              directionsDisplay.setMap(map);

              console.log(vm.listTrips[i].destinations[0].locationName + '-' + vm.listTrips[i].destinations[vm.listTrips[i].destinations.length-1].locationName);

              directionsService.route({
              origin: orig,
              destination: dest,
              waypoints: waypoints,
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
            }
          });

          
          uiGmapGoogleMapApi.then(function(maps) {
          });
    }



})();





