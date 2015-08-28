(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name hackathonApp.controller:DashboardCtrl
     * @description
     * # DashboardCtrl
     * Controller of the hackathonApp
     */
    angular.module('hackathonApp')
      .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', '$mdDialog', '$rootScope', 'commonShareService'];

    function DashboardCtrl($scope, $mdDialog, $rootScope, commonShareService){
          var vm = this;
          vm.message = 'Hellow Dashboard';
          vm.onCommentButton = onCommentButton;
          vm.onJoinTrip = onJoinTrip;
          activate();

          //==================== Function declaration ====================
          function activate(){
            $rootScope.activeTab = 'dashboard';
            vm.listTrips = commonShareService.getRoutes();
            vm.listTrips.reverse();
            vm.destinationList = commonShareService.getDestination();
            for(var k = 0; k < vm.listTrips.length; k++){
              for (var i = 0; i < vm.listTrips[k].destinations.length; i++) {
                for (var j = 0; j < vm.destinationList.length; j++) {
                  if (vm.listTrips[k].destinations[i].locationId == vm.destinationList[j].id) {
                    vm.listTrips[k].destinations[i].photo = "background-image : url('images/dubai-img/" + vm.destinationList[j].photo + "');";
                    vm.listTrips[k].destinations[i].address = vm.destinationList[j].address;
                    vm.listTrips[k].destinations[i].description = vm.destinationList[j].description;
                    vm.listTrips[k].destinations[i].locationName = vm.destinationList[j].destination;
                    break;
                  }
                }
              }
            }
          }

          function onCommentButton(index){
            var currentTrip = vm.listTrips[index];
            if(currentTrip.showCommentSection && currentTrip.activeComment && currentTrip.activeComment.length > 0){
              $rootScope.loginInfo = commonShareService.getLoginInfo();
              if($rootScope.loginInfo){
                currentTrip.comments.push({
                        fullname: $rootScope.loginInfo.fullname,
                        avatarURL: $rootScope.loginInfo.avatarURL,
                        comment: currentTrip.activeComment
                    });
                currentTrip.activeComment = '';
              } else{
                login();
              }
            } else{
              currentTrip.showCommentSection = !currentTrip.showCommentSection;
            }
          }

          function onJoinTrip(trip){
            var loginInfo = commonShareService.getLoginInfo();
            loginInfo.routesJoined.push(trip.routeId);
            commonShareService.setLoginInfo(loginInfo);
          }

          function login(event) {
            $mdDialog.show({
              controller: 'LoginDialogController',
              controllerAs: 'vm',
              templateUrl: 'views/login-dialog.tmpl.html',
              parent: angular.element(document.body),
              // targetEvent: event,
              clickOutsideToClose:true
            })
            .then(function(answer) {
              //Login success
            }, function() {
              //Dialog was cancelled
            });
          };
    }



})();





