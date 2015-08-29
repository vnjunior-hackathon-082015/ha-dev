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
        _trips = null,
        _partnerTrips;

        return {
            getLoginInfo: getLoginInfo,
            setLoginInfo: setLoginInfo,
            getTrips: getTrips,
            setTrips: setTrips,
            getDestination: getDestination,
            getUsers: getUsers,
            getPartnerTrips: getPartnerTrips,
            setPartnerTrips: setPartnerTrips,
            setSkywardsPoint: setSkywardsPoint
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

        function getPartnerTrips(){
          if (!_partnerTrips) {
            var param = $window.sessionStorage.partnerTrips;
            _partnerTrips = param ? JSON.parse(param) : angular.copy(data_arab_adventure_trips);
          }
          return _partnerTrips;
        }

        function setPartnerTrips(param){
          var str = param;
          if (param) {
              str = JSON.stringify(param);
          }
          _partnerTrips = param;
          if(param === null){
            $window.sessionStorage.removeItem('partnerTrips');
          } else{
            $window.sessionStorage.partnerTrips = str;
          }
        }

        function setSkywardsPoint(point){
          var loginInfor = getLoginInfo();
          loginInfor.skywardsPoint = parseInt(loginInfor.skywardsPoint) + parseInt(point);
        };
    }

})();





