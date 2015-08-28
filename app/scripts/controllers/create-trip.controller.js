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



      


      
    }

})();
