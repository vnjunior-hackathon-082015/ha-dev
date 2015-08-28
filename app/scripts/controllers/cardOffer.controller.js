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
 	
 	$scope.offers = [];
 	
 	emiratesAPIs.getCardOffersByCategory('leisure').then(function(response){
 		$scope.offers.push(response.data.Offer[0]);
 		$scope.offers.push(response.data.Offer[1]);
 	});
 	// hard edit for good json
 	emiratesAPIs.getCardOffersByCategory('food').then(function(response){
 		response.data.Offer[0].Category="Food & Dining";
 		response.data.Offer[1].Category="Food & Dining";
 		$scope.offers.push(response.data.Offer[0]);
 		$scope.offers.push(response.data.Offer[1]);
 		
 	});

 	emiratesAPIs.getCardOffersByCategory('shopping').then(function(response){
 		response.data.Offer[0].Category="Shopping";
 		response.data.Offer[1].Category="Shopping";
 		$scope.offers.push(response.data.Offer[0]);
 		$scope.offers.push(response.data.Offer[1]);
 		
 	});

 	emiratesAPIs.getCardOffersByCategory('travel').then(function(response){
 		response.data.Offer[0].Category="Travel";
 		response.data.Offer[1].Category="Travel";
 		$scope.offers.push(response.data.Offer[0]);
 		$scope.offers.push(response.data.Offer[1]);
 		
 	});

 });