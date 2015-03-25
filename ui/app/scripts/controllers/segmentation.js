'use strict';

angular.module('wikeoApp')
    .controller('SegmentationCtrl', ['$http', '$scope', '$timeout', 'Data', 'ledsService',
        function ($http, $scope, $timeout, Data, ledsService) {

            $scope.filteredContents = Data.products;

            $scope.criteria = _.values(Data.criteriaById);

            ledsService.turnAllLedsOff();

            function filterContents() {
                $scope.filteredContents = _(Data.products).filter(function(value) {
                    var selectedCriteria = _($scope.criteria).filter(function (criterion){
                        return criterion.selectedSegment;
                    });

                    return _(selectedCriteria).every(function(criterion){
                        return _(value[criterion.id]).contains(criterion.selectedSegment.description);
                    });
                });
            }

            $scope.filterSegment = function (criterion, segment) {
                ledsService.turnAllLedsOff();

                criterion.selectedSegment = segment;

                filterContents();
            };

            $scope.$watch('filteredContents', function(products) {
                _(products).each(function(product) {
                    ledsService.turnLedOn(product.led);
                })
            });

            $scope.resetSegments = function (criterion) {
                delete criterion.selectedSegment;

                filterContents();
            };

        }]);
