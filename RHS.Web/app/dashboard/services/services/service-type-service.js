'use strict';
app.factory('serviceTypeService', ['$http', 'CONFIG', function ($http, CONFIG) {
    var serviceBase = CONFIG.SERVICE_BASE;
    var serviceFactory = {};

    var _getAll = function () {

        return $http.get(serviceBase + 'api/servicetype').then(function (results) {
            return results;
        });
    };

    var _get = function (id) {

        return $http.get(serviceBase + 'api/servicetype/' + id).then(function (results) {
            return results;
        });
    };

    var _update = function (id, element) {

        return $http.put(serviceBase + 'api/servicetype/' + id, element).then(function (results) {
            return results;
        });
    };

    var _create = function (element) {

        return $http.post(serviceBase + 'api/servicetype', element).then(function (results) {
            return results;
        });
    };

    var _delete = function (id, element) {

        return $http.delete(serviceBase + 'api/servicetypes/' + element).then(function (results) {
            return results;
        });
    };

    serviceFactory.getAll = _getAll;
    serviceFactory.get = _get;
    serviceFactory.create = _create;
    serviceFactory.update = _update;
    serviceFactory.delete = _delete;

    return serviceFactory;

}]);