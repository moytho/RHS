var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angular-confirm', 'ngAnimate', 'toastr', 'LocalStorageModule', 'angular-loading-bar', 'schemaForm']);

app.config(function ($stateProvider, $urlRouterProvider) {
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
        .state('dashboard.main', {
            url: '/main',
            templateUrl: 'app/dashboard/main/views/main.html',
            controller: 'mainController'

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
        .state('dashboard.service-type-edit', {
            url: '/service-type-edit/:id',
            templateUrl: 'app/dashboard/shared-views/form-view.html',
            controller: 'serviceTypeEditController'

        })
        .state('dashboard.service-type-create', {
            url: '/service-type-create',
            templateUrl: 'app/dashboard/shared-views/form-view.html',
            controller: 'serviceTypeCreateController'

        }).state('dashboard.user', {
            url: '/user',
            templateUrl: 'app/dashboard/services/views/service-type-list.html',
            controller: 'userListController'

        })
        .state('dashboard.user-edit', {
            url: '/user-edit/:id',
            templateUrl: 'app/dashboard/shared-views/form-view.html',
            controller: 'userEditController'

        })
        .state('dashboard.user-create', {
            url: '/user-create',
            templateUrl: 'app/dashboard/shared-views/form-view.html',
            controller: 'userCreateController'

        })
        .state('authentication', {
            url: '/authentication',
            templateUrl: 'app/authentication/signin.html'
        })
        .state('authentication.login', {
            url: '/login',
            templateUrl: 'app/authentication/login.html',
            controller: 'loginController'
            
        });
    $urlRouterProvider.otherwise('authentication.login');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(function ($rootScope, $state, $location, authService) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        let loggedIn = authService.authentication.isAuth;
        if (toState.name !== 'authentication.login' && !loggedIn) {
            //$state.transitionTo('authentication.login');
            $location.path('/authentication/login');
        }
    });
});

app.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body',
        allowHtml: false,
        closeButton: false,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 1000,
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning',
            pink: 'toast-pink'
        },
        messageClass: 'toast-message',
        onHidden: null,
        onShown: null,
        onTap: null,
        progressBar: true,
        tapToDismiss: true,
        templates: {
            toast: 'directives/toast/toast.html',
            progressbar: 'directives/progressbar/progressbar.html'
        },
        timeOut: 5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
    });
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

app.controller('SigninController', [function () {
    console.log("LoginController controller")
}]);