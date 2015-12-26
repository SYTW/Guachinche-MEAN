var controllerModule = angular.module('guachincheAppController', [])

controllerModule.controller('listGuachincheController', function ($scope,guachincheService, $location) {
    
    $scope.load = function()
    {
        $scope.view = false
        guachincheService.getGuachinchesList()
        .success(function (data) {
            console.log("Status: OK")
            $scope.guachinches = data
        }).
        error(function(error) {
            console.log("Status: ERROR")
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
            console.log("Status: ERROR")
        })
    }
    
})
