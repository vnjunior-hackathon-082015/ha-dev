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

    commonShareService.$inject = [];

    function commonShareService() {
        return {
            getDestination: getDestination
        };

        //==================== Function declaration ====================

        function getDestination(){
          return angular.copy(data_destinations);
        }
    }

})();





