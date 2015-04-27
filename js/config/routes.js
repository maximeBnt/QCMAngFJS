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
            controller  : 'mainController'
        })
        .otherwise({
            redirectTo:'/'
        });
    if(window.history && window.history.pushState){
        $locationProvider.html5Mode(true);
    }
};