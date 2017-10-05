var jdApp = angular.module('jdApp', []);

jdApp.controller('homePageController', ['$scope', '$http', function ($scope, $http) {
    $scope.test = "Tjolahopp";
    $scope.test = function () {
        console.log("tja");
    };

    $scope.apiTest = function () {
        $http.get("Umbraco/Api/DataHandler/GetTemplates").then(function (myString) {
            console.log(myString);
        })
    }
}]);