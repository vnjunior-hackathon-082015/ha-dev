/**
 * Created by s727223 on 28/08/2015.
 */

(function(){
  'use strict';

  angular
    .module('hackathonApp')
    .controller('TripController', TripController);

  TripController.$inject = ['emiratesAPIs', 'commonShareService', '$scope', '$mdDialog', '$rootScope', '$q', '$filter'];

  function TripController(emiratesAPIs, commonShareService, $scope, $mdDialog, $rootScope, $q, $filter){
    var vm = this, destinationList = [], locationOffers = [];
    vm.createTrip = createTrip;
    vm.onCommentButton = onCommentButton;

    activate();

    //==================== Function declaration ====================
    function activate(){

      $rootScope.activeTab = 'trip';

      getTripsData().then(function(){
        destinationList = commonShareService.getDestination();
        var promises = [];
        for(var i = 0; i < destinationList.length; i++){
          var promise = emiratesAPIs.getCardOfferByArea(destinationList[i].latt, destinationList[i].longtt, 100);
          promises.push(promise);
        }

        var allPromise = $q.all(promises);
        allPromise.then(function(responses) {
          for(var i = 0; i < destinationList.length; i++){
            angular.forEach(responses[i].data['Offer'], function(offer){
              offer.location = destinationList[i].id;
              locationOffers.push(offer);
            });
          }
          initTripsProperty();
        });

      });

    }

    function getTripsData(){
      vm.currentUserInfo = commonShareService.getLoginInfo();
      vm.tripsCreated = [];
      vm.tripsJoined = [];

      return getPartnerTrip().then(function(){
        vm.partnerTrips.reverse();
        vm.partnerTrips.forEach(function(trip){
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

        vm.tripsData = commonShareService.getTrips();
        vm.tripsData.reverse();
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

    function initTripsProperty(){
      for(var k = 0; k < vm.tripsCreated.length; k++){
        for (var i = 0; i < vm.tripsCreated[k].destinations.length; i++) {
          for (var j = 0; j < destinationList.length; j++) {
            if (vm.tripsCreated[k].destinations[i].locationId == destinationList[j].id) {
              vm.tripsCreated[k].destinations[i].photo = "background-image : url('images/dubai-img/" + destinationList[j].photo + "');";
              vm.tripsCreated[k].destinations[i].address = destinationList[j].address;
              vm.tripsCreated[k].destinations[i].description = destinationList[j].description;
              vm.tripsCreated[k].destinations[i].locationName = destinationList[j].destination;
              vm.tripsCreated[k].destinations[i].offers = [];
              angular.forEach(locationOffers, function(offer){
                if (offer.location ==  destinationList[j].id){
                  vm.tripsCreated[k].destinations[i].offers.push(offer);
                }
              });
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
              vm.tripsJoined[k].destinations[i].offers = [];
              angular.forEach(locationOffers, function(offer){
                if (offer.location ==  destinationList[j].id){
                  vm.tripsJoined[k].destinations[i].offers.push(offer);
                }
              });
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
          getTripsData().then(function(){
            initTripsProperty();
          });
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
