var jdApp = angular.module('jdApp');

jdApp.controller('QAndAController', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {

    $scope.showAnswer = false;
    $scope.item = undefined;

    $scope.toggleAnswer = function () {
        $scope.showAnswer = !$scope.showAnswer;

    }
}]);