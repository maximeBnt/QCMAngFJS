(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by maximeb on 27/04/15.
 */
module.exports=function() {
    var factory={breweries:{},server:{},questions:{}, questionnaires:{}};
    factory.activeBrewery=undefined;
    factory.breweries.loaded=false;
    factory.breweries.refresh="all";//all|ask
    factory.breweries.update="immediate";//deffered|immediate
    factory.server.privateToken="";
    factory.server.restServerUrl="http://127.0.0.1/rest-QCM/";
    factory.server.force=false;
    return factory;
};
},{}],2:[function(require,module,exports){
module.exports=function($routeProvider, $locationProvider) {
    $routeProvider

        // route for the home page
        /*.when('/home', {
         templateUrl : 'pages/home.html',
         controller  : 'mainController'
         })*/

        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })
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

        .when('/rest', {
            templateUrl : 'pages/rest.html',
            controller  : 'restController'
        })

        .when('/listQuestionnaire', {
            templateUrl : 'pages/listQuestionnaire.html',
            controller  : 'listController'
        })

        .when('/qcm/:id', {
            templateUrl : 'pages/qcmComplet.html',
            controller  : 'qcmControllerCoucou'
        })
        .otherwise({
            redirectTo:'/'
        });
    if(window.history && window.history.pushState){
        $locationProvider.html5Mode(true);
    }
};
},{}],3:[function(require,module,exports){

            ////////////////////
            // Directive QCM  //
            ////////////////////

module.exports = function(qcmFactory) {
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

        }
    }
};

},{}],4:[function(require,module,exports){

            ////////////////////
            //  Factory QCM   //
            ////////////////////

module.exports = function() {
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
};
},{}],5:[function(require,module,exports){
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
},{"./config/configFactory":1,"./config/routes":2,"./qcm/qcmDirective":3,"./qcm/qcmFactory":4,"./services/rest":6,"./testRest":7}],6:[function(require,module,exports){
module.exports=function($http,$resource,$location,restConfig,$sce) {
    var self=this;
    if(angular.isUndefined(this.messages))
        this.messages=new Array();

    this.getParams=function(){
        return '?token='+restConfig.server.privateToken+'&force='+restConfig.server.force;
    }
    this.headers={ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Accept': 'application/json'
    };


        ////////// GET ALL //////////

    this.getAll=function(response,what, param, id){
        if (!isset(param), !isset(id)) {
            var request = $http({
                method: "GET",
                url: restConfig.server.restServerUrl+what+this.getParams(),
                headers: {'Accept': 'application/json'},
                callback: 'JSON_CALLBACK'
            });
        }
        else{
            var request = $http({
                method: "GET",
                url: restConfig.server.restServerUrl+what+"/"+param+"/"+id+this.getParams(),
                headers: {'Accept': 'application/json'},
                callback: 'JSON_CALLBACK'
            });

        }

        request.success(function(data, status, headers, config) {
            response[what]=data;
            restConfig[what].all=data;
            response.load=false;
        }).
            error(function(data, status, headers, config) {
                self.addMessage({type: "danger", content: "Erreur de connexion au serveur, statut de la réponse : "+status});
                console.log("Erreur de connexion au serveur, statut de la réponse : "+status);
            });
    };


        ////////// GET ONE //////////

    this.getOne= function (response, what, id) {
        var request = $http({
            method: "GET",
            url: restConfig.server.restServerUrl+what+"/"+id+this.getParams(),
            headers: {'Accept': 'application/json'},
            callback: 'JSON_CALLBACK'
        });
        request.success(function(data, status, headers, config) {
            response[what]=data;
        }).
            error(function(data, status, headers, config) {
                self.addMessage({type: "danger", content: "Erreur de connexion au serveur, statut de la réponse : "+status});
                console.log("Erreur de connexion au serveur, statut de la réponse : "+status);
            });

    };

    this.post=function(response,what,name,callback){
        if(angular.isUndefined(callback))
            this.clearMessages();
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $http.defaults.headers.post["Accept"] = "application/json";

        var request = $http({
            method: "POST",
            url: restConfig.server.restServerUrl+what+this.getParams(),
            data: response.posted,
            headers: self.headers
        });
        request.success(function(data, status, headers, config) {
            self.addMessage(data.message);
            if(angular.isUndefined(callback)){
                $location.path("/"+what);
            }else{
                callback();
            }
        }).error(function(data, status, headers, config){
            self.addMessage({type: "warning", content:"Erreur de connexion au serveur, statut de la réponse : "+status+"<br>"+data.message});
        });
    };

    this.put=function(id,response,what,name,callback){
        if(angular.isUndefined(callback))
            this.clearMessages();
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $http.defaults.headers.post["Accept"] = "text/plain";
        var request = $http({
            method: "PUT",
            url: restConfig.server.restServerUrl+what+'/'+id+this.getParams(),
            data: response.posted,
            headers: self.headers
        });
        request.success(function(data, status, headers, config) {
            self.addMessage(data.message);
            if(angular.isUndefined(callback)){
                $location.path("/"+what);
            }else{
                callback();
            }
        }).error(function(data, status, headers, config){
            self.addMessage({type: "warning", content: "Erreur de connexion au serveur, statut de la réponse : "+status+"<br>"+data.message});
        });
    };

    this.remove=function(object,what,callback){
        if(angular.isUndefined(callback))
            this.clearMessages();
        var request = $http({
            method: "DELETE",
            url: restConfig.server.restServerUrl+what+'/'+object.id+this.getParams(),
            headers: self.headers
        });
        request.success(function(data, status, headers, config) {
            self.addMessage(data.message);
            if(angular.isDefined(callback)){
                callback();
            }
        }).error(function(data, status, headers, config){
            self.addMessage({type: "warning", content: "Erreur de connexion au serveur, statut de la réponse : "+status+"<br>"+data.message});
        });
    };

    this.addMessage=function(message){
        content=$sce.trustAsHtml(message.content);
        self.messages.push({"type":message.type,"content":content});
    };

    this.clearMessages=function(){
        self.messages.length=0;
    };


    function isset(  ) {
        // http://kevin.vanzonneveld.net
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: FremyCompany
        // +   improved by: Onno Marsman
        // *     example 1: isset( undefined, true);
        // *     returns 1: false
        // *     example 2: isset( 'Kevin van Zonneveld' );
        // *     returns 2: true

        var a=arguments; var l=a.length; var i=0;

        if (l==0) {
            throw new Error('Empty isset');
        }

        while (i!=l) {
            if (typeof(a[i])=='undefined' || a[i]===null) {
                return false;
            } else {
                i++;
            }
        }
        return true;
    }

};
},{}],7:[function(require,module,exports){
/**
 * Created by maximeb on 27/04/15.
 */

    ////////////////////
    //  TEST REST     //
    ////////////////////

module.exports = function($scope, rest, $location) {
    $scope.message = 'This is the REST test page';

    $scope.getUn = {};

    $scope.getTout ={};

    rest.getAll($scope.getTout, "questions");
    rest.getOne($scope.getUn, "questionnaires", 3);


    /*$scope.addToIncluded = function(){
        $scope.selectedIncludedItems=[];
        angular.forEach($scope.selectedDispoItems, function (value) {
            $scope.includedItems.push(value);
            $scope.selectedIncludedItems.push(value);
            $scope.dispoItems.splice($scope.dispoItems.indexOf(value),1);
        });
        $scope.selectedDispoItems=[];
    };*/
};
},{}]},{},[5]);
