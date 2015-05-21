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


scotchApp.controller('listController', function($scope, rest) {
    $scope.message = 'Questionnaires disponibles :';
    $scope.tableQuestionnaires ={};

    // liste les questionnaires
    rest.getAll($scope.tableQuestionnaires, "questionnaires");
});

scotchApp.controller('qcmControllerCoucou', function($scope, rest, $routeParams) {
    $scope.message = 'Coucou';

    $scope.id = $routeParams.id;

    // liste les questions d'un questionnaire passé en paramètre
    $scope.tabQuestions = {};
    rest.getAll($scope.tabQuestions, "questions", "QuestionByQuestionnaire", 159);



    // injection des questions dans le factory QCM (en test)
    $scope.getQuestion = function () {

        var q = qcmFactory.getQuestion($scope.id);
        if (q) {
            scope.question = $scope.tabQuestions.questions.libelle;
            scope.options = q.options;
            scope.answer = q.answer;
            scope.answerMode = true;
        } else {
            scope.fini = true;
        }
    };

    // liste les réponses d'une question passée en paramètre
    $scope.tabReponses = {};
    rest.getAll($scope.tabReponses, "reponses", "ReponseByQuestion", 169);
    // ça marche pour l'id 69

    // essaie de foreach pour récupérer les réponses
    // des questions chargées précédemment

    //angular.forEach()

});