angular.module('formService', [])
    .factory('cPersons', function($http) {
        return {
            create : function(data) {
                return $http({
                    method: 'POST',
                    url: '/items',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: data
                });
            }
        }
    });