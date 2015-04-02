angular.module('starter.controllers', [])

    .controller('DashCtrl', ['$http', '$scope', '$timeout', 'Data', 'ledsService',
        function ($http, $scope, $timeout, Data, ledsService) {

            $scope.filteredContents = Data.products;

            $scope.criteria = _.values(Data.criteriaById);

            ledsService.turnAllLedsOff();

            function filterContents() {
                $scope.filteredContents = _(Data.products).filter(function (value) {
                    var selectedCriteria = _($scope.criteria).filter(function (criterion) {
                        return criterion.selectedSegment;
                    });

                    return _(selectedCriteria).every(function (criterion) {
                        return _(value[criterion.id]).contains(criterion.selectedSegment.description);
                    });
                });
            }

            $scope.filterSegment = function (criterion, segment) {
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
