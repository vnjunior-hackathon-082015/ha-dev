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

    emiratesAPIs.$inject = ['$http', '$q', 'commonShareService'];

    function emiratesAPIs($http, $q, commonShareService) {
        return {
          getTransferEligibility: getTransferEligibility,
          getArabianAdventureTours: getArabianAdventureTours,
          getAdventureAvailability: getAdventureAvailability,
          getServiceEligibility: getServiceEligibility,
          getHotelPropertyListing: getHotelPropertyListing,
          getHotelRoomAvailability: getHotelRoomAvailability,
          getCardOfferByArea: getCardOfferByArea,
          getCardOffersByCategory: getCardOffersByCategory,
          getCardOffersByDiscount: getCardOffersByDiscount
          // ,
          // getArabianAdventureTrips: getArabianAdventureTrips
        };

        //==================== Function declaration ====================

        function getTransferEligibility(flightDate, airportName, codeIATA){
          var req = {
            method: 'GET',
            url: 'https://ec2-52-18-199-95.eu-west-1.compute.amazonaws.com:8143/transferfacilities/1.0/?FlightDate='+flightDate+'&AirportName='+airportName+'&IATACode='+codeIATA,
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

        function getHotelPropertyListing(location){
          var req = {
            method: 'GET',
            url: 'https://ec2-52-18-199-95.eu-west-1.compute.amazonaws.com:8143/listofproperties/1.0/?Location='+location,
            headers: {
              "Authorization": 'Bearer 615a3bd4d098cdbaf1508f5a5ce4fa7c',
              "Accept": 'application/json'
            }
          };
          return $http(req);
        };

        function getHotelRoomAvailability(start, end, location, noOfPax ){
          var req = {
            method: 'GET',
            url: 'https://ec2-52-18-199-95.eu-west-1.compute.amazonaws.com:8143/roomavailability/1.0/?StartDate='+start+'&EndDate='+end+'&Location='+location+'&NoOfCounts='+noOfPax,
            headers: {
              "Authorization": 'Bearer 615a3bd4d098cdbaf1508f5a5ce4fa7c',
              "Accept": 'application/json'
            }
          };
          return $http(req);
        };

        function getCardOfferByArea(lat, long, radius){
          var req = {
            method: 'GET',
            url: 'https://ec2-52-18-199-95.eu-west-1.compute.amazonaws.com:8143/offersbyarea/1.0/?Latitude='+lat+'&Longitude='+long+'&Radius='+radius,
            headers: {
              "Authorization": 'Bearer 615a3bd4d098cdbaf1508f5a5ce4fa7c',
              "Accept": 'application/json'
            }
          };
          return $http(req);
        };

        function getCardOffersByCategory(category){
          var req = {
            method: 'GET',
            url: 'https://ec2-52-18-199-95.eu-west-1.compute.amazonaws.com:8143/offersbycategory/1.0/?Category='+category,
            headers: {
              "Authorization": 'Bearer 615a3bd4d098cdbaf1508f5a5ce4fa7c',
              "Accept": 'application/json'
            }
          };
          return $http(req);
        };

        function getCardOffersByDiscount(discount){
          var req = {
            method: 'GET',
            url: 'https://ec2-52-18-199-95.eu-west-1.compute.amazonaws.com:8143/offersbydiscount/1.0/?Discount='+discount,
            headers: {
              "Authorization": 'Bearer 615a3bd4d098cdbaf1508f5a5ce4fa7c',
              "Accept": 'application/json'
            }
          };
          return $http(req);
        }


        // function getArabianAdventureTrips(cityName, date, noOfPax){
        //   return getArabianAdventureTours(cityName).then(function(toursResponse){
        //     var promises = [];
        //     for(var i = 0; i < toursResponse.data.TourName.length; i++){
        //       var promise = getAdventureAvailability(date, noOfPax, toursResponse.data.TourName[i]);
        //       promises.push(promise);
        //     }

        //     var allPromise = $q.all(promises);
        //     allPromise.then(function(responses) {
        //       var result = [];
        //       for(var i = 0; i < responses.length; i++){
        //         var responseData = responses[i].data;
        //         if(responseData.isAvailable){
        //           //Make the pr
        //           var obj = {};
        //           obj.minimumCost = responseData.Price.BasePrice + i;
        //           obj.tax = responseData.Price.Tax + i;
        //           obj.total = responseData.Price.Total + i;
        //           var partnerTrips = commonShareService.getPartnerTrips();
        //           for(var j = 0; j < partnerTrips.length; j++){
        //             //Right now check by name because service only return name, not id
        //             if(partnerTrips[j].title == toursResponse.data.TourName[i]){
        //               partnerTrips[j].minimumCost = obj.minimumCost;
        //               partnerTrips[j].tax = obj.tax;
        //               partnerTrips[j].total = obj.total;
        //               result.push(partnerTrips[j]);
        //             }
        //           }

        //         }
        //       }

        //       return result;

        //     });

        //   });
        // }
    }

})();





