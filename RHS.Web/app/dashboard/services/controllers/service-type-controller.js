'use strict';
app.controller('serviceTypeListController', ['$scope', 'serviceTypeService', 'toastr',
    function ($scope, serviceTypeService, toastr) {

        $scope.serviceTypes = [];
        serviceTypeService.getAll().then(function (results) {

            $scope.serviceTypes = results.data;

        }, function (error) {
            console.log(error);
        });
        //Cerrar loading splash
        //$window.loading_screen.finish();
    }]);

app.controller('serviceTypeEditController', ['$scope', 'serviceTypeService', '$routeParams', '$location', 'toastr',
    function ($scope, serviceTypeService, $routeParams, $location, toastr) {
        $scope.editar = true;
        var id = $routeParams.id;

        $scope.serviceTypes = {};

        serviceTypesService.get(id).then(function (results) {
            $scope.serviceType = results.data;
        },
            function (error) {
                console.log(error);
            });

        $scope.goBack = function () {
            $location.path('/service-type');
        };

        $scope.update = function () {
            serviceTypeService.update(id, $scope.serviceType).then(function (results) {
                if (results.status == 204) {
                    toastr.success("Datos actualizados correctamente", "Correcto");
                    $location.path('/service-type');
                } else {
                    toastr.error("Ha sucedido un error", "Error");
                }

            }, function (error) {
                console.log(error);
            });
        };

        $scope.delete = function () {

            serviceTypeService.delete(id).then(function (results) {
                if (results.status == 200) {
                    toastr.success("Datos eliminados correctamente", "Correcto");
                    $location.path('/service-type');
                } else {
                    toastr.error("Ha sucedido un error", "Error");
                }
            }, function (error) {
                console.log(error);
            });
        };

    }]);

app.controller('serviceTypeCreate', ['$scope', 'serviceTypeService', '$routeParams', '$location', 'toastr',
    function ($scope, serviceTypeService, $routeParams, $location, toastr) {
    $scope.editar = false;
    $scope.serviceType = {};

    $scope.create = function () {
        serviceTypeService.create($scope.serviceType).then(function (results) {
            if (results.status == 201) {
                toastr.success("Datos creados correctamente", "Correcto");
                $location.path('/service-type');
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