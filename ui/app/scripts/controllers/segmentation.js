'use strict';

angular.module('wikeoApp')
    .controller('SegmentationCtrl', ['$http', '$scope', '$timeout',
        function ($http, $scope, $timeout) {

            var criteriaById = {
                '123': {description: 'matière', segment: [{description: 'bois', image: 'http://ser36.ovh.wikeo.webadeo.net/images/49/9d/poncage.jpg'}, {description: 'métal', image: 'http://ser36.ovh.wikeo.webadeo.net/images/49/9d/poncage.jpg'}]},
                '456': {description: 'forme'}
            };

            $scope.currentSegmentsIds = [];

            $scope.criteria = [];
            $scope.criterionTab = {};
            $scope.displayFinish = false;

            $scope.totalContentsCount = '...';

            ///////////////////////////////////////////////////////////////////////////
            // Compute segments ids according to selected segments for each criteria //
            var computeSegmentsIds = function () {

                var criterion = criteriaById[Object.keys(criteriaById)[0]];
                var selectedSegmentsIds = [];
                var segment = criterion.selectedSegment;

                if (segment) {
                    selectedSegmentsIds.push(segment.id);

                    while (segment && segment.mappedContent['next-criterion']) {

                        criterion = criteriaById[segment.mappedContent['next-criterion'][0]['value'][0].href];
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
                        $scope.criteria.push(criteriaById[segment.mappedContent['next-criterion'][0]['value'][0].href]);
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

                    criterion = criteriaById[segment.mappedContent['next-criterion'][0]['value'][0].href];
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
            var firstCriterion = criteriaById[Object.keys(criteriaById)[0]];
            var secondCriterion = criteriaById[Object.keys(criteriaById)[1]];
            //if (!secondCriterion || firstCriterion.model.href === secondCriterion.model.href) {
                $scope.criteria = [firstCriterion];
            //} else {
            //    $scope.criterionTab.criterion = firstCriterion;
            //    $scope.filterSegment(firstCriterion, firstCriterion.segment[0]);
            //}
        }]);
