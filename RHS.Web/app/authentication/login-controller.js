'use strict';
app.controller('loginController', ['$scope', '$location', 'authService', 'CONFIG','$state', function ($scope, $location, authService, CONFIG,$state) {

    $scope.configuracion = CONFIG;
    $scope.messageError = "";

    //if (authService.authentication.isAuth) window.location.href = CONFIG.HOME_URL;
    console.log(authService);
    $scope.loginData = {
        UserName: "",
        Password: ""
    };

    

    $scope.login = function () {
        $scope.messageError = '';
        console.log($scope.loginData);
        authService.login($scope.loginData).then(function (response) {
            console.log(authService.authentication);
            //$state.transitionTo('dashboard');
            $location.path('/dashboard/main')
        },
         function (err) {
             console.log(err);
             $scope.messageError = err.error_description;
         });
    };

}]);