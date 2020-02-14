'use strict';

angular.module('appRoutes', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/list', { 
        templateUrl: 'views/list.html',
        controller: 'displayCtrl',
        controllerAs: 'dc'
      })
      .when('/reservations', {
        templateUrl: 'views/reservations.html',
        controller: 'reservationCtrl',
        controllerAs: 'rc'
      })
      .otherwise({ redirectTo: '/list' });
  }]);