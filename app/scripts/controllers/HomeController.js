'use strict';

/**
 * @ngdoc function
 * @name hackathonApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the hackathonApp
 */
 angular.module('hackathonApp')
 .controller('HomeController', function($scope, $rootScope, $compile, commonShareService){

  	$scope.menu=[1,2,3];
  	$scope.selectedItemID = 1;

  	$scope.isMenuSelected = function(id){
  		if( id == $scope.selectedItemID){
  			console.log('true menu check');
  			return true;
  		}else{
  			return false;
  		}
  	} 

  	$scope.selectItem = function(id){
  		$scope.selectedItemID = id;
  		console.log('true menu click');
  	}
});