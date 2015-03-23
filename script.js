// script.js

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider

        // route for the home page
        /*.when('/home', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })*/

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        })
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })
        .otherwise({
            redirectTo:'/'
        });
    if(window.history && window.history.pushState){
        $locationProvider.html5Mode(true);
    }
}]);

                ////////////////////
                // MAINCONTROLLER //
                ////////////////////

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope) {
});


                ////////////////////
                // QCMCONTROLLER  //
                ////////////////////

    scotchApp.controller('qcmController', function($scope){
    });

// create a message to display in our view
    scotchApp.directive('quiz', function(qcmFactory) {
        return {
            restrict: 'AE',
            scope: {},
            templateUrl: 'pages/test.html',
            link: function(scope, elem, attrs) {
                scope.start = function() {
                    scope.id = 0; // id de la question
                    scope.fini = false;
                    scope.inProgress = true;
                    scope.getQuestion();
                };

                scope.reset = function() {
                    scope.inProgress = false;
                    scope.score = 0;
                    scope.manque = 0;
                    scope.total = 0;

                }

                scope.getQuestion = function() {
                    var q = qcmFactory.getQuestion(scope.id);
                    if(q) {
                        scope.question = q.question;
                        scope.options = q.options;
                        scope.answer = q.answer;
                        scope.answerMode = true;
                    } else {
                        scope.fini = true;
                    }
                };

                scope.checkAnswer = function() {

                    // if(!$('input[name=answer]:checked').length) return;// ne fait rien si on a pas choisi de question

                    // var ans = $('input[name=answer]:checked').val(); // recup la reponse selectionnee


                    var ans = scope.answer;
                    console.log(ans);

                    if(ans == scope.options[scope.answer]) {
                        scope.score++;
                        scope.total++;
                        scope.correctAns = true;
                    } else {
                        scope.correctAns = false;
                        scope.manque++;
                        scope.total++;
                    }

                    scope.answerMode = false;
                };

                scope.nextQuestion = function() {
                    scope.id++;
                    scope.getQuestion();
                }

                scope.reset();
            }
        }
    });

    scotchApp.factory('qcmFactory', function() {
        var questions = [
            {
                question: "La bonne réponse c'est la 3",
                options: ["Un", "deux", "trois", "quatre"],
                answer: 2
            },
            {
                question: "La bonne réponse c'est la 1",
                options: ["Usxn", "desxux", "troisxs", "quaxxstre"],
                answer: 0
            },
            {
                question: "La bonne réponse c'est la 4",
                options: ["Unsx", "deusxx", "troisxs", "qdezuatre"],
                answer: 3
            },
            {
                question: "La bonne réponse c'est la 1",
                options: ["Uezn", "deezux", "trezois", "quaeztre"],
                answer: 0
            },
            {
                question: "La bonne réponse c'est la 2",
                options: ["Udzn", "deezux", "trodzis", "quezatre"],
                answer: 1
            }
        ];

        return {
            getQuestion: function(id) {
                if(id < questions.length) {
                    return questions[id];
                } else {
                    return false;
                }
            }
        };
    });



scotchApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

