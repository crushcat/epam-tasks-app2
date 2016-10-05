angular.module('listController', [])

    .controller('pListController', function($scope, $http, persons) {

        // GET =====================================================================
        persons.get()
            .success(function(data) {
                $scope.persons = data;
            });
            
        // DELETE ==================================================================
        $scope.deletePerson = function(id) {
            persons.delete(id)
                .success(function(data) {
                    $scope.persons = data;
                });
                
        };
    });

