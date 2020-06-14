'use strict';

/* Modulo principal (App) */
var dotHrApp = angular.module('dotHrApp', ['ngRoute','ngFileUpload','ngAnimate', 'ui.bootstrap','dothrFilters','dotHrServices','google-maps']);

/* *** Configuración de RUTAS ***** */
dotHrApp.config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
		templateUrl : 'views/home.html',	//welcome	| home
		controller : 'home'
    })
    .when('/about', {   /* cambio pwd */
      templateUrl: 'views/kred/about.html',
      controller: 'home'
    })
    .when('/myinfo', {   /* cambio pwd */
      templateUrl: 'views/kred/myinfo.html',
      controller: function ($scope, $rootScope, $route, $routeParams, $compile, $filter, $location,
        userRsp) {
       $scope.session = $rootScope.session;
       console.log('<app> cashFlow');
   
       //$scope.idPosicion = $route.current.params.idPosicion;
       $scope.user = userRsp
   
     }
     , resolve: {
      userRsp:function ($q, $route, $rootScope, commonResource) {
         let deferred = $q.defer()
         let successFn = function (result) {
            console.log('<userRsp> app -> result :',result);
           
           if (angular.equals(result, [])) {
             console.log('<userRsp> NOT FOUND');
           } else if (typeFatal(result)){
              deferred.reject(result);
           }
           deferred.resolve(result);
          }
          let failFn = function (result) {
           deferred.reject("Failed");
          }
          let jsReq = {idUser:$rootScope.session.idPersona};
          commonResource.getJsonResp('USERINFO.R',jsReq).success(successFn).error(failFn);
         return deferred.promise;
       }
     }
    })
    .when('/vccn', {   /* cambio pwd */
      templateUrl: 'views/kred/pwdu.html',
      controller: 'home'
    })


    .when('/cashFlow', {   /* cash Flow */
      templateUrl: 'views/kred/cashFlow.html',
      controller: function ($scope, $rootScope, $route, $routeParams, $compile, $filter, $location,
        chflowResp) {
       $scope.session = $rootScope.session;
       console.log('<app> cashFlow');
   
       //$scope.idPosicion = $route.current.params.idPosicion;
       $scope.metricas = chflowResp[0]
   
     }
     , resolve: {
       chflowResp:function ($q, $route, $rootScope, commonResource) {
         let deferred = $q.defer()
         let successFn = function (result) {
            console.log('<chflowResp> app -> result :',result);
           
           if (angular.equals(result, [])) {
             console.log('<chflowResp> NOT FOUND');
           } else if (typeFatal(result)){
              deferred.reject(result);
           }
           deferred.resolve(result);
          }
          let failFn = function (result) {
           deferred.reject("Failed");
          }
          let jsReq = {idUser:999};
          commonResource.getJsonResp('CASHFLOW.R',jsReq).success(successFn).error(failFn);
         return deferred.promise;
       }
     }
    })
    .when('/credp', {   /* cash Flow */
      templateUrl: 'views/kred/credProfile.html',
      controller: function ($scope, $rootScope, $route, $routeParams, $compile, $filter, $location,
        credResp) {
       $scope.session = $rootScope.session;
       console.log('<app> credp');
   
       //$scope.idPosicion = $route.current.params.idPosicion;
       $scope.credProf = credResp
   
     }
     , resolve: {
      credResp:function ($q, $route, $rootScope, commonResource) {
         let deferred = $q.defer()
         let successFn = function (result) {
            console.log('<credResp> app -> result :',result);
           
           if (angular.equals(result, [])) {
             console.log('<credResp> NOT FOUND');
           } else if (typeFatal(result)){
              deferred.reject(result);
           }
           deferred.resolve(result);
          }
          let failFn = function (result) {
           deferred.reject("Failed");
          }
          let jsReq = {idUser:999};
          commonResource.getJsonResp('CREDPROFILE.R',jsReq).success(successFn).error(failFn);
         return deferred.promise;
       }
     }
    })
    







       .otherwise('/');
    
    //es necesario para ajax
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	$httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
	
	//Se crea el intercerptor :TokenAuthInterceptor, para reescribir el objeto http
	$httpProvider.interceptors.push('TokenAuthInterceptor');
  }]);
