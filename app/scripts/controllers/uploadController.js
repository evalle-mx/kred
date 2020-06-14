'use strict';
/* Controlador para carga de imagen de perfil */
dotHrApp.controller('ctrlUpload', ['$scope','$rootScope','Upload', function ($scope,$rootScope, Upload) {
		console.log("ctrlUpload...");
		$scope.errorfile=false;
		$scope.waitspan = false;
		$scope.timeclicked=0;
		
		$scope.descripcion='Profile';
		$scope.modoUpl='1';//Genera archivo y obtiene URL
		$scope.logProfile = '';
		$scope.time2click = function(){
			$scope.timeclicked++;
		}
		
	    $scope.$watch('files', function () {
	    	//console.log('$scope.files: ', $scope.files );
	    	//console.log("$watch ->...");
	    	if($scope.files!=undefined && $scope.files != null){
	    		$scope.errorfile=false;
	    		 if ($scope.files && $scope.files.length) {
	 	            for (var i = 0; i < $scope.files.length; i++) {
	 	            	var file = $scope.files[i];
	 	            	console.log('Tamaño ', file.size );
	 	                console.log('Type ', file.type );
	 	                if(file.size< 4000 || file.size>3100000){
	 	                	console.log('removiendo file...');
	 	                	$scope.files.splice(i, 1);
	 	                }
	 	            }
	 	           if ($scope.files && $scope.files.length>0) {
	 	        	   	$scope.upload($scope.files);
			    		$scope.waitspan = true;
	 	           }else{
	                    $scope.errorfile=false;
	                    $scope.waitspan = false;
	 	           }
	    		 }
	    	}else {
	    		if($scope.timeclicked>0){
	    			$scope.errorfile=true;
	    			$scope.waitspan = false;
	    		}
	    	}
	    });

	    $scope.upload = function (files) {
	    	var idTipoCont = $scope.idTipoProfile; //'2';
	    	var idContenido = $('#imgprofileIdContenido').val();
	    	
	    	var stParams = {modo:$scope.modoUpl};
	    	if($scope.tipoSujeto=='0'){ //persona
	    		stParams.idPersona=$scope.idSujeto;
	    	}
	    	if($scope.tipoSujeto=='1'){ //empresa
	    		stParams.idEmpresa=$scope.idSujeto;
	    	}
	    	if($scope.descripcion){
	    		stParams.descripcion=$scope.descripcion;
	    	}

	    	if(idContenido){
	    		stParams.idContenido=idContenido;
	    	}
	    	
	    	
	    	var upFields = { 
	            	idEmpresaconf:$rootScope.session.idEmpresaConf, 
	            	idTipoContenido: idTipoCont,
	            	stParams:stParams
	            	};
	    	
	    	console.log("<ctrlUpload> files:",files);
	    	console.log('<ctrlUpload> upFields: ', upFields);
	    	//var cteIdEmpresaConf = 3; 	//TODO moverlo a constantes
	        if (files && files.length) {
	            for (var i = 0; i < files.length; i++) {
	                var file = files[i];               
	               
	                
	                Upload.upload({
	                    url: '/upload',
	                    fields: upFields,
	                    file: file
	                }).progress(function (evt) {
	                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	                    $scope.logProfile = 'progress: ' + progressPercentage + '% ' +
	                                evt.config.file.name + '\n' + $scope.logProfile;
	                }).success(function (data, status, headers, config) {
	                    $scope.logProfile = 'file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data) + '\n'; //+ $scope.log;
	                    if(!$scope.$$phase) {
	                    	$scope.$apply();
	                    }
	                    $scope.errorfile=false;
	                    $scope.waitspan = false;
	                    $scope.replaceImgPerfil(data);
	                });
	            }
	        }
	    };
	   
	}]);
/* Controlador para carga de imagenes en galeria */
dotHrApp.controller('galleryUpload', ['$scope','$rootScope', 'Upload', function ($scope, $rootScope,Upload) {
	console.log("galleryUpload...");
	$scope.logGallery = '';
	$scope.modoUpl='1';
    $scope.$watch('files', function () {
    	//console.log("$watch ->...");
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
    	$scope.logGallery = '';
    	var idTipoCont = '2';//$scope.idTipoGaleria; //'2';
    	var idContenido = '';	//$('#imgprofileIdContenido').val();
    	
    	var stParams = {modo:$scope.modoUpl};
    	if($scope.tipoSujeto=='0'){ //persona
    		stParams.idPersona=$scope.idSujeto;
    	}
    	if($scope.tipoSujeto=='1'){ //empresa
    		stParams.idEmpresa=$scope.idSujeto;
    	}
    	if($scope.descripcion){
    		stParams.descripcion=$scope.descripcion;
    	}
    	
    	var upFields = { 
            	idEmpresaconf:$rootScope.session.idEmpresaConf, 
            	idTipoContenido: idTipoCont,
            	stParams:stParams
            	};
    	
    	//console.log("<galleryUpload> files:",files);
    	//console.log('<galleryUpload> upFields: ', upFields);
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/upload',
                    fields: upFields,
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.logGallery = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.logGallery;
                }).success(function (data, status, headers, config) {
                    $scope.logGallery = 'file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data) + '\n';
                    if(!$scope.$$phase) {
                    	$scope.$apply();
                    }
                    $scope.updateGallery(data); //$scope.replaceImgPerfil(data);
                });
            }
        }
    };
}]);


/* Controlador para carga de Documentos en Tracking */
dotHrApp.controller('trackUpload', ['$scope','$rootScope', 'Upload', function ($scope, $rootScope, Upload) {
	console.log("trackUpload...");
	$scope.modoUpl='0';
	
    $scope.$watch('files', function () {
    	//console.log("<trackUpload> $watch...");
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
    	$scope.logUpload = '';
    	console.log('$scope.trckFile: ', $scope.trckFile);
    	$scope.trckFile.logUpload='';
    	var idTipoCont = $scope.trckFile.idTipoContenido; //'3';
    	var stDescripcion = $scope.trckFile.descripcion?$scope.trckFile.descripcion:'Expediente';
    	$scope.trckFile.url='';
    	
    	var stParams = {idPersona:$scope.trckFile.idPersona,
    			descripcion:stDescripcion, modo:$scope.modoUpl
    			};
    	if($scope.trckFile.idTrackingPostulante){
    		stParams.idTrackingPostulante=$scope.trckFile.idTrackingPostulante;
    	}
    	if($scope.trckFile.idTrackingMonitor){
    		stParams.idTrackingMonitor=$scope.trckFile.idTrackingMonitor;
    	}
    	
    	var upFields = { 
            	idEmpresaconf:$rootScope.session.idEmpresaConf, 
            	idTipoContenido: idTipoCont,
            	stParams:stParams
            	};
    	
    	console.log('<trackUpload> upFields: ', upFields);    	
        if (files && files.length) {
        	console.log('<trackUpload> files:', files);
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/upload',
                    fields: upFields,
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //$scope.logGallery = 
                    $scope.trckFile.logUpload='progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.logGallery;
                }).success(function (data, status, headers, config) {
                	console.log('<success>data: ', data );
                	$scope.trckFile.logUpload='file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data) + '\n';
                    if(!$scope.$$phase) {
                    	$scope.$apply();
                    }
                    $scope.addToFase(data);
                });
            }
        }
    };
}]);