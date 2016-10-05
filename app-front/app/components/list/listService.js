angular.module('listService', [])
    .factory('persons', function($http) {
        return {
            get : function() {
                return $http.get('/items');
            },
            delete : function(id) {
                return $http.delete('/items' + id);
            }
        }
    });