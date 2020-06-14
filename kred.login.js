
var EMPRESA_CONF='1';


var dotHrApp = angular.module('dotHrApp', [ 'ngRoute','ngMessages'])
.factory('SessionStorage', function() {
	return {		
		store : function(storageKey, token) {
			return localStorage.setItem(storageKey, token);
		},
		retrieve : function(storageKey) {
			return localStorage.getItem(storageKey);
		},
		clear : function(storageKey) {
			return localStorage.removeItem(storageKey);
		}
	};
})
.factory('TokenStorage', function() {
	var storageKey = 'auth_token';
	return {		
		store : function(token) {
			return localStorage.setItem(storageKey, token);
		},
		retrieve : function() {
			return localStorage.getItem(storageKey);
		},
		clear : function() {
			return localStorage.removeItem(storageKey);
		}
	};
}).factory('TokenAuthInterceptor', function($q, TokenStorage, $rootScope) {
	return {
		//en cada petición se inyecta el authToken
		request: function(config) {
			var authToken = TokenStorage.retrieve();
			if (authToken) {
				config.headers['x-auth-token'] = authToken;
			}
			return config;
		},
		//en cada error de respuesta se limpia el TokenStorage
		responseError: function(error) {
			console.log('error:', error );
			
			$rootScope.errorst=JSON.stringify(error.status);
			if (error.status === 401 || error.status === 403) {
				TokenStorage.clear();
			}
			return $q.reject(error);
		}
	};
})
/* app.js routing */
.config(function($routeProvider,$httpProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/login.html',
		controller : 'navigation'
	}).when('/login', {
		templateUrl : 'views/login.html',
		controller : 'navigation'	
	}).when('/registro', {
		templateUrl : 'views/registro.html',
		controller : 'ctrlRegistro'
	}).when('/validar/:token/:email', {
		templateUrl : 'views/login.html',
		controller : 'ctrlValidar'
	}).when('/reiniciar/:token/:email', {
		templateUrl : 'views/reinicia.html',
		controller : 'reinicia'
	}).when('/recupera', {
		templateUrl : 'views/recupera.html',
		controller : 'recuperar'
	}).when('/ping', {
		templateUrl : 'views/ping.html',
		controller : 'recuperar'
	}).otherwise('/');
	
	//es necesario para ayax
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	
	//Se crea el intercerptor :TokenAuthInterceptor, para reescribir el objeto http
	//$httpProvider.interceptors.push('TokenAuthInterceptor');
});
/* sections directives */
dotHrApp
	.directive('avpriva', function() {
		var myTemplate = 'views/nav/avisopriv.html';
        return {
        	templateUrl: myTemplate
        };
    })
    .directive('commfooter', function() {
		var myTemplate = 'views/nav/footer.html';
        return {
        	templateUrl: myTemplate
        };
    })
    .directive('dothrheader', function() {
		var myTemplate = 'views/nav/header.html';
        return {
        	templateUrl: myTemplate
        };
    })
    .directive("compareTo", function() {
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
   	});
/* Controlador de Navegación/Login */
dotHrApp.controller('navigation', function($rootScope, $scope, $http, $location, $route, TokenStorage, SessionStorage) {
	$('#auxDetAppMsg').html('');
	$scope.showIEbutton = false;
	if (typeof ieincompatible != 'undefined') {
		 /* console.log('ieincompatible ', ieincompatible ); */
		$scope.showIEbutton = true;
	}
	
	$scope.oneEmp=true;
	$scope.prb = '';	
	$scope.message = '';	
	
	$scope.showsuccess = false;
	$scope.showwarning = false;
	$scope.showerror = false;
	$scope.tab = function(route) {
		return $route.current && route === $route.current.controller;
	};
	
	if($rootScope.validacredentials != undefined){
		$rootScope.credentials = {};
		$rootScope.credentials.username = $rootScope.validacredentials.username;
		$scope.message = $rootScope.validacredentials.message;
		$scope.showsuccess = $rootScope.validacredentials.success;
		$scope.showwarning = $rootScope.validacredentials.warning;
		$scope.showerror = $rootScope.validacredentials.error;
	}
	//Se guarda el idEmpresaConf
	if(!SessionStorage.retrieve('idEmpresaConf')){
		SessionStorage.store('idEmpresaConf',EMPRESA_CONF);
	}
	
	//Se aplica cuando se firma el usuario
	var authenticate = function(credentials, callback) {
		$scope.prb = undefined;
		if($scope.oneEmp){
			credentials.empresa = SessionStorage.retrieve('idEmpresaConf');
		}
		/*  --->> Validaciones  */
		if((credentials.username == undefined || credentials.username == '' )
				|| (credentials.password  == undefined || credentials.password == '')
				|| (credentials.empresa == '' || credentials.empresa == undefined )
		){
			
			$scope.error = true;
			//$scope.errorinlog = 'Correo o contraseña vacios, verifique';
			if(credentials.username == '' || credentials.username == undefined ){
				//alert('seleccione empresa');
				$scope.prb=' Username is required';
			}else if(credentials.password == '' || credentials.password == undefined ){
				//alert('seleccione empresa');
				$scope.prb=' Password is required';
			}
			else if(credentials.empresa == '' || credentials.empresa == undefined ){
				//alert('seleccione empresa');
				$scope.prb='   a';
			}else{
				$scope.prb=' empty Username or Password';
			}	
			console.log('error: ', $scope.prb );
			return;
		}
		var hashPws=CryptoJS.SHA256(credentials.password);
		var headers = credentials ? {authorization : "Basic "
			+ btoa(credentials.username +","+ SessionStorage.retrieve('idEmpresaConf') +":"+ hashPws.toString(CryptoJS.enc.Hex))} : {};
	 /* $http.get('/login', {
			headers : headers
		}).success(function(data, status, headers) {
			if (data.username) {
				var val=headers('x-auth-token')
				if(val !== null ){
					TokenStorage.store(headers('x-auth-token'));
					$rootScope.respJson=data;
					$rootScope.session = {};
					$rootScope.session.idPersona=data.idPersona;
					$rootScope.session.idEmpresaConf=SessionStorage.retrieve('idEmpresaConf');//data.idEmpresaConf;
					console.log('/login -> data:', data );
					console.log('/login -> vistaInicial:', data.vistaInicial );
					
					SessionStorage.store('idPersona', $rootScope.session.idPersona);
					SessionStorage.store('idEmpresaConf', $rootScope.session.idEmpresaConf);				
					SessionStorage.store('rol', data.role);
					SessionStorage.store('usrEmpresa', data.idEmpresa);
					SessionStorage.store('vistaInicial', data.vistaInicial);
					$rootScope.authenticated = true;
				}
			} else {
				$rootScope.authenticated = false;
			}
			callback && callback();
		}).error(function() {
			$rootScope.authenticated = false;			
			callback && callback();
		}); */
		//* ByPass para demo HTML

		//***  KRED ::
		let idUser = 999
		if(credentials.username=='rmateus'){
			idUser = 7
		}
		else if(credentials.username=='evalle'){
			idUser = 1
		} 
		// ****
		 var data = 
		 //{username: "2,1", idEmpresa: 1, role: "1", idPersona: "2",vistaInicial: "views/sections/welc-cand.html"};
		 {username: "2,1", idEmpresa: 1, role: "1", idPersona: idUser, vistaInicial: "views/sections/welc-developer.html"};
		$rootScope.respJson=data;
		$rootScope.session = {};
		$rootScope.session.idPersona=data.idPersona;
		$rootScope.session.idEmpresaConf=SessionStorage.retrieve('idEmpresaConf');//data.idEmpresaConf;
		console.log('/login -> data:', data );
		console.log('/login -> vistaInicial:', data.vistaInicial );
		SessionStorage.store('idPersona', $rootScope.session.idPersona);
		SessionStorage.store('idEmpresaConf', $rootScope.session.idEmpresaConf);				
		SessionStorage.store('rol', data.role);
		SessionStorage.store('usrEmpresa', data.idEmpresa);
		SessionStorage.store('vistaInicial', data.vistaInicial);
		$rootScope.authenticated = true;
		callback && callback();
	}
	if($rootScope.credentials != undefined ){
		$scope.credentials = $rootScope.credentials;
	}else {
		$scope.credentials = {username:'', password:'abCdEf12'} //{};
	}
	
	$scope.login = function() {
		authenticate($scope.credentials, function() {
			if ($rootScope.authenticated) {
				//$location.path("/");
				$scope.error = false;
				$rootScope.authenticated = true;
				window.location.href="./app/index.html";
			} else {
				$scope.error = true;
				$rootScope.authenticated = false;
				if($rootScope.errorst == '401'){
					var msj401='<ul><li type="disc">Correo o contraseña inv&aacute;lidos.</li>'+
					 			'<li type="disc">No se ha confirmado la inscripción.</li>'+
					 			'<li type="disc">Problemas en el sistema.</li></ul>';
					$('#prb').html(msj401);
				} else if($rootScope.errorst == '0'){
					$scope.prb = ', De conexión (¿OffLine?)';
				}
				$scope.error = true;
			}
		})
	};
	$('[data-toggle="popover"]').popover(); 
});
/*  Controlador proceso de Reinicio pwd */
dotHrApp.controller('reinicia', function($rootScope, $scope, $http, $location, $route, $routeParams) {
	$scope.token = $route.current.params.token; 
	$scope.emailuser=$route.current.params.email;
	$scope.apperror = false;
	$scope.showsuccess = false;
	$scope.showerror = false;
	$scope.shsear = false;
	$scope.shrest = false;
	$scope.shrest = true;
	if(typeof $scope.token == 'undefined' || typeof $scope.emailuser == 'undefined'){
		console.log('faltan datos, emailuser:', $scope.emailuser );
		console.log('faltan datos, token:', $scope.token );
		alert('faltaron datos...');
		$scope.shrest = false;
		$location.path('/login');
	}
	
	$scope.reiniciar = function(){
		console.log('$scope.emailuser: ', $scope.emailuser );
		console.log('$scope.password: ', $scope.password );
		console.log('$scope.confirmPassword: ', $scope.confirmPassword );
		console.log('$scope.token: ', $scope.token );
		
		if(typeof $scope.password != 'undefined'){
			console.log('$scope.password: no es undefined' );
			if(typeof $scope.confirmPassword != 'undefined'){
				console.log('$scope.confirmPassword: no es undefined' );
				if($scope.password == $scope.confirmPassword ){
					console.log('Son iguales' );
					var hashPws=CryptoJS.SHA256($scope.password);
					$http.post('/restore', {
			  			'userName': $scope.emailuser,'password':hashPws.toString(CryptoJS.enc.Hex) ,'idEmpresaConf': EMPRESA_CONF, 'token': $scope.token
			  			}).success(function(data) {
			  				console.log('data ', data );
			  				if( data.length > 0){
			  			    	for(var i=0;i<data.length;i++){
			  			    		if(data[i].email != undefined ){
					  					$scope.apperror = false;
										$scope.showsuccess = false;
										$scope.showerror = false;
										$scope.shsear = false;
										$scope.shrest = false;							
										$rootScope.validacredentials = {};
										$rootScope.validacredentials.success = true;
							    		$rootScope.validacredentials.error = false;
							    		$rootScope.validacredentials.warning=false
							    		$rootScope.validacredentials.message = 'Muchas gracias. Su contraseña ha sido modificada, por favor proceda a dar de alta su CV.';
							    		$rootScope.validacredentials.username=$scope.emailuser;
							    		$location.path('/login');
					  				}else{
					  					$scope.message = data[i].message;
										$scope.apperror = false;
										$scope.showsuccess = false;
										$scope.showerror = true;
						    		}
			  			    	}
			  				}
			  			}).error(function(data) {
				    		$scope.message = 'No se pudo realizar la operación, intente más tarde';
							$scope.apperror = false;
							$scope.showsuccess = false;
							$scope.showerror = true;
				  		});
				}else{
					$scope.message = 'Las contraseñas no coinciden';
					$scope.apperror = false;
					$scope.showsuccess = false;
					$scope.showerror = true;
				}
			}else{
				$scope.message = 'Es necesario ingresar la confirmación de contraseña';
				console.log('Es necesario la confirmación de contraseña');
				$scope.apperror = false;
				$scope.showsuccess = false;
				$scope.showerror = true;
			}
		}else{
			$scope.message = 'Es necesario ingresar la contraseña';
			console.log('Es necesario ingresar la contraseña');
			$scope.apperror = false;
			$scope.showsuccess = false;
			$scope.showerror = true;
		}
	}
});
/* Controlador para enviar solicitud de recuperación de contraseña */
dotHrApp.controller('recuperar', function($rootScope, $scope, $http, $location, $route) {
	$scope.token = '';
	$scope.code = -1;
	$scope.showIEbutton = false;
	$scope.message = '';
	$scope.apperror = false;
	$scope.showsuccess = false;
	$scope.showerror = false;
	
	$scope.shsear = true;
	$scope.shrest = false;
	
	$scope.searchem = function() {
		if(typeof $scope.emailuser != 'undefined'){
			$http.post('/exists', {'email': $scope.emailuser,'idEmpresaConf': EMPRESA_CONF, 'code':1})
				.success(function(data) {
					console.log('data: ', data );
					if( data.length > 0){
						for(var i=0;i<data.length;i++){
							if(data[i].email != undefined && data[i].code != undefined){ /* si viene email, se encontro en sistema y se pasa a vista de restauracion */
								console.log('data[i].code: ', data[i].code);
								$scope.message = '';
								$scope.token = data[i].token;
								$scope.code = data[i].code;
								$scope.apperror = false;
								$scope.showsuccess = false;
								$scope.showerror = false;
								$scope.shsear = false;	
								$scope.shrest = true;
								/* */
							} else {	/* no se encontro en sistema */
								$scope.message = "No information available for this user";
								$scope.apperror = false;
								$scope.showsuccess = false;
								$scope.showerror = true;
								$scope.shsear = true;
								$scope.shrest = false;
							}
						}
					}
				})
				.error(function(data) {
					$scope.message = "Connection error, try later";
					$scope.apperror = false;
					$scope.showsuccess = false;
					$scope.showerror = true;
					$scope.shsear = true;
					$scope.shrest = false;
	  		});
		}else{
			$scope.message = 'Please enter your email to start searching ';
			$scope.apperror = false;
			$scope.showsuccess = false;
			$scope.showerror = true;
			$scope.shsear = true;
			$scope.shrest = false;
		}
	};
	
	$scope.restablecer = function(){
		console.log('restablecer > $scope.emailuser: ', $scope.emailuser );
		console.log('restablecer > $scope.code: ', $scope.code );
		console.log('restablecer > $scope.token: ', $scope.token );
		$http.post('/exists', {'email': $scope.emailuser,'idEmpresaConf': EMPRESA_CONF, 'code':$scope.code, 'token':$scope.token})
		.success(function(data) {
			console.log('data: ', data );
			if( data.length > 0){
				for(var i=0;i<data.length;i++){
					if(data[i].email != undefined ){						
						$scope.message = data[i].message;	//'Se ha enviado un correo electrónico, verifique su bandeja de entrada';
						$scope.apperror = false;
						$scope.showsuccess = true;
						$scope.showerror = false;
						$scope.shsear = false;	
						$scope.shrest = false;
					}else {	/* No se envio correo */
						$scope.message = "Error processing request. ";
						$scope.apperror = false;
						$scope.showsuccess = false;
						$scope.showerror = true;
						$scope.shsear = true;
						$scope.shrest = false;
						console.log('data.message: ', data[i].message );
					}
				}
			}
		})
		.error(function(data) {
			$scope.message = "Connection error, try later";
			$scope.apperror = false;
			$scope.showsuccess = false;
			$scope.showerror = true;
			$scope.shsear = true;
			$scope.shrest = false;
		});
	}
	
	$scope.pingApps = function(){
		$scope.message = '';
				
		$scope.pingTrans = function(){
			$http.post('/pingapps', {'hostName': 'TRANSACTIONAL','idEmpresaConf': EMPRESA_CONF})
			.success(function(data) {
				console.log('data: ', data);
				if(data[0].type=='I'){
					$scope.transMsg = 'Respuesta Transactional: '+ data[0].message;
					$scope.tipoAlert1 = 'alert-info';
				}else{
					$scope.transMsg = 'Respuesta Transactional: '+ data[0].message;
					$scope.tipoAlert1 = 'alert-danger';
					$('#detailT').html(JSON.stringify(data) );
				}
			})
			.error(function(data) {
				$scope.message = "Connection error, try later";
				$scope.tipoAlert1 = 'alert-danger';
			});
		};

		$scope.pingOper = function(){
			$http.post('/pingapps', {'hostName': 'OPERATIONAL','idEmpresaConf': EMPRESA_CONF})
			.success(function(data) {
				console.log('data: ', data);
				if(data[0].type=='I'){
					$scope.operMsg = 'Respuesta Operational: '+ data[0].message;
					$scope.tipoAlert2 = 'alert-info';
				}else{
					$scope.operMsg = 'Respuesta Operational: '+ data[0].message;
					$scope.tipoAlert2 = 'alert-danger';
					$('#detailO').html(JSON.stringify(data) );
				}
			})
			.error(function(data) {
				$scope.message = "Connection error, try later";
				$scope.tipoAlert2 = 'alert-danger';
				$('#detailT').html(''+data);
			});
		};
		console.log('Contactando Apps');
		$scope.pingTrans();
		$scope.pingOper();
		
	}
});
/* Registro de usuario */
dotHrApp.controller('ctrlRegistro', function($rootScope,$scope, $http, TokenStorage, SessionStorage) {
	$scope.showIEbutton = false;
	$('#auxDetAppMsg').html('');
	if (typeof ieincompatible != 'undefined') {
		/* console.log('ieincompatible ', ieincompatible ); */
		$scope.showIEbutton = true;
	}
	
	var model = this;
    model.message = "";
    model.success = false;
    model.error = false;
    model.user = {
      username: "",
      password: "",
      confirmPassword: ""
    };

    model.submit = function(isValid) {
    	console.log('<model.submit> isValid ', isValid);
      SessionStorage.store('idEmpresaConf', EMPRESA_CONF);
      if (isValid) {
    	  console.log('<model.submit> encripting');
    	   var hashPws=CryptoJS.SHA256(model.user.password);
	  	  /* $http.post('/registration', {
	  			'userName': model.user.username,'password':hashPws.toString(CryptoJS.enc.Hex) ,'idEmpresaConf': SessionStorage.retrieve('idEmpresaConf')
	  			}).success(function(data) {
	  				console.log('<model.submit>success> data ', data );
	  			var size = data.length;
	  		    if( size != undefined){   	
	  		    	 if( size > 0){
	  			    	for(var i=0;i<size;i++){
	  			    		if(data[i].type =='I'){
	  			    			model.success = true;
	  			    		    model.error = false;
	  			    			model.message = 'Se ha enviado un mensaje, al correo proporcionado, para activar su cuenta';
	  			    			model.user = { username: '', password: '', confirmPassword: '' };
	  			    		}else if(data[i].type =='E' || data[i].type =='F'){
	  			    			console.log('error de Sistema: ', data[i].message);
	  			    			model.message = 'Existió un error al realizar su Alta, intente más tarde.';
	  			    			model.success = false;
	  			    		    model.error = true;
	  			    		    $('#auxDetAppMsg').html(data[i].message);
	  			    		}
	  			    	}
	  		    	 }
		  		  }else{
		  	    	model.message = 'Error de sistema, por favor conectarse mas tarde';
		  	    	model.success = false;
		    		model.error = true;
		    		$('#auxDetAppMsg').html('respuesta [data] invalida: ' + data);
		  		  }
	  		}).error(function(data) {
	  			console.log('<model.submit> error');
	  			model.message = "No se pudo realizar el registro";
	  			model.success = false;
	    		model.error = true;
			$('#auxDetAppMsg').html('respuesta [data] invalida: ' + data);
	  		});*/ //BYPASS para simular funcionamiento:
	  		model.success = true;
	  		model.error = false;
	  		model.message = 'A message has been sent to the email provided to activate your account';
      } else {
    	  console.log('<model.submit> Campos Invalidos');
        model.message = "Hay campos no válidos";
        model.success = false;
		model.error = true;
      }
    };
})
/* Controlador para validar el registro de usuario */
.controller('ctrlValidar', function ($rootScope, $scope, $http,$location, $route,TokenStorage, $routeParams) {
	$scope.showIEbutton = false;
	if (typeof ieincompatible != 'undefined') {
		 /* console.log('ieincompatible ', ieincompatible ); */
		$scope.showIEbutton = true;
	}
	$scope.success = false;
	$scope.error = false;
	$scope.warning=false;
	$scope.oneEmp=true;
	$scope.message = '';
	$scope.credentials = {};
	$http.post('/validate', {'token': $route.current.params.token,'idEmpresaConf': EMPRESA_CONF}).success(function(data) {
		var size = data.length;	
	    $rootScope.validacredentials = {};
	    	 if( size > 0){
		    	for(var i=0;i<size;i++){
		    		if(data[i].email != undefined ){   			
			    		$rootScope.validacredentials.success = true;
			    		$rootScope.validacredentials.error = false;
			    		$rootScope.validacredentials.warning=false
			    		$rootScope.validacredentials.message = 'Thank you. Your registration has been confirmed. Please proceed to register your CV.';
			    		$rootScope.validacredentials.username=data[i].email;
		    		}else{
		    			$rootScope.validacredentials.success = false;
			    		$rootScope.validacredentials.error = true;
			    		$rootScope.validacredentials.warning=false
			    		$rootScope.validacredentials.message = 'Incorrect parameter.';
			    		$rootScope.validacredentials.username=$routeParams.email;
		    		}
		    		$rootScope.authenticated = false;
		    	}
	    	 }else{
	    		 $rootScope.validacredentials.success = false;
		    	 $rootScope.validacredentials.error = false;
		    	 $rootScope.validacredentials.warning=true
		    	 $rootScope.validacredentials.message = 'No need to reconfirm your subscription.';
		    	 $rootScope.validacredentials.username=$routeParams.email;
	    	 }
	    	 $location.path('/login');
	}).error(function(data) {
		$scope.message = 'Could not validate';
		$scope.success = false;
		$scope.error = true;
	});
})
/* Controlador para confirmar la adición del candidato a proceso de contratación*/
.controller('ctrlConfirmAddVacancy', function ($rootScope, $scope, $http,$location, $route,TokenStorage, $routeParams) {
	$scope.showIEbutton = false;
	if (typeof ieincompatible != 'undefined') {
		 /* console.log('ieincompatible ', ieincompatible ); */
		$scope.showIEbutton = true;
	}
	$scope.success = false;
	$scope.error = false;
	$scope.warning=false;
	$scope.oneEmp=true;
	$scope.message = '';
	$scope.credentials = {};
	
	console.log('token: ', $route.current.params.token ); 
	console.log('email: ', $route.current.params.email ); 
	
	$http.post('/confirmAddVacancy', {'token': $route.current.params.token,'idEmpresaConf': EMPRESA_CONF}).success(function(data) {
		var size = data.length;	
	    $rootScope.validacredentials = {};
	    	 if( size > 0){
		    	for(var i=0;i<size;i++){
		    		if(data[i].code != undefined ){
		    			if(data[i].type == 'E' ){ 
		    				$rootScope.validacredentials.success = false;
		    	    		$rootScope.validacredentials.error =false ;
		    	    		$rootScope.validacredentials.warning=true
		    	    		$rootScope.validacredentials.message = data[i].message;
		    			}else if(data[i].type == 'W' ){ 
		    				$rootScope.validacredentials.success = false;
		    	    		$rootScope.validacredentials.error =false ;
		    	    		$rootScope.validacredentials.warning=true
		    	    		$rootScope.validacredentials.message = data[i].message;		    				
		    			}else if(data[i].type == 'I' ){ 
		    				$rootScope.validacredentials.success = true;
				    		$rootScope.validacredentials.error = false;
				    		$rootScope.validacredentials.warning=false
				    		$rootScope.validacredentials.message =data[i].message ;
				    		$rootScope.validacredentials.username=$route.current.params.email;
		    			}else{
		    				$rootScope.validacredentials.success = false;
		    	    		$rootScope.validacredentials.error = true;
		    	    		$rootScope.validacredentials.warning=false
		    	    		$rootScope.validacredentials.message = data[i].message;
		    			}		    			
			    	}
		    		$rootScope.authenticated = false;
		    	}
	    	 }else{
	    		$rootScope.validacredentials.success = false;
	    		$rootScope.validacredentials.error = true;
	    		$rootScope.validacredentials.warning=false
	    		$rootScope.validacredentials.message = 'System error, connect later.';
	    	 }
	    	 $location.path('/login');
	}).error(function(data) {
		$scope.message = 'No se pudo validar';
		$scope.success = false;
		$scope.error = true;
	});
})
.controller('testEncrypter', function ($rootScope, $scope){

	$scope.pwd;
	$scope.encriptado;

	$scope.resetMod = function(){
		$scope.pwd = '';
		$('#encriptado').val('');
		$('#mdMensajeEnc').html('');
	};

});