'use strict';

angular.module('wikeoApp')
    .constant('API', {url: 'http://localhost:3000/leds/'})
    .service('ledsService', ['$http', "$q", "API", function ($http, $q, API) {

        this.turnLedOn = function (id) {

            return $http.get(API.url + id + '/on/')
                .then(function () {
                    console.info('Led ' + id + ' turned on');
                })
                .catch(function () {
                    console.error('Could not turn led ' + id + ' on');
                });
        };

        this.turnAllLedsOff = function () {

            return $http.get(API.url + 'off/')
                .then(function () {
                    console.info('Leds turned off');
                })
                .catch(function () {
                    console.error('Could not turn all leds off');
                });
        };

    }]);
