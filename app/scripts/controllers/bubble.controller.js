'use strict';

/**
 * @ngdoc function
 * @name hackathonApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the hackathonApp
 */
 angular.module('hackathonApp')
 .controller('BubbleController', function($scope, $rootScope, $compile, commonShareService){

   $rootScope.activeTab = 'home';
   $scope.selectedCircle  = 1;
   $scope.des = commonShareService.getDestination();
   $scope.selectedObj = $scope.des[0];


   $scope.select = function(id){
   $scope.selectedCircle  = id;
  $scope.selectedObj = $scope.des[id-1];

    var htmlStr = '<carousel interval="myInterval" no-wrap="noWrapSlides">'
    + '  <slide ng-repeat="slide in selectedObj.photoList">'
    + '    <img ng-src="{{slide}}"  width="600" height="300" style="margin:auto; height: 300px">'
    + '    <div class="carousel-caption">'
    + '    </div>'
    + '  </slide>'
    + '</carousel>';

    var elem = $compile(angular.element(htmlStr))($scope);
    var carouselSection = document.getElementById('carousel-section');
    carouselSection.innerHTML = '';
    angular.element(carouselSection).append(elem);

    setTimeout(function() {
     angular.element(document.querySelector('#carousel-section .carousel-indicators')).removeClass('ng-hide');
     angular.element(document.querySelector('#carousel-section .left.carousel-control')).removeClass('ng-hide');
     angular.element(document.querySelector('#carousel-section .right.carousel-control')).removeClass('ng-hide');
   }, 100);

    $scope.isSelected = function(id){
      if (id == $scope.selectedCircle) return true;
      else return false;
    }
  }
});
