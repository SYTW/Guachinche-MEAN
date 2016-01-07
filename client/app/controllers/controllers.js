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

controllerModule.controller('createNewGuachincheController', function ($location,$scope,guachincheService,userService) {
    
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
            mailPublisher: userService.Restore().email
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

controllerModule.controller('LoginCtrl', function($scope,  $location, $auth, userService) {
    
    $scope.authenticate = function() {
        $auth.authenticate('google')
        .then(function(response) {
            console.log("mail: " + response.data.email)
            userService.Save(response.data.name,response.data.email)
            $location.path('/')
        })
        .catch(function(response) {
        })
    }
    
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated()
    }

})

controllerModule.controller('LogOut', function($scope, $auth, $location, userService,$timeout) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
    .then(function() {
        console.log("Logout correct")
        $scope.userName = userService.Restore().name
        userService.Delete()
        $timeout(function() {
            $location.path('/')
        }, 5000)
    })
})

controllerModule.controller('UserProfille', function($scope,userService,$location) {
    if (userService.Exist())
    {
        $scope.userMail = userService.Restore().email
        $scope.userName = userService.Restore().name
    }
    
    $scope.releases = function() {
        userService.getReleasesById($scope.userMail)
        .success(function (data) {
            $scope.releases = data
        }).
        error(function(error) {
            console.log("Status error: " + error.message)
        })
    }
    
    $scope.deleteRelease = function(id) {
        console.log("Id to delete: " + $scope.releases[id]._id)
        userService.deleteReleasesById($scope.releases[id]._id)
        .success(function (data) {
            console.log("Message: " + data.message)
            $scope.releases.splice(id, 1);
        }).
        error(function(error) {
            console.log("Status error: " + error.message)
        })
    }
    
    $scope.formatDate = function(date) {
        var date = new Date(date)
        return date.getDate() + "-" + 
               (date.getMonth() + 1) + "-" + 
               date.getFullYear()
    }
})