'use strict';

angular.module('wikeoApp')
    .controller('SegmentationCtrl', ['$http', '$scope', '$timeout', 'Data', 'ledsService',
        function ($http, $scope, $timeout, Data, ledsService) {

            $scope.filteredContents = Data.products;

            $scope.criteria = _.values(Data.criteriaById);

            ledsService.turnAllLedsOff();

            ////////////////////////////////////////////////
            // Filter contents after a click on a segment //
            $scope.filterSegment = function (criterion, segment) {
                ledsService.turnAllLedsOff();

                criterion.selectedSegment = segment;

                $scope.filteredContents = _(Data.products).filter(function(value) {
                    var selectedCriteria = _($scope.criteria).filter(function (criterion){
                        return criterion.selectedSegment;
                    });

                    return _(selectedCriteria).every(function(criterion){
                        return _(value[criterion.id]).contains(criterion.selectedSegment.description);
                    });
                })
            };

            $scope.$watch('filteredContents', function(products) {
                _(products).each(function(product) {
                    ledsService.turnLedOn(product.id);
                })
            });

            $scope.resetSegments = function (criterion, position) {
                delete criterion.selectedSegment;
            };

            ////////////////////////////
            // Full screen management //
            $scope.toggleFullScreen = function () {
                if (!document.fullscreenElement &&    // alternative standard method
                    !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
                    if (document.documentElement.requestFullscreen) {
                        document.documentElement.requestFullscreen();
                    } else if (document.documentElement.mozRequestFullScreen) {
                        document.documentElement.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullscreen) {
                        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.cancelFullScreen) {
                        document.cancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                }
            };

        }]);
