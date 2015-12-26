var guachincheApp = angular.module('guachincheApp', ['ngRoute','guachincheAppDirectives','guachincheAppController','guachincheServices']);

guachincheApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'views/pages/home.html'
        })
        .when('/new', {
            templateUrl : 'views/pages/new.html'
        })
        .otherwise({
            redirectTo: '/'
        })
    
    $locationProvider.html5Mode(true);
})