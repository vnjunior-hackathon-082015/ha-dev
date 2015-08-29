/**
 * Created by s727215-luule  on 28/08/2015.
 */
(function(){
    'use strict';

    angular
        .module('hackathonApp')
        .controller('CreateTripController', CreateTripController);

    CreateTripController.$inject = ["emiratesAPIs" ,"commonShareService", "$scope", "$mdDialog", "$timeout", "$q", "$log"];

    function CreateTripController(emiratesAPIs ,commonShareService, $scope, $mdDialog, $timeout, $q, $log) {
      var vm = this,
        _allDestinationsList,
        _allHotelsList;
      vm.tripModel = {
        title: null,
        description: null,
        hostedBy: null,
        createDate: null,
        minimumCost: null,
        currency: null,
        totalJoined: 0,
        totalMember: 0,
        hotel:null,
        destinations: []
      };
      vm.answer = answer;
      vm.cancel = cancel;
      vm.queryHotel = queryHotel;
      vm.queryDestination = queryDestination;
      vm.simulateHotelQuery = false;
      vm.filterSelected = true;
      vm.selectedDestinations = [{
        "destinations": []
      }];
      vm.onAddDestination = onAddDestination;
      vm.confirmTrip = confirmTrip;
      activate();




      vm.date = new Date();
      vm.minDate = vm.minDate ? null : new Date();
      vm.dateOptions = {
        startingDay: 1,
        showWeeks: false
      };
      vm.hourStep = 1;
      vm.minuteStep = 15;
      vm.showMeridian = true;
      // Disable weekend selection
      vm.disabled = function(calendarDate, mode) {
        return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
      };


      $scope.$watch("date", function(value) {
        console.log('New date value:' + value);
      }, true);



      //========== Function declaration ====================
      function activate(){
        _allDestinationsList = getDestinationsList();
        _allHotelsList = getHotelsList();
        vm.allDestinations = _allDestinationsList;
        vm.allHotels = _allHotelsList;
      };

      /**
       * Search for contacts.
       */
      function queryDestination (query) {
        var results = query ?
            vm.allDestinations.filter(createFilterFor(query)) : [];
        return results;
      }

      function queryHotel (query) {
        var results = query ? vm.allHotels.filter( createFilterFor(query) ) : vm.allHotels;
          return results;
      };

      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(contact) {
          return (contact._lowername.indexOf(lowercaseQuery) != -1);;
        };
      }


      function getDestinationsList(){
        return commonShareService.getDestination().map(function(item,index){
          var contact = {
            item: item,
            destination: item.destination,
            address: item.address,
            image: 'images/dubai-img/'+item.photo,
          };
          contact._lowername = contact.destination.toLowerCase();
          return contact;
         });
      };

      function getHotelsList(){
        return emiratesAPIs.getHotelPropertyListing("Dubai").then(function(response){
            var result = response.data.PropertyName.map(function(item){
              if(item === "JW Marriot Marque"){
                var hotel = {
                  'destination': item,
                  'address': 'Sheikh Zayed Road, Business Bay  Dubai  121000  United Arab Emirates ',
                  'description': "Discover unmatched luxury at the new JW Marriott Marquis Hotel Dubai, a spectacular 5-star resort located in the Dubai's Business Bay district",
                  'longtt': 55.2577,
                  'latt': 25.185622,
                  'photo': 'JWMarriotHotel.jpg'
                };  
              }else{
                var hotel = {
                  'destination': 'Premier Inn',
                  'address': 'Dubai International Airport Opposite Terminal 3,Al Garhoud, Dubai United Arab Emirates',
                  'description': "This hotel is a 5-minute drive from Dubai International Airport and offers a free shuttle service to Mamzar Beach, Festival City shopping centre, and Dubai mall",
                  'longtt': 55.358866,
                  'latt': 25.242665,
                  'photo': 'PremierInnHotel.jpg'
                };  
              }
              
              hotel._lowername = hotel.destination.toLowerCase();
              return hotel;
            });
            vm.allHotels = result;
        });
      };

      function confirmTrip(){
        var currentUser = commonShareService.getLoginInfo();
        var trips = commonShareService.getTrips();
        var tripId = trips.length + 1;
        var fromDate = "07:00 30/08/2015"
        var toDate = "07:00 31/08/2015"


        var tripObj = {
            "tripId": tripId,
            "avatarURL": currentUser.avatarURL,
            "title": vm.tripModel.title,
            "description": vm.tripModel.description,
            "tripImage": "images/dubai-img/dubai-mall-1.jpg",
            "hostedBy": (currentUser.firstName + " " + currentUser.lastName) ,
            "hostedById": currentUser.id,
            "createDate": "2015-08-29 11:11",
            "minimumCost": 567,
            "currency": "AED",
            "totalJoined": 1,
            "totalMember": vm.tripModel.totalMember,
            "fromDate": fromDate,
            "toDate": toDate,
            "hotel":vm.tripModel.hotel,
            "destinations": [],
            "comments": []
        };

        for(var i = 0; i < vm.selectedDestinations.length; i++){
          tripObj.destinations.push({
            "startDate": vm.selectedDestinations[i].fromDate,
            "endDate": vm.selectedDestinations[i].toDate,
            "locationId": vm.selectedDestinations[i].destinations[0].item.id
          });
        }
        trips.push(tripObj);
        var loginInfo = commonShareService.getLoginInfo();
        loginInfo.tripsCreated.push(tripId);
        if(tripObj.hotel !== null){
          emiratesAPIs.getServiceEligibility().then(function(response){
            var point = response.data.Benefit[0].CardValues[0].Value;
            var test = commonShareService.setSkywardsPoint(point);
          });
        }
        commonShareService.setLoginInfo(loginInfo);
        commonShareService.setTrips(trips);
        answer();
      }

      function onAddDestination(){
        vm.selectedDestinations.push({
          "destinations": []
        });
      }

      function answer(ans) {
        $mdDialog.hide(ans);
      };

      function cancel(){
        $mdDialog.cancel();
      };
    }

})();
