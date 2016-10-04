// public/core.js
var personList = angular.module('personList', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all persons and show them
    $http.get('/items')
        .success(function(data) {
            $scope.persons = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createPerson = function() {
        $http.post('/items', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.persons = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deletePerson = function(id) {
        console.log('going to delete id= '+ id);
        $http.delete('/items?id=' + id)
            .success(function(data) {
                $scope.persons = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}