(function () {
    'use strict';

var app = angular.module('app');

    app.controller('main', ['$scope', '$http', '$timeout', 'apiService', function ($scope, $http, $timeout, apiService) {
        var vm = $scope;

        vm.loadComplete = false;
        vm.details = {};
        vm.archivedDetails = {};
        vm.itemToAdd = {};
        vm.activeFilter = {};
        vm.activeFilterOn = false;
        vm.history = [];

        vm.filterActive = function () {
            if (vm.activeFilterOn === false) {
                vm.activeFilter = { CheckedInDate: null };
                vm.activeFilterOn = true;
                return;
            }

            if (vm.activeFilterOn === true) {
                vm.activeFilter = {};
                vm.activeFilterOn = false;
            }
        }

        $scope.clearAddItem = function () {
            vm.itemToAdd = {};
        }

        vm.focusInput = function () {
            $('#addItemModal').on('shown.bs.modal', function () {
                $("#assetIdentifier").focus();
            })
        }

        vm.getHistory = function () {
            apiService.getHistory().then(function (response) {
                vm.history = response.data;
            });
        }

        vm.addItem = function (item) {
            apiService.addItem(item).then(function (response) {
                vm.itemToAdd = {};
                vm.getHistory();
            });
        }

        vm.removeItem = function () {
            var id = $scope.details.Id;
            apiService.removeItem(id).then(function (response) {
                vm.getHistory();
            });
        }

        vm.checkInAsset = function () {
            var id = $scope.details.Id;
            apiService.checkInItem(id).then(function (response) {
                vm.getHistory();
            });
        }

        vm.setDetails = function (item) {
            vm.editEnabled = false;
            vm.details.assetTag = item.AssetTag;
            vm.details.checkedOutBy = item.CheckedOutBy;
            vm.details.checkedOutDate = item.CheckedOutDate;
            vm.details.checkedInDate = item.CheckedInDate;
            vm.details.Id = item.ID;
        }

        var init = function () {

            apiService.getHistory().then(function (response) {
                vm.history = response.data;
                vm.loadComplete = true;
            });
        }

        vm.editDetails = function () {
            vm.archivedDetails = angular.copy(vm.details);
            vm.editEnabled = true;
        }

        vm.cancelEdit = function () {
            vm.details = vm.archivedDetails;
            vm.editEnabled = false;
        }

        vm.allowSubmission = function (item) {
            if (item != null) {
                if (item.assetTag == null || item.assetTag == "") {
                    return false;
                }
                if (item.checkedOutBy == null || item.checkedOutBy == "") {
                    return false;
                }

                else return true;
            }
        }

        vm.saveDetails = function () {
            var item = vm.details;
            apiService.updateItem(item).then(function (response) {
                if (response.status === 200) {
                    vm.saveFailed = false;
                    vm.setDetails(response.data);
                    vm.getHistory();
                    vm.editEnabled = false;
                }

                if (response.status === 400) {
                    vm.saveFailed = true;
                    vm.saveErrorMessage = response.data.Message;
                }
            });
        }

        init();

    }]);
})();