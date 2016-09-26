'use strict';
app.controller('serviceTypeListController', ['$scope', 'serviceTypeService', 'toastr','authService',
    function ($scope, serviceTypeService, toastr, authService) {
        console.log(authService);
        $scope.form = {};
        $scope.serviceTypes = [];

        serviceTypeService.getAll().then(function (results) {

            $scope.serviceTypes = results.data;

            $scope.model = {};

        }, function (error) {
            console.log(error);
        });

    }]);

app.controller('serviceTypeEditController', ['$scope', 'serviceTypeService', '$location', 'toastr','$stateParams','$state',
    function ($scope, serviceTypeService, $location, toastr, $stateParams,$state) {
        console.log($state)
        $scope.edit = true;
        $scope.title = "Edicion tipo de servicio";
        var id = $stateParams.id;
        
        $scope.schema = {
                type: "object",
                properties: {
                    Description: { type: "string", minLength: 5, title: "Descripcion tipo de servicio","required": true},
                }
        };

        $scope.form = ["*"];

        serviceTypeService.get(id).then(function (results) {
            $scope.model = results.data;
        },
        function (error) {
            console.log(error);
        });

        $scope.goBack = function () {
            $state.go('dashboard.service-type');
        };

        $scope.onSubmit = function (form) {
            $scope.$broadcast('myform');
            if (form.$valid) {
                serviceTypeService.update(id, $scope.model).then(function (results) {
                    if (results.status == 204) {
                        toastr.success("Datos actualizados correctamente", "Correcto",{ iconClass: 'toast-pink' });
                        $state.go('dashboard.service-type');
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
            serviceTypeService.delete(id).then(function (results) {
                if (results.status == 200) {
                    toastr.success("Datos eliminados correctamente", "Correcto");
                    $state.go('dashboard.service-type');
                } else {
                    toastr.error("Ha sucedido un error", "Error");
                }
            }, function (error) {
                console.log(error);
            });
        };

    }]);

app.controller('serviceTypeCreateController', ['$scope', 'serviceTypeService', '$location', 'toastr', '$stateParams', '$state',
    function ($scope, serviceTypeService, $location, toastr, $stateParams,$state) {

    $scope.title = "Creacion de un nuevo tipo de servicio";
    $scope.edit = false;
    
    $scope.schema = {
        type: "object",
        properties: {
            Description: { type: "string", minLength: 5, title: "Descripcion tipo de servicio" },
        }
    };

    $scope.form = ["*"];

    $scope.model = {};

    $scope.onSubmit = function (form) {
        $scope.$broadcast('myform');
        if (form.$valid) {
            serviceTypeService.create($scope.model).then(function (results) {
                if (results.status == 201) {
                    toastr.success("Datos creados correctamente", "Correcto");
                    $state.go('dashboard.service-type');
                } else {
                    toastr.error("Ha sucedido un error", "Error");
                }
            }, function (error) {
                console.log(error);
            });
        }
    }

    $scope.goBack = function () {
        $state.go('dashboard.service-type');
    };

}]);