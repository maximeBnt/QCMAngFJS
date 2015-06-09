// script.js


var scotchApp = angular.module('scotchApp', ['ngRoute', 'ngResource']);

// Config
scotchApp.config(['$routeProvider', '$locationProvider', require("./config/routes")]);
scotchApp.factory("restConfig", require("./config/configFactory"));

scotchApp.controller('mainController', function($scope) {});



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

    /*
    // <<NF>>
    // Récupère les réponses, questions et questionnaires
    $scope.data = {};
    $scope.data.questionnaires = {};
    rest.getAll($scope.data, "questionnaires");
    $scope.data.questionnaires.questions = {};
    rest.getAll($scope.data, "questions", "QuestionByQuestionnaire", $scope.idQuestionnaire, function(questions){
        for(index in questions){
            rest.getAll($scope.data.questions.reponses, "reponses", "ReponseByQuestion", questions[index].id)
        }
    }, "questions");*/


});

scotchApp.controller('qcmController', function($scope, rest, $routeParams) {

    $scope.idQuestionnaire = $routeParams.id; // on a passé l'id d'un questionnaire en param
    $scope.message = 'Questionnaire n°' + $scope.idQuestionnaire;

    // liste les questions d'un questionnaire passé en paramètre
    $scope.tabQuestions = {};
    rest.getAll($scope.tabQuestions, "questions", "QuestionByQuestionnaire", $scope.idQuestionnaire);


    // liste les réponses d'une question passée en paramètre
    $scope.tabReponses = {};
    rest.getAll($scope.tabReponses, "reponses", "ReponseByQuestion", 169);




    // essaie avec "reponseByQuestionnaire"
    /*
    $scope.tabQCM = {};
    rest.getAll($scope.tabQCM, "reponses", "ReponseByQuestionnaire", $scope.idQuestionnaire);

    angular.forEach($scope.tabQuestions, function(question){
        question.coucou = "coucou";
    });
    */

    /*for(var i=0; i<$scope.tabQuestions.length; i++ ){
        $scope.message = $scope.message + $scope.tabQuestions.length;
    }*/






    // <<NF>>
    // injection des questions dans le factory QCM
    /*$scope.getQuestion = function () {

        var q = qcmFactory.getQuestion($scope.id);
        if (q) {
            scope.question = $scope.tabQuestions.questions.libelle;
            scope.options = q.options;
            scope.answer = q.answer;
            scope.answerMode = true;
        } else {
            scope.fini = true;
        }
    };*/


    // ça marche pour l'id 69

    //je veux parcourir ça : $scope.tabQuestions
    // et pour chaque question faire ça : rest.getAll($scope.tabReponses, "reponses", "ReponseByQuestion", $idQuestion);




    /*var log = [];
tabQuestionsr.forEach($questionbRepons    rest.getAll($scope.tabReponses, "reponses", "ReponseByQuestion", $idQuestion{
      s.sh(reponses);
    }, log);*/

    // essaie de foreach pour récupérer les réponses
    // des quesnt

    //angular.forEach()

});