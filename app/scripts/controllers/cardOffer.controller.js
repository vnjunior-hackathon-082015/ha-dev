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
 		response.data.Offer[0].photo = "images/bottom-img/bowling-small.jpg";
 		response.data.Offer[1].photo = "images/dubai-img/attlantis-2.jpg";
 		$scope.offers.push(response.data.Offer[0]);
 		$scope.offers.push(response.data.Offer[1]);
 	});
 	// hard edit for good json
 	emiratesAPIs.getCardOffersByCategory('food').then(function(response){
 		response.data.Offer[0].Category="Food & Dining";
 		response.data.Offer[1].Category="Food & Dining";

 		response.data.Offer[0].photo = "images/bottom-img/food1.jpg";
 		response.data.Offer[1].photo = "images/bottom-img/food2.jpg";

 		response.data.Offer[1].OfferName = "Tradiontinal food";
 		response.data.Offer[0].OfferName = "Dubai mall restaurant";
 		$scope.offers.push(response.data.Offer[0]);
 		$scope.offers.push(response.data.Offer[1]);
 		
 	});

 	emiratesAPIs.getCardOffersByCategory('shopping').then(function(response){
 		response.data.Offer[0].Category="Shopping";
 		response.data.Offer[1].Category="Shopping";

 		response.data.Offer[0].photo = "images/bottom-img/shopping1.jpg";
 		response.data.Offer[1].photo = "images/bottom-img/shopping2.jpg";

 		response.data.Offer[1].OfferName = "Voucher for shopping in mall";
 		response.data.Offer[0].OfferName = "Many discount in Gold Souk";

 		$scope.offers.push(response.data.Offer[0]);
 		$scope.offers.push(response.data.Offer[1]);
 		
 	});

 	emiratesAPIs.getCardOffersByCategory('travel').then(function(response){
 		response.data.Offer[0].Category="Travel";
 		response.data.Offer[1].Category="Travel";

 		response.data.Offer[0].photo = "images/dubai-img/burj-al-arab-2.jpg";
 		response.data.Offer[1].photo = "images/dubai-img/wild-wadi-2.jpg";

 		response.data.Offer[1].OfferName = "Discount for Wild Wadi ticket";
 		response.data.Offer[0].OfferName = "Best offers in Buji Al Arab";

 		$scope.offers.push(response.data.Offer[0]);
 		$scope.offers.push(response.data.Offer[1]);
 		
 	});

 });