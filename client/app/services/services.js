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