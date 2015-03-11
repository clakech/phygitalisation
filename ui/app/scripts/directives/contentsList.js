'use strict';

angular.module('wikeoApp')
    .controller('contentsListController', function ($scope, $q, $location, $anchorScroll, ngDialog, contentService, ledsService) {

        var currentPage = 1;
        var currentContentIndex = 0;
        var loadingContents = false;
        var contentsCountForIteration = 0;
        var alight = [];
        var requestExpiryDate = Date.now();
        var oldContentHref = '';
        var doContentWatch = true;

        var mappedProductTemplate = {
            designation: '...............................  ......................... .......................  ...............',
            reference: '...................',
            prix: '...',
            image: 'http://ser36.ovh.wikeo.webadeo.net/images/da/30/placeholder.png'
        };

        $scope.contents = [];
        $scope.totalContentsCount = '...';

        $scope.$watchCollection('currentSegmentsIds', function () {

            resetContentsList();

            loadContents(1, $scope.contentHref, $scope.currentSegmentsIds, $scope.boost);
            ledsService.turnLedsOnForSegment($scope.contentHref, $scope.currentSegmentsIds).then(
                function (data) {
                    alight = data;
                }
            );
        });

        $scope.$watch('contentHref', function () {
            resetContentsList();
            loadContents(1, $scope.contentHref, $scope.currentSegmentsIds, $scope.boost);
            ledsService.turnLedsOnForSegment($scope.contentHref, $scope.currentSegmentsIds).then(
                function (data) {
                    alight = data;
                }
            );
        });

        /////////////////////////
        // Reset contents list //
        var resetContentsList = function () {

            requestExpiryDate = Date.now();
            alight = [];
            $scope.contents = [];
            $scope.totalContentsCount = '...';
            currentPage = 1;
            currentContentIndex = 0;

            // Scroll to top
            $location.hash('top');
            $anchorScroll();

            $scope.rawScrollHeight = 2048;

            ledsService.turnAllLedsOff();
        };

        ////////////////////////////////////////////////
        // Add contents placeholders in contents list //
        var addPlaceholders = function () {

            var i = 0;

            contentsCountForIteration = getContentCountForNextIteration();

            for (; i < contentsCountForIteration; i++) {
                var tempProduct = {};
                angular.copy(mappedProductTemplate, tempProduct);
                $scope.contents.push(tempProduct);
            }
        };

        /////////////////////////////////////////////////////////////////
        // Get products/contents count for next content load iteration //
        var getContentCountForNextIteration = function () {

            // Compute remaining contents
            var productsCountForIteration = $scope.totalContentsCount - currentContentIndex;
            productsCountForIteration = productsCountForIteration > 20 ? 20 : productsCountForIteration;
            if (!productsCountForIteration && productsCountForIteration !== 0) {
                productsCountForIteration = 20;
            }

            return productsCountForIteration;
        };

        ///////////////////
        // Load contents //
        var loadContents = function (page, contentHref, currentSegmentsIds, boost) {

            loadingContents = true;
            var requestTimestamp = Date.now();

            contentService.getProducts(page, contentHref, currentSegmentsIds, boost).then(
                function (contents) {
                    treatDownloadedContents(contents, requestTimestamp);
                }
            );
        };

        //////////////////////////////////////////////////////////////////////
        // Inifinite scroll : Load more contents when reaching page bottom //
        $scope.loadMoreContents = function () {

            if (currentContentIndex < $scope.totalContentsCount && !loadingContents) {

                console.debug('Load contents');

                currentPage += 1;
                loadContents(currentPage, $scope.contentHref, $scope.currentSegmentsIds, $scope.boost);
            }
        };

        //////////////////////////////////////////////////////
        // Map retrieved content on usage for contents list //
        var mapContentOnUsageForContentList = function (content, mappedContent, defer, requestTimestamp) {

            if (requestTimestamp >= requestExpiryDate) {

                var modelType = content.model.href.substr(0, content.model.href.lastIndexOf('/'));
                modelType = modelType.substr(0, modelType.lastIndexOf('/'));
                modelType = modelType.substr(modelType.lastIndexOf('/') + 1);
                content.modelType = modelType;

                contentService.getImagesAndAssociateMappedContent(content, mappedContent).then(
                    function (content) {

                        if (requestTimestamp >= requestExpiryDate) {

                            $scope.contents[currentContentIndex] = content;
                            currentContentIndex += 1;

                            defer.resolve();

                        } else {
                            defer.resolve();
                        }
                    }
                );
            } else {
                defer.resolve();
            }
        };

        ///////////////////////////////////////////////////////////////
        // Treat downloaded contents : map on usage and put in model //
        var treatDownloadedContents = function (contents, requestTimestamp) {

            var contentsPromises = [];

            if (requestTimestamp >= requestExpiryDate) {

                $scope.totalContentsCount = contents.totalCount;

                //contents.content.forEach(function (content) {

                //var defer = $q.defer();
                //contentsPromises.push(defer.promise);

                // Map contents and usages
                //usageService.mapContentOnUsage(content).then(
                //  function (mappedContent) {
                //    mapContentOnUsageForContentList(content, mappedContent, defer, requestTimestamp);
                //  }
                //);
                //});

                $q.all(contentsPromises).then(function () {

                    // Remove useless placeholders
                    if ($scope.totalContentsCount < $scope.contents.length) {
                        $scope.contents.splice(currentContentIndex, $scope.contents.length - currentContentIndex);
                    }

                    addPlaceholders();

                    loadingContents = false;
                    contentsPromises = [];
                });
            }
        };

        //////////////////////
        // Turn all leds on //
        $scope.turnLedsOn = function () {
            ledsService.turnLedsOnForSegment($scope.contentHref, $scope.currentSegmentsIds).then(
                function (data) {
                    alight = data;
                }
            );
        };

        ////////////////////////////////////////////
        // Check that a content has an alight led //
        $scope.hasLed = function (uuid) {
            return _.contains(alight, uuid);
        }

    })
    .directive('contentsList', function () {

        return {
            scope: {
                currentSegmentsIds: '=',
                contentHref: '=',
                totalContentsCount: '=',
                boost: '='
            },
            restrict: 'A',
            controller: 'contentsListController',
            templateUrl: 'views/templates/contentsList.html',
            link: function (scope, elm, attrs) {

                var raw = elm[0];
                scope.rawScrollHeight = raw.scrollHeight;

                elm.bind('scroll', function () {

                    //console.debug('raw.scrollTop + raw.offsetHeight = ' + (raw.scrollTop + raw.offsetHeight) + ', rawScrollHeight : ' + rawScrollHeight + ' , raw.scrollHeight = ' + raw.scrollHeight);

                    if (raw.scrollTop + raw.offsetHeight >= scope.rawScrollHeight) {

                        console.debug('Load more contents');
                        scope.$apply(function () {
                            scope.rawScrollHeight = raw.scrollHeight;
                            scope.loadMoreContents();
                        });
                    }
                });
            }
        }
    });
