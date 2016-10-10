'use strict';
angular.module('formController', [])
.controller('pFormController', function($rootScope, $scope, $http, cPersons) {
    // create =====================================================================
    $scope.createPerson = function() {
        //console.log('Ccreatin - '+$scope.formData.name)
        cPersons.create($scope.formData)
            .success(function() {
                $scope.formData = {};
                $rootScope.$broadcast('created');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

     $scope.$on('edit', function(event, person) {
        $scope.formData = person;
    });
});