'use strict';
app.controller('mainController', ['$scope', 'mainService', 'toastr','serviceTypeService',
    function ($scope, mainService, toastr, serviceTypeService) {
        
        $scope.services = [];
        serviceService.getServicess().then(function (results) {

            $scope.services = results.data;

        }, function (error) {
            console.log(error);
        });
        

    }]);

