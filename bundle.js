(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=function($routeProvider, $locationProvider) {
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
};
},{}],2:[function(require,module,exports){
// script.js

var scotchApp = angular.module('scotchApp', ['ngRoute']);

scotchApp.config(['$routeProvider', '$locationProvider', require("./config/routes")]);

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

                ////////////////////
                // Directive QUIZ //
                ////////////////////

    scotchApp.directive('quiz', function(qcmFactory) {
        return {
            restrict: 'AE',
            scope: {},
            templateUrl: 'pages/qcm.html',
            link: function (scope, elem, attrs) {
                scope.start = function () {
                    scope.id = 0; // id de la question
                    scope.fini = false;
                    scope.inProgress = true;
                    scope.getQuestion();
                };

                scope.reset = function () {
                    scope.inProgress = false;
                    scope.score = 0;
                    scope.manque = 0;
                    scope.total = 0;

                }

                scope.getQuestion = function () {
                    var q = qcmFactory.getQuestion(scope.id);
                    if (q) {
                        scope.question = q.question;
                        scope.options = q.options;
                        scope.answer = q.answer;
                        scope.answerMode = true;
                    } else {
                        scope.fini = true;
                    }
                };

                scope.checkAnswer = function () {

                    var ans = scope.radio.id;
                    console.log("choisie : " + ans);
                    console.log("bonne rep : " + scope.answer);

                    if (ans == scope.answer) {
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

                scope.nextQuestion = function () {
                    scope.id++;
                    scope.getQuestion();
                    scope.radio.id = ''; // remise à zéro du scope pour la déselection du btn radio à la question suivante
                }

                scope.reset();
            },
            controller: function ($scope) {
                // permet de récupérer les coordonnées de la réponse choisie
                $scope.radio = {
                    id: ''
                };
                $scope.uncheck = function (event) {
                    if ($scope.radio.id == event.target.value)
                        $scope.radio.id = false
                };

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


},{"./config/routes":1}]},{},[2]);
