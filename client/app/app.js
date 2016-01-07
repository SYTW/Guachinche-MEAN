var guachincheApp = angular.module('guachincheApp', ['ngRoute','guachincheAppDirectives','guachincheAppController','guachincheServices','satellizer']);

guachincheApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'views/pages/home.html'
        })
        .when('/view', {
            templateUrl : 'views/pages/view.html'
        })
        .when('/new', {
            templateUrl : 'views/pages/new.html',
            resolve : {
                message: function($location, $auth) 
                {   
                    if(!$auth.isAuthenticated())
                        $location.path('/')
                }
            }
            
        })
        .when('/signin', {
            templateUrl : 'views/pages/signin.html'
        })
        .when('/profile', {
            templateUrl: 'views/pages/profile.html',
            resolve : {
                message: function($location, $auth) 
                {   
                    if(!$auth.isAuthenticated())
                        $location.path('/')
                }
            }
        })
        .when('/logout', {
            templateUrl : 'views/pages/logout.html',
            controller : 'LogOut',
            resolve : {
                message: function($location, $auth) 
                {   
                    if(!$auth.isAuthenticated())
                        $location.path('/')
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        })
    
    $locationProvider.html5Mode(true);
})


//Configuración autenticación
guachincheApp.config(function($authProvider) {
    $authProvider.google({
        clientId: '226396544316-l90gqg00775gnbqhdqu0d9brg0srkeph.apps.googleusercontent.com',
        url: '/api/auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: 'https://proyecto-stw-davidcr.c9users.io',
        scope: ['profile', 'email'],
        scopePrefix: 'openid',
        scopeDelimiter: ' ',
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        display: 'popup',
        type: '2.0',
        popupOptions: { width: 452, height: 533 }
    })
    
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'guachincheapp';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';
    
})