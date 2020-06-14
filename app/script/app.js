'use strict';

/* >>>>>>>>>>>>>> App Declaration & plugins <<<<<<<<<<<<<<*/
var protoApp = angular.module('protoApp', [ 'ngRoute','appServices']);

/* >>>>>>>>>>>>>> Routing <<<<<<<<<<<<<<*/
protoApp.config(function ($locationProvider, $routeProvider) {
    $routeProvider
    .when('/', {
    	templateUrl: 'views/home.html'
    })
    .when('/inicio', {
    	templateUrl: 'views/home.html'
    	
    })
    .when('/about', {
    	templateUrl: 'views/about.html'
    	
    })
    .when('/v1', {  /* Metricas 1 */
    	templateUrl: 'views/v1.html',
		controller: function ($scope, $rootScope, $route, $routeParams, $compile, $filter, $location,
		   metricsResp) {
		  $scope.session = $rootScope.session;
		  console.log('<app> metrics');
	
		  $scope.idPosicion = $route.current.params.idPosicion;
		  $scope.metricas = metricsResp[0]
	
		}
		, resolve: {
			metricsResp:function ($q, $route, $rootScope, commonResource) {
				let deferred = $q.defer()
				let successFn = function (result) {
				   console.log('<metricsResp> app -> result :',result);
				  
				  if (angular.equals(result, [])) {
					  console.log('<metricsResp> NOT FOUND');
				  } else if (typeFatal(result)){
				   	deferred.reject(result);
				  }
				  deferred.resolve(result);
			   }
			   let failFn = function (result) {
				  deferred.reject("Failed");
			   }
			   let jsReq = {idUser:999};
			   commonResource.getJsonResp('METRICS.R',jsReq).success(successFn).error(failFn);
			  return deferred.promise;
			}
		}
    	
    })
    .when('/v2', {
    	templateUrl: 'views/v2.html'
    	
    })
    .when('/v3', {
    	templateUrl: 'views/v3.html'
    	
    })
    .when('/v4', {
    	templateUrl: 'views/v4.html'
    	
    })
    .when('/v5', {
    	templateUrl: 'views/v5.html'
    	
    })
    .otherwise({
	redirectTo: '/'
  });
});

/* >>>>>>>>>>>>>> html Directives <<<<<<<<<<<<<<*/
protoApp
    .directive('pieuno', function() {
		var myTemplate = 'nav/footer.html';
        return {
        	templateUrl: myTemplate
        };
    })
    .directive('headeruno', function() {
		var myTemplate = 'nav/header.html';
        return {
        	templateUrl: myTemplate
        };
    })
    /*.directive('avpriva', function() {
		var myTemplate = 'nav/avisopriv.html';
        return {
        	templateUrl: myTemplate
        };
    }).directive("compareTo", function() {
   	 return {
   	      require: "ngModel",
   	      scope: {
   	        otherModelValue: "=compareTo"
   	      },
   	      link: function(scope, element, attributes, ngModel) {

   	        ngModel.$validators.compareTo = function(modelValue) {
   	          return modelValue == scope.otherModelValue;
   	        };

   	        scope.$watch("otherModelValue", function() {
   	          ngModel.$validate();
   	        });
   	      }
   	    };
   	})*/
   	;
/* >>>>>>>>>>>>>> Controlers <<<<<<<<<<<<<<*/
protoApp
.controller('mainController',function($scope,$rootScope,$routeParams, $location, $route, $templateCache){
	$scope.today = new Date();

	$scope.confirmLogout = function(){
		$('#mdLogout').modal('show');
	}

	$scope.logout = function() {
		//alert('logout')
		//blockPage();
		//console.log("logout() -> idPersona:",$rootScope.session.idPersona);
		//console.log("logout() -> idEmpresaConf:",$rootScope.session.idEmpresaConf);
		$('.modal').modal('hide');
		window.location.href='../login.html';
		SessionStorage.clear('logged');
		SessionStorage.clear('idPersona');
		SessionStorage.clear('idEmpresaConf');
	}
});