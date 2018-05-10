(function () {
    'use strict';

var app = angular.module('app', []);

    app.controller('main', ['$scope', '$http', function ($scope, $http) {
        $scope.loadComplete = false;

        $scope.history = [];

        $scope.getHistory = function () {
            $http.get("http://localhost:64386/api/getHistory").then(function (response) {
                $scope.history = response.data;
                $scope.loadComplete = true;
            });
        }

        $scope.checkInAsset = function() {

        }

        var init = function () {
            $scope.getHistory();
        }

        init();

    }]);
})();