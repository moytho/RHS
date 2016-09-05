'use strict';
app.controller('serviceListController', ['$scope', 'serviceService', 'toastr',
    function ($scope, serviceService, toastr) {

        $scope.services = [];
        serviceService.getServicess().then(function (results) {

            $scope.services = results.data;

        }, function (error) {
            console.log(error);
        });
        //Cerrar loading splash
        //$window.loading_screen.finish();
    }]);

app.controller('serviceEditController', ['$scope', 'serviceService', '$routeParams', '$location', 'toastr',
    function ($scope, serviceService, $routeParams, $location, toastr) {
        $scope.editar = true;
        var id = $routeParams.id;

        $scope.service = {};

        serviceService.get(id).then(function (results) {
            $scope.service = results.data;
        },
            function (error) {
                console.log(error);
            });

        $scope.goBack = function () {
            $location.path('/service');
        };

        $scope.update = function () {
            serviceService.update(id, $scope.service).then(function (results) {
                if (results.status == 204) {
                    toastr.success("Datos actualizados correctamente", "Correcto");
                    $location.path('/service');
                } else {
                    toastr.error("Ha sucedido un error", "Error");
                }

            }, function (error) {
                console.log(error);
            });
        };

        $scope.delete = function () {

            serviceService.delete(id).then(function (results) {
                if (results.status == 200) {
                    toastr.success("Datos eliminados correctamente", "Correcto");
                    $location.path('/service');
                } else {
                    toastr.error("Ha sucedido un error", "Error");
                }
            }, function (error) {
                console.log(error);
            });
        };

    }]);

app.controller('serviceCreate', ['$scope', 'serviceService', '$routeParams', '$location', 'toastr', function ($scope, serviceService, $routeParams, $location, toastr) {
    $scope.editar = false;
    $scope.service = {};

    $scope.create = function () {
        serviceService.create($scope.service).then(function (results) {
            if (results.status == 201) {
                toastr.success("Datos creados correctamente", "Correcto");
                $location.path('/service');
            } else {
                toastr.error("Ha sucedido un error", "Error");
            }
        }, function (error) {
            console.log(error);
        });
    };

    $scope.goBack = function () {
        $location.path('/service');
    };

}]);