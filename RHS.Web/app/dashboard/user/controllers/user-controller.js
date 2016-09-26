'use strict';
app.controller('userListController', ['$scope', 'userService', 'toastr','$state',
    function ($scope, userService, toastr, $state) {
        $scope.users = [];

        userService.getAll().then(function (results) {

            $scope.users = results.data;

        }, function (error) {
            console.log(error);
        });

    }]);

app.controller('userNavBarController', ['$scope', '$location', 'authService','$state', function ($scope, $location, authService, $state) {

    console.log(authService);
    $scope.userName = authService.authentication.userName;
    console.log("userName" + $scope.userName);
    $scope.logOut = function () {
        authService.logOut();
        $state.transitionTo('authentication.login');
    }

    //$scope.authentication = authService.authentication;
    //$scope.userName = authService.userName;
    
}]);

app.controller('userEditController', ['$scope', 'userService', '$location', 'toastr', '$stateParams', '$state',
    function ($scope, userService, $location, toastr, $stateParams, $state) {
        console.log($state)
        $scope.edit = true;
        $scope.title = "Edicion tipo de servicio";
        var id = $stateParams.id;

        $scope.schema = {
            type: "object",
            properties: {
                UserName: { type: "string", minLength: 10, title: "Enter your Email" },
                Password: { type: "string", minLength: 10, title: "Password" },
                ConfirmPassword: { type: "string", minLength: 10, title: "Confirm Password" }
            }
        };


        $scope.form = ["*"];

        userService.get(id).then(function (results) {
            $scope.model = results.data;
        },
        function (error) {
            console.log(error);
        });

        $scope.goBack = function () {
            $state.go('dashboard.user');
        };

        $scope.onSubmit = function (form) {
            $scope.$broadcast('myform');
            if (form.$valid) {
                userService.update(id, $scope.model).then(function (results) {
                    if (results.status == 204) {
                        toastr.success("Datos actualizados correctamente", "Correcto", { iconClass: 'toast-pink' });
                        $state.go('dashboard.user');
                    } else {
                        toastr.error("Ha sucedido un error", "Error");
                    }
                }, function (error) {
                    console.log(error);
                });
            }
        }

        $scope.remove = function () {
            console.log("id remove button " + id)
            //debugger;
            userService.delete(id).then(function (results) {
                if (results.status == 200) {
                    toastr.success("Datos eliminados correctamente", "Correcto");
                    $state.go('dashboard.user');
                } else {
                    toastr.error("Ha sucedido un error", "Error");
                }
            }, function (error) {
                console.log(error);
            });
        };

    }]);

app.controller('userCreateController', ['$scope', 'userService', '$location', 'toastr', '$stateParams', '$state',
    function ($scope, userService, $location, toastr, $stateParams, $state) {

        $scope.title = "Creacion de un nuevo tipo de servicio";
        $scope.edit = false;

        $scope.schema = {
            type: "object",
            properties: {
                UserName: { type: "string", minLength: 10, title: "Email" },
                Password: { type: "string", minLength: 10, title: "Password" },
                ConfirmPassword: { type: "string", minLength: 10, title: "Confirm Password" }
            }
        };

        $scope.form = ["*"];

        $scope.model = {};

        $scope.onSubmit = function (form) {
            $scope.$broadcast('myform');
            if (form.$valid) {
                userService.create($scope.model).then(function (results) {
                    if (results.status == 201) {
                        toastr.success("Datos creados correctamente", "Correcto");
                        $state.go('dashboard.user');
                    } else {
                        toastr.error("Ha sucedido un error", "Error");
                    }
                }, function (error) {
                    console.log(error);
                });
            }
        }

        $scope.goBack = function () {
            $state.go('dashboard.user');
        };

    }]);