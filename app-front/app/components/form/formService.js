'use strict';
angular.module('formService', [])
    .factory('cPersons', function($http) {
        return {
            create : function(data) {
                return $http({
                    method: 'POST',
                    url: '/items',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        let str = [];
                        for(let p in obj){
                            if(obj.hasOwnProperty(p)){
                                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                            }
                        }
                        return str.join('&');
                    },
                    data: data
                });
            }
        }
    });