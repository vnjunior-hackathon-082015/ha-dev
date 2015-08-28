/**
 * Created by s727223 on 28/08/2015.
 */

(function(){
  'use strict';

  angular
    .module('hackathonApp')
    .controller('TripController', TripController);

  TripController.$inject = ['commonShareService', '$scope', '$mdDialog', '$rootScope'];

  function TripController(commonShareService, $scope, $mdDialog, $rootScope){
    var vm = this,
      destinationList = [];
    vm.createTrip = createTrip;
    vm.onCommentButton = onCommentButton;

    activate();

    //==================== Function declaration ====================
    function activate(){
      $rootScope.activeTab = 'trip';

      getTripsData();

      destinationList = commonShareService.getDestination();

      initTripsProperty();
    }

    function getTripsData(){
      vm.currentUserInfo = commonShareService.getLoginInfo();
      vm.tripsData = commonShareService.getTrips();
      vm.tripsData.reverse();
      vm.tripsCreated = [];
      vm.tripsJoined = [];
      vm.tripsData.forEach(function(trip){
        vm.currentUserInfo.tripsCreated.forEach(function(tripId){
          if(trip.tripId == tripId){
            vm.tripsCreated.push(trip);
          }
        });
        vm.currentUserInfo.tripsJoined.forEach(function(tripId){
          if(trip.tripId == tripId){
            vm.tripsJoined.push(trip);
          }
        });
      });
    }

    function initTripsProperty(){
      for(var k = 0; k < vm.tripsCreated.length; k++){
        for (var i = 0; i < vm.tripsCreated[k].destinations.length; i++) {
          for (var j = 0; j < destinationList.length; j++) {
            if (vm.tripsCreated[k].destinations[i].locationId == destinationList[j].id) {
              vm.tripsCreated[k].destinations[i].photo = "background-image : url('images/dubai-img/" + destinationList[j].photo + "');";
              vm.tripsCreated[k].destinations[i].address = destinationList[j].address;
              vm.tripsCreated[k].destinations[i].description = destinationList[j].description;
              vm.tripsCreated[k].destinations[i].locationName = destinationList[j].destination;
              break;
            }
          }
        }
      }

      for(var k = 0; k < vm.tripsJoined.length; k++){
        for (var i = 0; i < vm.tripsJoined[k].destinations.length; i++) {
          for (var j = 0; j < destinationList.length; j++) {
            if (vm.tripsJoined[k].destinations[i].locationId == destinationList[j].id) {
              vm.tripsJoined[k].destinations[i].photo = "background-image : url('images/dubai-img/" + destinationList[j].photo + "');";
              vm.tripsJoined[k].destinations[i].address = destinationList[j].address;
              vm.tripsJoined[k].destinations[i].description = destinationList[j].description;
              vm.tripsJoined[k].destinations[i].locationName = destinationList[j].destination;
              break;
            }
          }
        }
      }
    }

    function createTrip(event){
      $mdDialog.show({
        controller: "CreateTripController",
        controllerAs: "vm",
        templateUrl: 'views/create-trip.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:false
      })
        .then(function(answer) {
          //Reload trips
          getTripsData();
          initTripsProperty();
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    function onCommentButton(currentTrip){
      if(currentTrip.activeComment && currentTrip.activeComment.length > 0){
        $rootScope.loginInfo = commonShareService.getLoginInfo();
        currentTrip.comments.push({
          fullname: $rootScope.loginInfo.fullname,
          avatarURL: $rootScope.loginInfo.avatarURL,
          comment: currentTrip.activeComment
        });
        currentTrip.activeComment = '';
      }
    }
  }

})();
