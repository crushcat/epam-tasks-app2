'use strict';
angular.module('listController', [])

.controller('pListController', function($rootScope, $scope, $http, persons) {

    // GET =====================================================================
    persons.get()
        .success(function(data) {
            $scope.persons = data;
        });

    $scope.$on('created', function(event, msg) {
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

    $scope.editPerson = function(person) {
        $rootScope.$broadcast('edit',person);
    }; 
});