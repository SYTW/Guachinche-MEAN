var directiveModule = angular.module('guachincheAppDirectives', []);

directiveModule.directive('guachincheItem', function() {
    return {
        restrict: 'E',
        templateUrl: "views/partials/list-item.html"
    }
})

directiveModule.directive('guachincheView', function() {
    return {
        restrict: 'E',
        templateUrl: "views/partials/view.html"
    }
})

directiveModule.directive('formAddGuachinche', function() {
    return {
        restrict: 'E',
        templateUrl: "views/partials/form.html"
    }
})

directiveModule.directive('guachincheDetail', function() {
    return {
        restrict: 'E',
        templateUrl: "views/partials/preview.html"
    }
})