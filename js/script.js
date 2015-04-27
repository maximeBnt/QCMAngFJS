// script.js


var scotchApp = angular.module('scotchApp', ['ngRoute']);

// Routing
scotchApp.config(['$routeProvider', '$locationProvider', require("./config/routes")]);

scotchApp.controller('mainController', function($scope) {});
scotchApp.controller('qcmController', function($scope){});


// appel de la directive et du factory contenant les fonctions
// relatives au qcm et les données (questions & réponses)

scotchApp.directive('quiz', require("./qcm/qcmDirective"));
scotchApp.factory('qcmFactory', require("./qcm/qcmFactory"));


scotchApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

