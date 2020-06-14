'use strict';

dotHrApp
.controller('navigation', function($q, $rootScope, $scope, $http, $location, $route, TokenStorage, SessionStorage, menuResource, commonResource) {
	$scope.errorPwd = false;
	
	if(SessionStorage.retrieve('idPersona')==undefined){
		window.location.href=loginPage;
	}
	
	if(SessionStorage.retrieve('idEmpresaConf')!=undefined){
		 var sessionIdEmpresaConf = SessionStorage.retrieve('idEmpresaConf');
		 //console.log('>>>>>>>> session-IdEmpresaConf: ', sessionIdEmpresaConf );
	}

	if($rootScope.session == undefined){
		console.log('RESETING Session objects ....');
		//console.log('vistaInicial:',SessionStorage.retrieve('vistaInicial'));
		$rootScope.session = {};
		$rootScope.session.idPersona = SessionStorage.retrieve('idPersona');
		$rootScope.session.idEmpresaConf = SessionStorage.retrieve('idEmpresaConf');
		$rootScope.session.rol = SessionStorage.retrieve('rol');
		$rootScope.session.usrEmpresa = SessionStorage.retrieve('usrEmpresa');
		$rootScope.session.vistaInicial = SessionStorage.retrieve('vistaInicial');
		//$rootScope.session.packageSender = false;
		if($rootScope.session.rol!=undefined){
			//console.log('navigation --> -- MENU --' );
			let salir='<li><a href="#" ng-click="confirmLogout()" title="logout"><i class="glyphicon glyphicon-log-out"></i></a></li>'
			
			let deferred = $q.defer();
			let successFn = function (result) {
                 if (angular.equals(result, []) || typeFatal(result)) {
                 	deferred.reject(result);
                 }
                 else {
                     deferred.resolve(result);
                 }
             };
             let failFn = function (result) {
                deferred.reject('Failed MENU');
			 };
			 let jsReq = {idUser:$rootScope.session.idPersona}
             commonResource.getJsonResp('ADMIN.M', jsReq ).success(successFn).error(failFn);
             
             deferred.promise.then(function(data) {
            	 
            	 $scope.usrmenu  = '<li><a href="#/" title="Home"><span class="dhrIcon-home"></span></a></li>'+
            	 formatMenuArray(data,0) +salir;
               }, function(error) {
            	   console.log("Error loading Menu from Json Data:" , error);
            	   $scope.usrmenu = salir;
            	   $('#detError2').html('Menu cannot be build...');
            	   $('#mdError2Msg').modal('show');                 });
		}
	}
	//console.log('SESSION >>>>>>>>>>>>>>>    $rootScope.session ', $rootScope.session);
	
	/*$http.get('/current').success(function (data) {
		//console.log("<get-Current> home -> username:",data);
		$rootScope.authenticated = true;
	}).error(function(data) {
		console.log("home failed -> data:"+data);
		$rootScope.authenticated = false;
	}); */$rootScope.authenticated = true;
	
	$scope.tab = function(route) {
		return $route.current && route === $route.current.controller;
	};

	$scope.confirmLogout = function(){
		$('#mdLogout').modal('show');
	}
	
	$scope.logout = function() {
		//blockPage();
		console.log("logout() -> idPersona:",$rootScope.session.idPersona);
		console.log("logout() -> idEmpresaConf:",$rootScope.session.idEmpresaConf);
		$('#infoModalcv').modal('hide');
		/*$http.post('/exit', {'idPersona': $rootScope.session.idPersona}).success(function() {	
			unBlockPage();
			TokenStorage.clear();
			$rootScope.authenticated = false;
			window.location.href=loginPage;
		}).error(function(data) {
			unBlockPage();
			console.log("Logout failed");
			$rootScope.authenticated = false;
			window.location.href=loginPage;
		});*/ /*BYPass para simular respuesta */$rootScope.authenticated = false;window.location.href=loginPage;
		$('.modal').modal('hide');
		window.location.href='../login.html';
		SessionStorage.clear('logged');
		SessionStorage.clear('idPersona');
		SessionStorage.clear('idEmpresaConf');
	}
	if($rootScope.username != undefined){
		$scope.credentials.username=$rootScope.username;
	}

	$scope.usrmenu = $rootScope.usrmenu;

	/* Genera la plantilla dinamica del menu, que se compila en la directiva 'directivemenu' en forms.js */
	$scope.getMenuTemplate = function(objMenu) {
		/*console.log('<getMenuTemplate> objMenu: ', objMenu); */
		var planHtml = formatMenuArray(objMenu); /* procesa el arreglo de rutas/etiquetas */
		/* console.log('template generado en JQuery: ', planHtml ); //descomentar para probar veces ejecutada */
		var mainMenuTempl = '<li><a href="#/" title="Home"><span class="dhrIcon-home"></span></a></li>'+
			planHtml +
			'<li><a href="#" ng-click="logout()">Salir</a></li>';
		return mainMenuTempl;
	};	
	
	
	/** Procesos para contraseña */
	$scope.updatePwd = function(){
		$scope.errorPwd = undefined;
		$('#msgPwdErr').html('');
		if($scope.pwdant==undefined || $scope.pwdupd1==undefined || $scope.pwdupd2==undefined ){
			let tmpMsg = ''
			if($scope.pwdant==undefined){
				tmpMsg += 'Actual password can be blank '
			}
			else if($scope.pwdupd1==undefined){
				tmpMsg += ' New password can be blank'
			}
			else if($scope.pwdupd2==undefined){
				tmpMsg += ' verification password can be blank'
			}
			$scope.errorPwd = tmpMsg;
		}else{
			
			if($scope.pwdupd1!=$scope.pwdupd2){
				$scope.errorPwd = 'Please verify that new password and verification are the same';
			}else{
				if($scope.pwdupd1.length<8){
					$scope.errorPwd = 'Password length error, 8 characters length required.';
				}else{
					$scope.errorPwd = undefined;
					$scope.sendUpdPwd();
				}
			}
		}
	};
	
	$scope.resetFields = function(){
		$scope.pwdant = null;$scope.pwdupd1 = null;$scope.pwdupd2 = null;
	}
	
	$scope.sendUpdPwd = function(){
		blockPage();
		//console.log('$scope.pwdant: ', $scope.pwdant ); console.log('$scope.pwdupd1: ', $scope.pwdupd1 ); console.log('$scope.pwdupd2: ', $scope.pwdupd2 );
		var successFn = function (result) {
			console.log('successFn.result: ', result );
			unBlockPage();
			if (angular.equals(result, [])) {
 	            //console.log('<newProfile> Falló al ser vacio o fatal');
 	            $('#mdFatalMsg').modal('show');
 	        }
 	        else {
 	        	var objRes = result[0];
 	        	if(objRes.type!='I'){
	        		console.log('Error updating: ', objRes.message );
					$('#detError').html(objRes.message); //MENSAJE EN MODAL ERROR GENERAL
					$('#mdError1Msg').modal('show');
					$scope.errorPwd = true;
					$scope.resetFields();
	        	}else{
	        		//console.log('Se ha modificado correctamente la contraseña: ', objRes.message );
	        		$('#detInfo').html('Your Password has been updated.');
	    			$scope.pwdant = null;$scope.pwdupd1 = null;$scope.pwdupd2 = null;
	    			$('#mdInfoMsg').modal('show');
	        	}
 	        }
        };
        var failFn = function (result) {
           deferred.reject("Failed docsClassifyReload");
           unBlockPage();
		   $('#mdFatalMsg').modal('show');
        };

        var jsReqUp = {};
    	jsReqUp.idEmpresaConf = $rootScope.session.idEmpresaConf;
    	jsReqUp.idPersona = $rootScope.session.idPersona;
    	var hashPws = CryptoJS.SHA256($scope.pwdant);
    	var hashPwu1 = CryptoJS.SHA256($scope.pwdupd1);
    	var hashPwu2 = CryptoJS.SHA256($scope.pwdupd2);
    	jsReqUp.password = hashPws.toString(CryptoJS.enc.Hex); //$scope.pwdant;
    	jsReqUp.passwordUpd1=hashPwu1.toString(CryptoJS.enc.Hex);
    	jsReqUp.passwordUpd2=hashPwu2.toString(CryptoJS.enc.Hex);
    	
        commonResource.getJsonResp('PERSON.PW', jsReqUp).success(successFn).error(failFn);
	};


	$scope.openHelp = function(){
		console.log('Abriendo modal de Ayuda, el contenido debe ser por Vista');
		$('#mdMainHelp').modal('show');
	};
});
