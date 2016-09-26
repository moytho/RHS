'use strict';
app.controller('loginController', ['$scope', '$location', 'authService', 'CONFIG','$state', function ($scope, $location, authService, CONFIG,$state) {

    $scope.configuracion = CONFIG;

    //if (authService.authentication.isAuth) window.location.href = CONFIG.HOME_URL;
    console.log(authService);
    $scope.loginData = {
        UserName: "",
        Password: ""
    };

    $scope.message = "";

    $scope.login = function () {
        $scope.message = '';
        console.log($scope.loginData);
        authService.login($scope.loginData).then(function (response) {
            
            console.log(authService.authentication);
            $state.transitionTo('dashboard');
        },
         function (err) {
             console.log(err);
             //$scope.message = err.error_description;
         });
    };

}]);