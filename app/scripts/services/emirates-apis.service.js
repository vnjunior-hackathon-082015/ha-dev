(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name hackathonApp.service:EmiratesAPIs
     * @description
     * # EmiratesAPIs
     */
    angular.module('hackathonApp')
      .service('emiratesAPIs', emiratesAPIs);

    emiratesAPIs.$inject = ['$http'];

    function emiratesAPIs($http) {
        return {
          getTransferEligibility: getTransferEligibility,
          getArabianAdventureTours: getArabianAdventureTours,
          getAdventureAvailability: getAdventureAvailability,
          getServiceEligibility: getServiceEligibility

        };

        //==================== Function declaration ====================

        function getTransferEligibility(){
          var req = {
            method: 'GET',
            url: 'https://ec2-52-18-199-95.eu-west-1.compute.amazonaws.com:8143/transferfacilities/1.0/?FlightDate=qwe&AirportName=123&IATACode=1233',
            headers: {
              "Authorization": 'Bearer 615a3bd4d098cdbaf1508f5a5ce4fa7c',
              "Accept": 'application/json'
            }
          };
          return $http(req);
        };

        function getArabianAdventureTours(cityName){
          var req = {
            method: 'GET',
            url: 'https://ec2-52-18-199-95.eu-west-1.compute.amazonaws.com:8143/tours/1.0/?City='+ cityName,
            headers: {
              "Authorization": 'Bearer 615a3bd4d098cdbaf1508f5a5ce4fa7c',
              "Accept": 'application/json'
            }
          };
          return $http(req);
        };

        function getAdventureAvailability(date, noOfPax, tourName){
          var req = {
            method: 'GET',
            url: 'https://ec2-52-18-199-95.eu-west-1.compute.amazonaws.com:8143/touravailability/1.0/?Date='+date+'&NoOfPassengers='+noOfPax+'&TourName='+tourName,
            headers: {
              "Authorization": 'Bearer 615a3bd4d098cdbaf1508f5a5ce4fa7c',
              "Accept": 'application/json'
            }
          };
          return $http(req);
        };

        function getServiceEligibility(benefitType){
          var req = {
            method: 'GET',
            url: 'https://ec2-52-18-199-95.eu-west-1.compute.amazonaws.com:8143/serviceeligibility/1.0/?BenefitType='+benefitType,
            headers: {
              "Authorization": 'Bearer 615a3bd4d098cdbaf1508f5a5ce4fa7c',
              "Accept": 'application/json'
            }
          };
          return $http(req);
        };
       
        
    }

})();





