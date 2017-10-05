var jdApp = angular.module('jdApp');

jdApp.controller('productsController', ['$scope', '$http','$location', '$routeParams', function ($scope, $http, $location, $routeParams) {

    $scope.showDetailedContent = false;
    $scope.item = undefined;
    $scope.showDetailedContentChange = function (item) {
        if ($scope.item === item || $scope.item === undefined) {
            $scope.showDetailedContent = !$scope.showDetailedContent;
        }
            $scope.activeProduct = $scope.productDetails.filter(function (product) {
                return product.id === item;
            })[0];
            $scope.item = item
    }

    function apiTest() {
        var categoryId = $scope.categoryId;
        $http({ method: 'GET', url: '/Umbraco/Api/DataHandler/GetProducts/CategoryId/', params: { categoryId: categoryId } }).then(function (response) {
            $scope.productDetails = response.data;
        })
    }

    var hey=function(){
       var dummy="hey"
    }

    $scope.getCategoryId = function (id) { 
        $scope.categoryId = id;
    apiTest();
    }
}]);