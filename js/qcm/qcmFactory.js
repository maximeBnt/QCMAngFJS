
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