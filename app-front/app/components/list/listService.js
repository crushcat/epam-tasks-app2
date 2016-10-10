'use strict'
angular.module('listService', [])
    .factory('persons', function($http) {
        return {
            get : function() {
                return $http.get('/items');
            },
            delete : function(id) {
                //console.log('cDelete- '+id);
                return $http.delete('/items?id=' + id);
            }
        }
    });