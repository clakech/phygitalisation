'use strict';

angular.module('wikeoApp')
    .service('ledsService', ['$http', "$q", function ($http, $q) {

        this.turnLedOn = function (id) {

            return $http.get(
                'http://localhost:3000/tags/' + id + '/on/'
            )
                .then(function (response) {
                    console.info('Led ' + id + ' turned on');
                    return response.data;
                })
                .catch(function () {
                    console.error('Could not turn led ' + id + ' on');
                    return $q.reject();
                });
        };

        this.turnAllLedsOff = function () {

            return $http.get(
                'http://localhost:3000/tags/off/'
            )
                .then(function () {
                    console.info('Leds turned off');
                })
                .catch(function () {
                    console.error('Could not turn all leds off');
                });
        };

    }]);
