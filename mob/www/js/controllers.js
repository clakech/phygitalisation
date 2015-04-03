angular.module('starter.controllers', [])

    .controller('DashCtrl', ['$http', '$scope', '$timeout', 'Data', 'ledsService', '$ionicModal',
        function ($http, $scope, $timeout, Data, ledsService, $ionicModal) {

            $scope.filteredContents = Data.products;

            $scope.criteria = _.values(Data.criteriaById);

            ledsService.turnAllLedsOff();

            function filterContents() {
                $scope.filteredContents = _(Data.products).filter(function (value) {
                    var selectedCriteria = _($scope.criteria).filter(function (criterion) {
                        return criterion.selectedSegment;
                    });

                    return _(selectedCriteria).every(function (criterion) {
                        return _(value[criterion.id]).contains(criterion.selectedSegment);
                    });
                });
            };

            $scope.filterSegment = function (criterion, segment) {
                console.log('filterSegment');
                ledsService.turnAllLedsOff();

                criterion.selectedSegment = segment;

                filterContents();
            };

            $scope.$watch('filteredContents', function (products) {
                _(products).each(function (product) {
                    ledsService.turnLedOn(product.led);
                })
            });

            $scope.resetSegments = function (criterion) {
                delete criterion.selectedSegment;

                filterContents();
            };

            $ionicModal.fromTemplateUrl('templates/filters.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
            });

            $scope.showFilters = function($event) {
                $scope.modal.show($event);
            };

            $scope.hideFilters = function($event) {
                $scope.modal.hide($event);
                filterContents();
            };

        }])

    .controller('ChatsCtrl', function ($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
