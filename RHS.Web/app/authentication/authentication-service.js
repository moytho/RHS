'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', 'CONFIG', function ($http, $q, localStorageService, CONFIG) {

    var serviceBase = CONFIG.SERVICE_BASE;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };


    var _login = function (loginData) {

        var data = "grant_type=password&Username=" + loginData.UserName + "&password=" + loginData.Password;
        var deferred = $q.defer();

        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.UserName });
            console.log(loginData);
            _authentication.isAuth = true;
            _authentication.userName = loginData.UserName;
            deferred.resolve(response);

        }).error(function (err, status) {

            _logOut();
            deferred.reject(err);

        });

        return deferred.promise;

    };

    var _logOut = function () {
        console.log("beginning logout")
        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        console.log("end logout")
    };

    var _fillAuthData = function () {
        console.log("beginning of fillAuthData")
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            console.log("authData is true")
        }
        console.log("end of fillAuthData")

    }

    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);