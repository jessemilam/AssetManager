(function () {
    'use strict';

var app = angular.module('app', []);

    app.controller('main', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
        $scope.loadComplete = false;
        $scope.details = {};
        $scope.itemToAdd = {};
        $scope.activeFilter = {};
        $scope.activeFilterOn = false;
        $scope.filterClass = 'btn btn-outline-primary';
        $scope.filterBtn = "Show Active Only";
        $scope.history = [];
        $scope.items = ['settings', 'home', 'options', 'other'];
        $scope.selection = $scope.items[0];


        $scope.filterActive = function () {
            if ($scope.activeFilterOn === false) {
                $scope.activeFilter = { CheckedInDate: null };
                //$scope.filterClass = 'btn btn-primary';
                $scope.activeFilterOn = true;
                $scope.filterBtn = "Show Active Only (enabled)";
                return;
            }

            if ($scope.activeFilterOn === true) {
                $scope.activeFilter = {};
                //$scope.filterClass = 'btn btn-outline-primary';
                $scope.activeFilterOn = false;
                $scope.filterBtn = "Show Active Only";
            }
        }

        $scope.clearAddItem = function () {
            $scope.itemToAdd = {};
        }

        $scope.focusInput = function () {
            //var target = document.getElementById('assetIdentifier')
            //target.focus();

            $('#addItemModal').on('shown.bs.modal', function () {
                $("#assetIdentifier").focus();
            })
        }

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

        $scope.removeItem = function (item) {
            var id = $scope.details.Id;
            $http.post("http://localhost:64386/api/removeItem/" + id).then(function (response) {
                $scope.getHistory();
            });
        }

        $scope.clearAddItem = function () {
            $scope.itemToAdd = {};
        }

        $scope.setDetails = function (item) {
            $scope.details.assetTag = item.AssetTag;
            $scope.details.checkedOutBy = item.CheckedOutBy;
            $scope.details.checkedInDate = item.CheckedInDate;
            $scope.details.Id = item.ID;
        }

        var init = function () {
            $timeout(function () {
                $scope.getHistory();
            }, 0);
        }

        init();

    }]);
})();