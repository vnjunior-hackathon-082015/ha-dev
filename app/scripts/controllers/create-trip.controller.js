/**
 * Created by s727215  on 22/08/2015.
 */
(function(){
    'use strict';

    angular
        .module('hackathonApp')
        .controller('CreateRouteController', CreateRouteController);

    CreateRouteController.$inject = ["commonShareService", "$scope", "$mdDialog", "$timeout", "$q", "$log"];

    function CreateRouteController(commonShareService, $scope, $mdDialog, $timeout, $q, $log) {
      var vm = this,
        _allDestinationsList;
      vm.routeModel = {
        title: null,
        description: null,
        hostedBy: null,
        createDate: null,
        minimumCost: null,
        currency: null,
        totalJoined: 0,
        totalMember: 0,
        destinations: []
      };
      vm.answer = answer;
      vm.cancel = cancel;
      vm.queryDestination = queryDestination;
      vm.filterSelected = true;
      vm.selectedDestinations = [{
        "destinations": []
      }];
      vm.onAddDestination = onAddDestination;
      vm.confirmRoute = confirmRoute;
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
        vm.allDestinations = _allDestinationsList;
        // vm.destinations = [vm.allDestinations[0]];
      };

      /**
       * Search for contacts.
       */
      function queryDestination (query) {
        var results = query ?
            vm.allDestinations.filter(createFilterFor(query)) : [];
        return results;
      }

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

      function confirmRoute(){
        var currentUser = commonShareService.getLoginInfo();
        var routes = commonShareService.getRoutes();
        var routeId = routes.length + 1;
        var fromDate = "07:00 30/08/2015"
        var toDate = "07:00 31/08/2015"


        var routeObj = {
            "routeId": routeId,
            "avatarURL": currentUser.avatarURL,
            "title": vm.routeModel.title,
            "description": vm.routeModel.description,
            "tripImage": "images/dubai-img/dubai-mall-1.jpg",
            "hostedBy": (currentUser.firstName + " " + currentUser.lastName) ,
            "hostedById": currentUser.id,
            "createDate": "2015-08-29 11:11",
            "minimumCost": 567,
            "currency": "AED",
            "totalJoined": 1,
            "totalMember": vm.routeModel.totalMember,
            "fromDate": fromDate,
            "toDate": toDate,
            "destinations": [],
            "comments": []
        };

        for(var i = 0; i < vm.selectedDestinations.length; i++){
          routeObj.destinations.push({
            "startDate": vm.selectedDestinations[i].fromDate,
            "endDate": vm.selectedDestinations[i].toDate,
            "locationId": vm.selectedDestinations[i].destinations[0].item.id
          });
        }
        routes.push(routeObj);
        var loginInfo = commonShareService.getLoginInfo();
        loginInfo.routesCreated.push(routeId);
        commonShareService.setLoginInfo(loginInfo);
        commonShareService.setRoutes(routes);
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
