(function () {
    'use strict';

var app = angular.module('app', []);

    app.controller('main', ['$scope', '$http', function ($scope, $http) {
        $scope.loadComplete = false;
        $scope.details = {};
        $scope.itemToAdd = {};

        $scope.history = [];

        $scope.getHistory = function () {
            $http.get("http://localhost:64386/api/getHistory").then(function (response) {
                $scope.history = response.data;
                $scope.loadComplete = true;
            });
        }

        $scope.checkInAsset = function () {
            var id = $scope.details.Id;
            $http.post("http://localhost:64386/api/checkInItem/" + id).then(function (response) {
                $scope.getHistory();
            });
        }

        $scope.addItem = function (item) {
            $http.post("http://localhost:64386/api/addItem/", item).then(function (response) {
                $scope.itemToAdd = {};
                $scope.getHistory();
            });
        }

        $scope.clearAddItem = function () {
            $scope.itemToAdd = {};
        }

        $scope.setDetails = function (item) {
            $scope.details.assetTag = item.AssetTag;
            $scope.details.checkedOutBy = item.CheckedOutBy;
            $scope.details.Id = item.ID;
        }

        var init = function () {
            $scope.getHistory();
        }

        init();

    }]);
})();