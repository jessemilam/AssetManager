(function () {
    'use strict';

    var app = angular.module('app');

    app.service('apiService', function ($http, $q) {
        var baseUrl = "http://localhost:64386/api/"

        this.getHistory = function () {
            return $http.get(baseUrl + "getHistory").then(function (response) {
                return response;
            }, function (error) {
                return error;
            });
        }

        this.addItem = function (item) {
            return $http.post(baseUrl + "addItem/", item).then(function (response) {
                return response;
            }, function (error) {
                return error;
            });
        }

        this.removeItem = function (id) {
            return $http.post(baseUrl + "removeItem/" + id).then(function (response) {
                return response;
            }, function (error) {
                return error;
            });
        }

        this.checkInItem = function (id) {
            return $http.post(baseUrl + "checkInItem/" + id).then(function (response) {
                return response;
            }, function (error) {
                return error;
            });
        }

        this.updateItem = function (item) {
            return $http.post(baseUrl + "updateItem/", item).then(function (response) {
                return response;
            }, function (error) {
                return error;
            });
        }
    })
})();