'use strict';

/**
 * @ngdoc function
 * @name hackathonApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the hackathonApp
 */
angular.module('hackathonApp')
  .controller('EligibilityController', function($scope, $rootScope, $compile, commonShareService, emiratesAPIs){
    var vm = this;
    vm.eligibilityData = [];

    init();

    function init(){
      emiratesAPIs.getTransferEligibility().then(function(response){
        if (response.data != undefined){
          //vm.airportHotels = response.data['AirportHotels'];
          //vm.airportLounges = response.data['AirportLounges'];
          //vm.parking = response.data['Parking'];
          //vm.prayerRooms = response.data['PrayerRooms'];
          //vm.sleepingPods = response.data['SleepingPods'];
          //vm.smokingAreas = response.data['SmokingAreas'];
          //vm.toiletsAndShowers = response.data['ToiletsAndShowers'];
          //vm.travellingWithBabiesAndChildren = response.data['TravellingWithBabiesAndChildren'];
          //vm.VIPTerminal = response.data['VIPTerminal'];
          if (response.data['AirportHotels'] != undefined){
            var info = [];
            angular.forEach(response.data['AirportHotels'], function(item){
              info.push(item['Address']['StreetAddress']);
            });
            vm.eligibilityData.push({
              type: 'AirportHotels',
              typeName: 'Airport hotels',
              info: info
            })
          }
          if (response.data['AirportLounges'] != undefined){
            vm.eligibilityData.push({
                type: 'AirportLounges',
                typeName: 'Airport lounges',
                info: response.data['AirportLounges']
            });
          }
          if (response.data['Parking'] != undefined){
            vm.eligibilityData.push({
                type: 'Parking',
                typeName: 'Parking',
                info: response.data['Parking']
            });
          }
          if (response.data['PrayerRooms'] != undefined){
            vm.eligibilityData.push({
                type: 'PrayerRooms',
                typeName: 'Prayer rooms',
                info: response.data['PrayerRooms']
            });
          }
          if (response.data['SleepingPods'] != undefined){
            vm.eligibilityData.push({
                type: 'SleepingPods',
                typeName: 'Sleeping pods',
                info: response.data['SleepingPods']
              });
          }
          if (response.data['SmokingAreas'] != undefined){
            vm.eligibilityData.push({
                type: 'SmokingAreas',
                typeName: 'Smoking areas',
                info: response.data['SmokingAreas']
              });
          }
          if (response.data['ToiletsAndShowers'] != undefined){
            vm.eligibilityData.push({
                type: 'ToiletsAndShowers',
                typeName: 'Toilets and showers',
                info: response.data['ToiletsAndShowers']
              });
          }
          if (response.data['TravellingWithBabiesAndChildren'] != undefined){
            vm.eligibilityData.push({
                type: 'TravellingWithBabiesAndChildren',
                typeName: 'Travelling with babies and children',
                info: response.data['TravellingWithBabiesAndChildren']
              });
          }
          if (response.data['VIPTerminal'] != undefined){
            vm.eligibilityData.push({
                type: 'VIPTerminal',
                typeName: 'VIP Terminal',
                info: response.data['VIPTerminal']
              });
          }
        }
      })
    }
  });
