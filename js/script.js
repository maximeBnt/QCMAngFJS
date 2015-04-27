// script.js


var scotchApp = angular.module('scotchApp', ['ngRoute', 'ngResource']);

// Config
scotchApp.config(['$routeProvider', '$locationProvider', require("./config/routes")]);
scotchApp.factory("restConfig", require("./config/configFactory"));

scotchApp.controller('mainController', function($scope) {});
scotchApp.controller('qcmController', function($scope){});



// appel de la directive et du factory contenant les fonctions
// relatives au qcm et les données (questions & réponses)

scotchApp.directive('quiz', require("./qcm/qcmDirective"));
scotchApp.factory('qcmFactory', require("./qcm/qcmFactory"));

scotchApp.service('rest', ["$http","$resource", "$location", "restConfig", "$sce", require("./services/rest")]);



scotchApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

scotchApp.controller('restController', ["$scope", "rest", "$location", require("./testRest")]);