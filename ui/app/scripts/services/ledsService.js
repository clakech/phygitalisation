'use strict';

angular.module('wikeoApp')
    .service('ledsService', ['$http', "$q", function ($http, $q) {

        this.turnLedsOnForSegment = function (segmentsIds) {

            var params = {};
            if (segmentsIds && segmentsIds.length > 0) {
                params = {
                    segments: _.map(segmentsIds, function (segmentId) {
                        return [segmentId];
                    })
                };
            }

            return $http.post(
                'http://localhost:3000/tags/family',
                params
            )
                .then(function (response) {
                    console.info('Leds turned on');
                    return response.data;
                })
                .catch(function () {
                    console.error('Could not turn leds on for segment');
                    return $q.reject();
                });
        };

        this.turnLedOn = function (id) {

            this.turnAllLedsOff();

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
