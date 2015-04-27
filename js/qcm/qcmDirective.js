
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