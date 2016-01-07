var guachincheServicesModule = angular.module('guachincheServices', []);

guachincheServicesModule.factory('guachincheService', ['$http', function($http) {

    var urlBase = '/api/guachinches';
    var dataFactory = {};

    dataFactory.getGuachinchesList = function () {
        return $http.get(urlBase);
    };

    dataFactory.insertGuachinche = function (data) {
        return $http.post(urlBase, data);
    };
    
    dataFactory.getGuachincheById = function (id) {
        return $http.get(urlBase + '/' + id)
    };

    return dataFactory
}])

guachincheServicesModule.factory('userService', ['$http', function ($http) {

    var dataFactory = {},
    urlBase = '/api/users'
    
    dataFactory.getReleasesById = function (id) {
        return $http.get(urlBase + '/' + id)
    }
    
    dataFactory.deleteReleasesById = function (id) {
        return $http.delete(urlBase + '/release/' + id)
    }
    
    dataFactory.Save = function(userName, userEmail){
        var model = {
            name: userName,
            email: userEmail
        }
        sessionStorage.userService = angular.toJson(model)
    }
    
    dataFactory.Exist = function()
    {
        if (sessionStorage.userService)
            return true
        else
            return false
    }

    dataFactory.Restore = function() {
        return angular.fromJson(sessionStorage.userService)
    }
    
    dataFactory.Delete = function() {
        delete sessionStorage.userService
    }

    return dataFactory;
}])