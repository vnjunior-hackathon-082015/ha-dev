'use strict';

/**
 * @ngdoc function
 * @name hackathonApp.controller:ToursController
 * @description
 * # ToursController
 * Controller of the hackathonApp
 */
 angular.module('hackathonApp')
 .controller('CardOfferController', function($scope, $rootScope, $compile, commonShareService, emiratesAPIs,$timeout){
 	
 	// $scope.name = [];
 	// $scope.details=[];
 	// $scope.tours=[];

 	// emiratesAPIs.getArabianAdventureTours("Dubai").then(function(respone){
 	// 	angular.forEach(respone.data.TourName, function(name, key){
 	// 		var i = 0;
 	// 		$scope.name.push(name);

 	// 		angular.forEach($scope.name, function(name, key){
 	// 			emiratesAPIs.getAdventureAvailability("29/12/2015", 3,name).then(function(respone2){
 	// 				$scope.details.push(respone2.data);
 	// 			});
 	// 		})

 	// 	});
 	// 	console.log('get name');
 	// });

 	// // $timeout(angular.forEach($scope.name, function(name, key){

 	// 	emiratesAPIs.getAdventureAvailability("29/12/2015", 3,name).then(function(respone2){
 	// 		$scope.details.push(respone2.data);

 	// 	});
 	// 	console.log('get details');

 	// }),5000);
});