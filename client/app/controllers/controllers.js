var controllerModule = angular.module('guachincheAppController', [])

controllerModule.controller('listGuachincheController', function ($scope,guachincheService, $location) {
    
    $scope.load = function()
    {
        $scope.view = false
        guachincheService.getGuachinchesList()
        .success(function (data) {
            console.log("Status Get Service: OK")
            $scope.guachinches = data
        }).
        error(function(error) {
            console.log("Status Get Service: ERROR")
        });
    }
        
    $scope.viewGuachinche = function(id)
    {
        guachincheService.getGuachincheById(id)
        .success(function (data) {
            $scope.view = true
            $scope.guachinche = data
        }).
        error(function(error) {
            console.log("Status Get by ID Service: ERROR")
        })
    }
})

controllerModule.controller('createNewGuachincheController', function ($location,$scope,guachincheService) {
    
    $scope.municipios = { "name": [
        "Tacoronte", 
        "El Sauzal",
        "La Matanza",
        "La Victoria",
        "Santa Úrsula",
        "San Cristóbal de La Laguna",
        "La Orotava",
        "Santa Cruz de Tenerife"]}
    
    $scope.insertGuachinche = function () {
        
        var dataGuachinche = {
            name: $scope.name,
            direction: $scope.direction,
            city: $scope.city,
            description: $scope.description,
        }
        
        guachincheService.insertGuachinche(dataGuachinche)
            .success(function (data) {
                console.log("Status Post Service: OK")
                $scope.screen = true
                $scope.message = data.message
            }).
            error(function(error) {
                console.log("Status Post Service: ERROR")
                $scope.screen = true
                $scope.message = error.message
            });
    }
})

controllerModule.controller('LoginCtrl', function($scope,  $location, $auth) {
    
    $scope.authenticate = function() {
        $auth.authenticate('google')
        .then(function(response) {
            $location.path('/')
        })
        .catch(function(response) {
        })
    }
    
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated()
    }

})

controllerModule.controller('LogOut', function($auth, $location) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
    .then(function() {
        console.log("Logout correct")
        $location.path('/')
    })
})