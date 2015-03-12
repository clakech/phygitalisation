'use strict';

angular.module('wikeoApp')
    .controller('SegmentationCtrl', ['$http', '$scope', '$timeout', 'Data',
        function ($http, $scope, $timeout, Data) {

            $scope.currentSegmentsIds = [];

            $scope.criteria = [];
            $scope.criterionTab = {};
            $scope.displayFinish = false;
            $scope.contents = Data.products;
            $scope.totalContentsCount = '';

            ///////////////////////////////////////////////////////////////////////////
            // Compute segments ids according to selected segments for each criteria //
            var computeSegmentsIds = function () {

                var criterion = Data.criteriaById[Object.keys(criteriaById)[0]];
                var selectedSegmentsIds = [];
                var segment = criterion.selectedSegment;

                if (segment) {
                    selectedSegmentsIds.push(segment.id);

                    while (segment && segment.mappedContent['next-criterion']) {

                        criterion = Data.criteriaById[segment.mappedContent['next-criterion'][0]['value'][0].href];
                        segment = criterion.selectedSegment;
                        if (segment) {
                            selectedSegmentsIds.push(segment.id);
                        }
                    }

                    console.debug('Segments : ');
                    console.debug(selectedSegmentsIds);
                }

                return selectedSegmentsIds;
            };

            ////////////////////////////////////////////////
            // Filter contents after a click on a segment //
            $scope.filterSegment = function (criterion, segment) {

                criterion.selectedSegment = segment;

                if (segment.mappedContent['next-criterion']) {
                    // Needs timeout to properly display enter animation
                    $timeout(function () {
                        $scope.criteria.push(Data.criteriaById[segment.mappedContent['next-criterion'][0]['value'][0].href]);
                        // Compute segments IDs list
                        $scope.familyHref = angular.copy(familyHref);
                        $scope.currentSegmentsIds = computeSegmentsIds();
                    });
                } else {
                    // Needs timeout to properly display enter animation
                    $timeout(function () {
                        $scope.displayFinish = true;
                        // Compute segments IDs list
                        $scope.familyHref = angular.copy(familyHref);
                        $scope.currentSegmentsIds = computeSegmentsIds();
                    });
                }


            };

            ////////////////////////////////////////////////
            // Filter contents after a click on a tab criterion //
            $scope.tabFilterSegment = function (criterion, segment, position) {

                if (criterion.selectedSegment != segment) {
                    $scope.resetSegments(criterion, position);
                    $scope.filterSegment(criterion, segment);
                }
            };

            //////////////////////////////////////////////////////////////////////
            // Remove children criterion after a criterion modification request //
            $scope.resetSegments = function (criterion, position) {

                var criteriaToReset = [];
                var segment = criterion.selectedSegment;

                criteriaToReset.push(criterion);

                while (segment && segment.mappedContent['next-criterion']) {

                    criterion = Data.criteriaById[segment.mappedContent['next-criterion'][0]['value'][0].href];
                    criteriaToReset.push(criterion);
                    segment = criterion.selectedSegment;
                }

                criteriaToReset.forEach(function (criterion) {
                    criterion.selectedSegment = null;
                });

                // Compute segments IDs list
                $scope.familyHref = angular.copy(familyHref);
                $scope.currentSegmentsIds = computeSegmentsIds();

                // Remove from UI
                $scope.displayFinish = false;
                $scope.criteria.splice(position + 1, $scope.criteria.length);
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

            ///////////
            // Inits //

            // Display first criterion
            $scope.criteria = _.values(Data.criteriaById);

        }]);
