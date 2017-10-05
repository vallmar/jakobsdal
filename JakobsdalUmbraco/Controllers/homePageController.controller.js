var jdApp = angular.module('jdApp', ['ngSanitize']);
var jdData = {};
jdApp.controller('homePageController', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {
    jdData={};
    $scope.goto = function (pictureUrl, header, bodyText, childrenUrl) {
        jdData={pictureUrl:pictureUrl, header:header, bodyText:bodyText, childrenUrl:childrenUrl}
        $location.path("/om-oss");



    };

    $scope.apiTest = function () {
        $http.get("Umbraco/Api/DataHandler/GetTemplates").then(function (myString) {
            console.log(myString);
        })
    }
    $scope.windowWidth = "760";

}]);

jdApp.config(function ($routeProvider, $locationProvider) {

    $routeProvider
     .when('/om-oss', {
         template: 'ProductsHome.html',
         controller: 'productsController',
         resolve: {
             jdData: function ($route) { $route.current.params.jdData = jdData; },
             // I will cause a 1 second delay
             delay: function ($q, $timeout) {
                 var delay = $q.defer();
                 $timeout(delay.resolve, 50);
                 return delay.promise;
             }
         }
     })
});