var guachincheApp = angular.module('guachincheApp', ['ngRoute','guachincheAppDirectives','guachincheAppController','guachincheServices']);

guachincheApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'views/pages/home.html'
        })
        .otherwise({
            redirectTo: '/'
        })
    
    $locationProvider.html5Mode(true);
})