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


      


      
    }

})();
