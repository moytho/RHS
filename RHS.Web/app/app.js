var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angular-confirm', 'ngAnimate', 'toastr', 'LocalStorageModule', 'angular-loading-bar']);

app.config(function ($stateProvider, $urlRouterProvider) {
    //debugger;
    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'app/dashboard/home.html',
            controller: 'HomeController'
        })
        .state('dashboard.profile', {
            url: '/profile',
            templateUrl: 'app/dashboard/profile.html',
            controller: 'ProfileController'
            
        })
        .state('dashboard.account', {
            url: '/account',
            templateUrl: 'app/dashboard/account.html',
            controller: 'AccountController'
        })
        .state('dashboard.service-type', {
            url: '/service-type',
            templateUrl: 'app/dashboard/services/views/service-type-list.html',
            controller: 'serviceTypeListController'

        })
        .state('signin', {
            url: '/signin',
            templateUrl: 'app/signin/signin.html',
            controller: 'SigninController'
        })
        .state('signin.login', {
            url: '/login',
            templateUrl: 'app/signin/login.html',
            controller: 'LoginController'
            
        });
    $urlRouterProvider.otherwise('/dashboard');
});

app.controller('ProfileController', [ function () {
    console.log("profile controller")
}]);

app.controller('AccountController', [function () {
    console.log("AccountController controller")
}]);

app.controller('HomeController', [function () {
    console.log("HomeController controller")
}]);

app.controller('LoginController', [function () {
    console.log("LoginController controller")
}]);

app.controller('SigninController', [function () {
    console.log("LoginController controller")
}]);