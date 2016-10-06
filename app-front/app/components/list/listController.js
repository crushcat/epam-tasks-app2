angular.module('listController', [])

    .controller('pListController', function($scope, $http, persons) {

        // GET =====================================================================
        persons.get()
            .success(function(data) {
                $scope.persons = data;
            });
        $scope.getAll = function(){
            persons.get()
            .success(function(data) {
                $scope.persons = data;
            });
        };
        $scope.$on('created', function(event, msg){
            persons.get()
            .success(function(data) {
                $scope.persons = data;
            });
        });
        // DELETE ==================================================================
        $scope.deletePerson = function(id) {
            //console.log('pDelete- '+id);
            persons.delete(id)
                .success(function(data) {
                    $scope.persons = data;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
                
        };


    });