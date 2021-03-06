﻿var jdApp = angular.module('jdApp');

jdApp.controller('productsController', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams, bsScreenSize) {
    $scope.categoryChildren = false;
    $scope.showDetailedContent = false;
    $scope.item = undefined;
    $scope.screenSize = bsScreenSize;

    $scope.showDetailedContentChange = function (item) {
        if ($scope.item === item || $scope.item === undefined) {
            $scope.showDetailedContent = !$scope.showDetailedContent;
        }
        else if ($scope.item !== undefined) {
            $scope.showDetailedContent = true;
        }
        $scope.activeProduct = item;
        getProductPropertyValues(item);
            //$scope.activeProduct = $scope.productDetails.filter(function (product) {
            //    return product.id === item;
            //})[0];
            $scope.item = item
    }
    getAllCategories();

    function getOneCategory() {
        var categoryId = $scope.categoryId;
        $http({ method: 'GET', url: '/Umbraco/Api/DataHandler/GetProducts/CategoryId/', params: { categoryId: categoryId } }).then(function (response) {
            $scope.productDetails = response.data;
        })
    }

    getProductPropertyValues = function (item) {

        $scope.activeProduct.detailedText = item.Properties.find(function (prop) {
            return prop.PropertyTypeAlias === 'detailedText';
        }).DataValue;
        //$scope.activeProduct.maintext == item.Properties.find(function (prop) {
        //    return prop.PropertyTypeAlias === 'maintext';
        //}).DataValue;
        $scope.activeProduct.maintext = item.Properties.find(function (prop) {
            return prop.PropertyTypeAlias === 'maintext';
        }).DataValue;
        $scope.activeProduct.energy = item.Properties.find(function (prop) {
            return prop.PropertyTypeAlias === 'energy';
        }).DataValue;
        $scope.activeProduct.Fat = item.Properties.find(function (prop) {
            return prop.PropertyTypeAlias === 'fat';
        }).DataValue;
        $scope.activeProduct.carbs = item.Properties.find(function (prop) {
            return prop.PropertyTypeAlias === 'carbs';
        }).DataValue;
        $scope.activeProduct.salt = item.Properties.find(function (prop) {
            return prop.PropertyTypeAlias === 'salt';
        }).DataValue;
        $scope.activeProduct.protein = item.Properties.find(function (prop) {
            return prop.PropertyTypeAlias === 'protein';
        }).DataValue;
        $scope.activeProduct.saturatedFat = item.Properties.find(function (prop) {
            return prop.PropertyTypeAlias === 'saturatedFat';
        }).DataValue;
        $scope.activeProduct.whereSugars = item.Properties.find(function (prop) {
            return prop.PropertyTypeAlias === 'whereSugars';
        }).DataValue;
        $scope.activeProduct.whereSugars = item.Properties.find(function (prop) {
            return prop.PropertyTypeAlias === 'whereSugars';
        }).DataValue;
    }

    $scope.showCategory = function (categoryId) {
        if ($scope.currentCategory && categoryId === $scope.currentCategory.Id) {
            $scope.currentCategory = undefined;
            $scope.categoryChildren = false;
            return;
        }
        $scope.showDetailedContent = false;
        $scope.currentCategory = $scope.allCategories.CategoryList.find(function (category) {
            return category.Id === categoryId;
        })
        $scope.currentCategory.Children.forEach(function (children) {
            children.picture = children.Properties.find(function (prop) {
                return prop.PropertyTypeAlias === 'pictures';
            }).DataValue;
        });
        $scope.categoryChildren = true;

        $scope.numberOfchildren = Math.ceil(($scope.currentCategory.Children.length / 4));
    }

    $scope.itemIsInArray = function (indexUi, indexIndicator) {

        var index = $scope.currentCategory.Children.findIndex(function (product) {
            return $scope.activeProduct == product;
        })
        return Math.floor(index / indexIndicator) == indexUi;
    }

    function getAllCategories() {
        $http({ method: 'GET', url: '/Umbraco/Api/DataHandler/GetProductCategories' }).then(function (response) {
            var productCategoriesJson=response.data;
            $scope.allCategories = JSON.parse(JSON.parse(productCategoriesJson));
        })
    }

    $scope.getCategoryId = function (id) { 
        $scope.categoryId = id;
    apiTest();
    }
}]);