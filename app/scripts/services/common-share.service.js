(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name hackathonApp.service:commonShareService
     * @description
     * # commonShareService
     */
    angular.module('hackathonApp')
      .service('commonShareService', commonShareService);

    commonShareService.$inject = ['$http', '$window'];

    function commonShareService($http, $window) {
      var _loginInfo = null,
        _trips = null;

        return {
            getLoginInfo: getLoginInfo,
            setLoginInfo: setLoginInfo,
            getTrips: getTrips,
            setTrips: setTrips,
            getDestination: getDestination,
            getUsers: getUsers
        };

        //==================== Function declaration ====================

        function getUsers(){
          return angular.copy(data_users);
        }

        function getLoginInfo(){
          if (!_loginInfo) {
            var param = $window.sessionStorage.loginInfo;
            _loginInfo = param ? JSON.parse(param) : undefined;
          }
          return _loginInfo;
        }

        function setLoginInfo(param){
          var str = param;
          if (param) {
              str = JSON.stringify(param);
          }
          _loginInfo = param;
          $window.sessionStorage.loginInfo = str;
        }

        function getTrips(){
          if (!_trips) {
            var value = $window.sessionStorage.trips;
            _trips = value ? JSON.parse(value) : angular.copy(data_trips);
          }
          return _trips;
        }

        function setTrips(param){
          var str = param;
          if (param) {
              str = JSON.stringify(param);
          }
          _trips = param;
          if(param === null){
            $window.sessionStorage.removeItem('trips');
          } else{
            $window.sessionStorage.trips = str;
          }
        }

        function getDestination(){
          return angular.copy(data_destinations);
        }
    }

})();





