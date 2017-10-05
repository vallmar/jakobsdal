var jdApp = angular.module('jdApp');

jdApp.controller('productsController', ['$scope', function ($scope) {
    $scope.showDetailedContent = false;
    $scope.showDetailedContentChange=function(){
        $scope.showDetailedContent = !$scope.showDetailedContent;
    }
}]);