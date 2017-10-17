var jdApp = angular.module('jdApp', ['ngSanitize', 'bs.screenSize']);
var jdData = {};
jdApp.controller('homePageController', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {
    jdData = {};
    $scope.lastThreeInstaPhotos = [];
    $scope.goto = function (pictureUrl, header, bodyText, childrenUrl) {
        jdData={pictureUrl:pictureUrl, header:header, bodyText:bodyText, childrenUrl:childrenUrl}
        $location.path("/om-oss");



    };

    var userFeed = new Instafeed({
        get: 'user',
        userId: '192808799',
        accessToken: '192808799.1677ed0.7420cbb92d8e4c0b854683f84362e042',
        resolution: 'standard_resolution',
        target:'myInstafedd',
        success: function (json) {
            $scope.lastThreeInstaPhotos.push(json.data[0]);
            $scope.lastThreeInstaPhotos.push(json.data[1]);
            $scope.lastThreeInstaPhotos.push(json.data[2]);
            window.location.href = "#home";         
        }
    });
    userFeed.run();

    $scope.fetchInst = function (input) {
        if (input === undefined) {
            return false;
        }
        return input;
    }

}]);




jdApp.config(function ($routeProvider, $locationProvider) {

    //$routeProvider
    // .when('/om-oss', {
    //     template: 'ProductsHome.html',
    //     controller: 'productsController',
    //     resolve: {
    //         jdData: function ($route) { $route.current.params.jdData = jdData; },
    //         // I will cause a 1 second delay
    //         delay: function ($q, $timeout) {
    //             var delay = $q.defer();
    //             $timeout(delay.resolve, 50);
    //             return delay.promise;
    //         }
    //     }
    // })
});