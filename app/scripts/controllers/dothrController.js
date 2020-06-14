dotHrApp
.controller('mainController',function($scope,$rootScope,$routeParams, $location, $route, $filter, $window, 
		commonResource, fileResource, cacheResource, $templateCache){
	$scope.reloadattemp = 0;
	$scope.alertMessage = 'TCE rutas y servicios';
	$scope.resultUploadMsg = '';
	$scope.uploadedResultFail = [];	
	$scope.errorPublicationList = [];
	
	$scope.env={
			rolCand:'3', vMonitor:'1',stTrue:'1'
				};
	$scope.constante={
			rolCand:'3', stBTrue:'1',stBFalse:'0'
				};
	$scope.trackGraph = {
			commonWidth:950, 
			commonExtraWidth:125
			};


	/**
	 * Error genérico recibiendo la respuesta de falla de comunicación
	 */
	$scope.commonFailFn = function (result) {
	    unBlockPage();
	    $('.modal').modal('hide');
	    console.log('<Failed> Error al procesar la petición: ', result );
  		$('#mdFatalMsg').modal('show');
	};

	/*  */
	/**
	 * Remueve un elemento de cualquier arreglo por medio de 'reflexion' 
	 * $scope.findAndRemove( [], 'idObj', idObj );
	 */
	$scope.findAndRemove = function(array, property, value) {
		/*console.log('dothrCtrl.findAndRemove:');*/
		array.forEach(function(result, index) {
		    if(result[property] === value) {
		      //Remueve del arreglo
		      array.splice(index, 1);
		    }    
		  });
	};
	/**
	 * Obtiene el objeto requerido en un arreglo cuando su property tiene el valor 'value'
	 * $scope.findAndGet( [], 'idObj', idObj );
	 */
	$scope.findAndGet = function(array, property, value) {
		var object = null;
//		console.log('dothrCtrl.findAndGet:');
//		console.log('value: ', value);
		array.forEach(function(result, index) {
//			console.log('result: ', result );
//			console.log('result[property]: ', result[property] );
			console.log('result[property] === value:', result[property] === value);
		    if(result[property] === value) {
		    	console.log('se encontro objeto')
		    	object = result;
		    	return object;
		    }    
		  });
		return object;
	};
	/**
	 * Hace validación y si el parámetro no se encuantra, regresa el nombre del parámetro
	 */
	$scope.findRequerido = function(parametro, objTmp){
	//function(arrParams, arrayObj){
		console.log('dothrCtrl.findRequerido:');
		var msg = '';
		var count = 0;		
		var faltaParametro = objTmp[parametro] == undefined;
		
		if(faltaParametro){
			console.log('faltaParametro: ', parametro );
			msg = parametro+', ';
			//alert('falta parametro '+parametro);
			count++;
		}
		if(count!=0){
			//console.log( msg.length-1);
			msg = msg.substring(0, msg.length-2);
		}else{
			msg = undefined;
		}
		return msg;
	}

	/**
	 * Itera el arreglo de parametros en el objeto, para 
	 * determinar los faltantes
	 */
	$scope.validaRequeridos = function(arrParams, objTmp){
		console.log('dothrCtrl.validaRequeridos: ', objTmp);
		var msg = '';
		var count = 0;		
		//var faltaParametro = false;
		$.each(arrParams, function(i, item) {
      		//console.log('item: ', item );Buscando Item
      		if(objTmp[item] == undefined || objTmp[item] == ''){
      			console.log('faltaParametro: ', item );
				msg = msg+' '+item+',';
				//alert('falta parametro '+parametro);
				count++;	
      		}
    	});
		if(count!=0){
			//console.log( msg.length-1);
			msg = msg.substring(0, msg.length-1);
			if(count==1){
				msg = msg+ ' es requerido';
			}
			else{
				msg = msg+ ' Son requeridos';
			}
		}else{
			msg = undefined;
		}

		return msg;
	};

	/**
	 * Obtiene el listado de faltantes dentro del objeto
	 * de los parámetros del arreglo
	 */
	$scope.getFaltantes = function(arrParams, objTemp){
		console.log('dothrCtrl.getFaltantes: ', objTemp);
		var faltantes = [];
		//dhr-inputError
		$.each(arrParams, function(i, item) {
      		//console.log('item: ', item );Buscando Item
      		if(objTemp[item] == undefined || objTemp[item] == ''){
      			console.log('faltaParametro: ', item );
				faltantes.push(item);	
      		}
    	});

		return faltantes;
	};

	/* valida si existen los elementos en el objeto, regresa objeto con datos
    TODO reemplazar a 'validaRequeridos' en dothrController */
	  $scope.getVal = function(arrElems, objeto){
	    //console.log('getVal: arrElems: ', arrElems);
	    //console.log('objeto: ', objeto);
	    var validacion = {completo:true, msg:'', porcentaje:0, faltantes:[]};
	    var count=0;
	    if(objeto){
	        $.each(arrElems, function(index, item){
	          //console.log('se busca '+item);
	          if(objeto[item]){
	            //console.log('existe ' );
	            count++;  
	          }
	          else{
	            //console.log('No se encontro');
	            validacion.completo = false;
	            validacion.faltantes.push(item);
	          }
	        });
	        if(validacion.completo!=true){
	          validacion.msg = 'Existen datos faltantes ['+ (arrElems.length-validacion.faltantes.length)+'/'+arrElems.length+']';

	        }else{
	          validacion.porcentaje = 100;
	        }
	    }else{
	      validacion = {completo:false, msg:'', porcentaje:0, faltantes:arrElems};
	    }

	    return validacion;
	  };

	/** obtener area del Objeto Area */
	$scope.getAreaById = function(stArea, elemJson){
    	var idArea = parseInt(stArea);
    	var elemRet=null;
    	//console.log('idArea: ', idArea);
    	//console.log('elemJson: ', elemJson);
      	$.each(elemJson, function(i, item) {
      		//console.log('item.idArea: ', item.idArea );
      		//console.log('item.idArea==idArea: ', parseInt(item.idArea)==idArea );
    		if(parseInt(item.idArea)==idArea ){
    			elemRet = item;
    			return false;
    		}
    	});
    	return elemRet;
      };
	
    /**
     * Convierte un arreglo de objetos, en un listado de [{label,value}]
     * @array arreglo a procesar
     * @propLabel propiedad a convertir en etiqueta
     * @propValue propiedad a convertir en valor
     * i.e.: $scope.getNumOptions($scope.lsRol, 'descripcion','idRol');
     */
    $scope.getNumOptions = function(array, propLabel, propValue) {
  		console.log('<getNumOptions> array: ', array);
  		var optJson = []; 
  		$.each(array, function(i, itemObj) {
  			/*console.log('itemObj: ', itemObj );
  			console.log('propLabel: ', itemObj[propLabel] );
  			console.log('propValue: ', itemObj[propValue] );*/
  			var idOpt = parseInt(itemObj[propValue]);
  			optJson.push({label:itemObj[propLabel], value:idOpt});
  		});
  		return optJson;
  	};
  	
  	/**
  	 * Convierte un catalogo en un arreglo de Json para Options
  	 * uso: $scope.getOptsCat($scope.catalogues.EstatusInscripcion)
  	 */
  	$scope.getOptsCat = function(catObj){
  		var optJson = [];
  		$.each(catObj, function(descrip, id){
    		/*console.log('label: ', descrip ); console.log('value: ', id );*/
    		optJson.push({label:descrip, value:id});
    	});
  		return optJson;
  	};
  	
  	/**
	 * Realiza el calculo de dimensiones para el grafico de Tracking's
	 */
	$scope.getGraph = function(arrPhases){
		console.log('arrPhases: ', arrPhases );
		var graph = {initWidth:$scope.trackGraph.commonWidth, 
				extraWidth:$scope.trackGraph.commonExtraWidth};
		console.log('arrPhases.length: ', arrPhases.length );
		
		if(arrPhases.length>7){
			var dif = arrPhases.length-7;
			var extra = graph.extraWidth*dif;
			graph.dynaWidth = graph.initWidth+extra;
		}else{
			graph.dynaWidth = graph.initWidth;
		}
		return graph;
	};
  	
  	/**
  	 * Procesa un arreglo de Tracking y lo convierte en un arreglo de Fases para Diagrama DotHR
  	 * uso: phases=$scope.convertTracking(modelo.tracking);
  	 */
  	$scope.convertTracking = function(arregloTracks){
  		var graphPhases = [];
  		console.log('<convertTracking> arreglo contiene '+ arregloTracks.length + ' estados ');

  		//Itera Actividades de Plantilla/Esquema/TrackPersona
  		arregloTracks.forEach(function(track, index1) {
  				console.log('Estado: ', track);
  			
  			var iOrden = 0;
  			var idEsquemaPerfilPosicion = track.idEsquemaPerfilPosicion?track.idEsquemaPerfilPosicion:undefined;
  			var idModeloRscPos = track.idModeloRscPos?track.idModeloRscPos:undefined;
  			var phase = null;
  			var nuevo = false;
  			//parseInt(track.orden);//convierte en entero el orden de BD
  			if(isNaN(track.orden)){			
  				iOrden=0;
  			}else{
  				iOrden = parseInt(track.orden);//convierte en entero el orden de BD;
  			}
  			
  			if(track.activo){
  				track.filActivo = track.activo == '1'?3:4;
  			}
  			graphPhases.forEach(function(fase, index2){
  				//console.log('Fase: ', fase );
  				if(fase.iFase===iOrden){
  					phase = fase; /* La fase ya existe */
  					//TODO return
  				}
  			});
  			
  			if(phase == null){/* Si fase no existe se crea una nueva */
  				phase = {iFase:iOrden, actividades:[]};
  				if(idEsquemaPerfilPosicion){
  					phase.idEsquemaPerfilPosicion = idEsquemaPerfilPosicion;
  				}
  				if(idModeloRscPos){
  					phase.idModeloRscPos = idModeloRscPos;
  				}
  				nuevo = true;
  			}
  			track.iFase = iOrden;
  			//FIx para fechas en calendario
  			if(track.fechaInicio!=undefined){
  				track.dateInicio= new Date(track.fechaInicio);
  			}
  			if(track.fechaFin!=undefined){
  				track.dateFin= new Date(track.fechaFin);
  			}
  			
  			phase.actividades.push(track); /* se agrega al contenedor Fase */
  			if(nuevo){/* si es nueva Fase, la agrega al arreglo mayor */
  				graphPhases.push(phase);
  			}
  		});
  		console.log('# Fases (Contenedores): ', graphPhases.length );
  		return graphPhases;
  	};
  	/**
  	 * Despliega la informacion de Formato de Compensacion en un modal
  	 */
  	$scope.verFormato = function(cvpersona){
		console.log('<dhrController> verFormato ', cvpersona );
		$scope.pformato = {};

		if(cvpersona.idPersona!=undefined){
			var jsReq = {idEmpresaConf:$rootScope.session.idEmpresaConf, idPersona:cvpersona.idPersona };

			var successFn = function (result) {
				$('.modal').modal('hide');
				$scope.pformato = result[0];
				$('#mdCompen').modal('show');
			};
			var failFn = function (result) {
			    console.log('<Failed> Error al procesar : ', result);
		  		$('#mdFatalMsg').modal('show');
			};
			commonResource.getJsonResp('COMPENSATION.R', jsReq ).success(successFn).error(failFn);
		}
	};
	/**
	 * Manda una petición al servicio de Creacion de archivo binario en Servidor que retorna
	 * url y es desplegado en nueva pantalla
	 */
	$scope.exportFcomp = function (objFormato, tipo) {
		$scope.errexport='';
		console.log('objFormato para obtener idPersona ', objFormato);
		console.log('tipo de archivo: ', tipo);
		var idPersona = objFormato.idPersona;
		
		var successFn = function (result) {
			console.log('<successFn> result ', result );
			if (angular.equals(result, []) || result[0].value == undefined ) { //Error
					$('#mdCompen').modal('hide');
                 $('#detError').html(result[0]!=undefined?result[0].message:'Error al generar archivo'); //MENSAJE EN MODAL ERROR GENERAL
			    $('#mdError1Msg').modal('show');
	        }
	        else {
	        	if (result[0].name != undefined && result[0].name == 'url') {//Success
		            var url = result[0].value;
		            console.log('abrir documento: ', url );
		            var resPop = $window.open(url, '_blank');
		            console.log('resPop ', resPop );
		            if(resPop == null || resPop== undefined){
		            	$scope.errexport='Desactive el bloqueador de nuevas ventanas e intente nuevamente ';
		            }
	        	}
	        	else{ //Error controlado
				$scope.errexport='Error de sistema '+ (result[0]!=undefined?': '+result[0].message:'') ;
	            }
	        }
		};
		
		var failFn = function (result) {
	    	console.log('<FailFn> result ', result );
	    	console.log('<failFn> Error al procesar la petición: ', serviceResponse[0].message );
	    	$('#mdFatalMsg').modal('show');
	    };
	    
	    var jsReq = {idEmpresaConf:$rootScope.session.idEmpresaConf , idPersona:idPersona, 
	    		idSolicitante:$rootScope.session.idPersona};
	    if(tipo){
	    	jsReq.tipoArchivo = tipo;
	    }
	    //TODO verificar uso de esta:
	    jsReq.idTipoDocumento = '2';
	    
	    commonResource.getJsonResp('REPORT.C', jsReq )
	    		.success(successFn).error(failFn);
	};
	
	$scope.exportcvPersona = function (objPersona, tipo) {
		console.log('exportando info de persona ', objPersona);
		console.log('tipo de archivo: ', tipo);
		
		$('.modal').modal('hide');
		let idPersona = objPersona.idPersona;
		let repParams ='';
		
		if(!$scope.rpParams){
			console.log('no existe objeto de rpParams, se establecen parámetros por defecto')
			$scope.rpParams = {imgp : 1, nom : 1, dir : 1, sal : 1, gen : 1, cont : 1, edoc : 1, cdom : 1, dhora : 1, dviaj : 1};
		}
		let cont = 1
		$.each($scope.rpParams, function(valor, activo) {
			/*console.log('valor: ', valor, ' activo: ', activo); */			
			if(activo==1){
				repParams +=valor+','
			}
  		});
		
		var successFn = function (result) {
			console.log('<successFn> result ', result );
				if (angular.equals(result, []) || result[0].value == undefined ) {					
                    $('#detError').html(result[0]!=undefined?result[0].message:'Error al generar archivo'); //MENSAJE EN MODAL ERROR GENERAL
		    		$('#mdError1Msg').modal('show');
	            }
	            else {
	            	if (result[0].name != undefined && result[0].name == 'url') {
	            		var url = result[0].value;	            		
	            		console.log('abrir documento: ', url );
	            		var resPop = $window.open(url, '_blank');
	            		console.log('resPop ', resPop );
	            		if(resPop == null || resPop== undefined){
		                    $('#detError').html('Desactive el bloqueador de nuevas ventanas e intente nuevamente ' ); //MENSAJE EN MODAL ERROR GENERAL
				    		$('#mdError1Msg').modal('show');
	            		}
	            	}else{
	                    $('#detError').html((result[0]!=undefined?result[0].message:'') ); //MENSAJE EN MODAL ERROR GENERAL
			    		$('#mdError1Msg').modal('show');			    		
		            }
	            }
	        }

		var failFn = function (result) {
		    console.log('<Failed> Error al procesar : ', result);
	  		$('#mdFatalMsg').modal('show');
		};
		/* console.log('Generando Archivo CV (persona) ', idPersona , ', repParams: ', repParams); */
	    let jsReq = {idEmpresaConf:$rootScope.session.idEmpresaConf, idPersona: idPersona,
	    		idSolicitante:$rootScope.session.idPersona, repParams:repParams, idTipoDocumento:'1'}
	    if(tipo){
	    	jsReq.tipoArchivo = tipo;
	    }
		commonResource.getJsonResp('REPORT.C', jsReq ).success(successFn).error(failFn);
	}
  	
  	/* ====================================================== */
      
	// Evento que se dispara justo antes de cambiar de ruta
	$rootScope.$on('$routeChangeStart', function (event, next, current) {
		// Verifica que la sesión cliente esté activa, si no es asi, se dirige a la pantalla de login
		//$scope.activeSession();
        blockPage();
    });
	
	// Evento que se dispara si el cambio de ruta fué exitoso
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $scope.alertMessage = 'Servicios iniciales cargados';
        $scope.newLocation = $location.path();
        $scope.reloadattemp=0;
        unBlockPage();
    });

	// Evento que se dispara si hubo algún error al cambiar de ruta
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
    	console.log('ERROR AL CARGAR RUTA: ', rejection);
    	
    	if(angular.equals(rejection, [])){
    		//console.log('El resultado esperado era diferente a Vacio: []');
    		alert('El resultado esperado era diferente a Vacio: []');
    		$('#auxDetAppMsg').html('El resultado esperado era diferente a Vacio: []');
    	}
    	else if(rejection[0]!=undefined){
    		if(rejection[0].type=='F'){
    			console.log('mostrar Modal de Error Fatal con Logout');   
    			$('#auxDetAppMsg').html(rejection[0].message);
        		$('#mdFatalMsg').modal('show');
        	}else if(rejection[0].type=='E'){
        		console.log('mostrar Modal de Error con Logout');
        		$('#auxDetAppMsg').html(rejection[0].message);
        		$('#mdFatalMsg').modal('show');
        	}
    	}
    	else {
    		 unBlockPage();
    	     $location.path('/');
    	}
        $scope.alertMessage = 'Falla al aplicar servicios iniciales' + rejection;
//        if($scope.reloadattemp < 3){
//        	$scope.reloadattemp++;
//        	$route.reload();
//        }
//        else{
//        	alert("Error al cargar ruta: " + rejection);
//        }
        unBlockPage();
        $location.path('/');
    });
    
	/**
	 *  Función que realiza de forma indirecta el logput de la aplicación a través del cambio de ruta
	 */
	$scope.destroyAll = function() {
        $location.path( "/logout" );
	};

	/** FUNCION PARA ENVIAR EL PAQUETE DESDE EL CONTEXTO DE ANGULAR */
	$scope.angSubmitPackage = function (dataPackageS, uriCodeS, formIdS){
		console.log('<angSubmitPackage>');
		console.log('<angSubmitPackage> dataPackageS: ', dataPackageS);
		console.log('<angSubmitPackage> uriCode: ', uriCodeS);
		console.log('commonResource: ', commonResource );
		console.log('cacheResource: ', cacheResource );
		//alert('angSubmitPackage');
		processService(commonResource, cacheResource, uriCodeS, dataPackageS, formIdS );
	};

	/* ================   ARCHIVOS BINARIOS/IMAGENES **************** */
	/* MENSAJE DE  ERROR EN CARGA DE IMAGEN */
	$scope.labelAcceptedProfile = 'Únicamente archivos de imagen ('+ profTypes
		+ ') mayores a '+ Math.round(minImgSize/1024) +' KB y menores a '+ Math.round(maxProfileSize/1024) + ' KB';
	
	/* Reinicia el mensaje de error en CARGA DE IMAGEN */
	$scope.cleanuploadmsg = function(){
		console.log('<cleanuploadmsg> reinicia error ', $scope.resultUploadMsg);
		$scope.resultUploadMsg = '';
	};
	/**
	 * Reemplaza la imagen de perfil en CV
	 */
	$scope.replaceImgPerfil= function(dataResponse){
		console.log('<mainControllers.replaceImgPerfil> dataResponse: ', dataResponse);
		var imagenUrl = '';
		var idContenido = '';
		
		$.each(dataResponse, function(i, item) {
			/* console.log('imagenPerfilReload() --> item:', item); */
		  	var mCode = item.code;
		  	var mName = item.name;
		  	
		  	if(item.type && item.type == 'I'){
		  		if(mName.toLowerCase() == 'url'){
		  			imagenUrl = item.value;
		  		}
		  		if(mName == 'idContenido'){
		  			idContenido= item.value;
		  		}
		  	}else{
		  		console.log('escribiendo mensaje en mainController ', item.message);
		  		$scope.resultUploadMsg = item.message;
		  		//alert(item.message);
		  	}
		 });
		/*console.log('imagenUrl: ', imagenUrl ); console.log('idContenido: ', idContenido ); */
		if(imagenUrl !='' &&  idContenido !=''){
			console.log('XXXXXXXXXXXXXXX  VERIFICAR FUNCIONAMIENTO CON NG-SRC EN LA CARGA ');
			   $('#imgprofileMain').attr('src', imagenUrl );
	           $('#imgprofileIdContenido').val(idContenido);
	           $('#imgPerfilAngular').modal('hide');
	           $scope.resultUploadMsg ='';
			}
		else{
				console.log('error al cargar imagen de perfil');
				//$scope.resultUploadMsg ='error al cargar imagen de perfil';
			}
	};

	/**
	 * Funcionalidad para generar contenido en una nueva pantalla
	 */
	$scope.openLinkContenido = function(idContenido, idPosicion){ //idEmpresa
    	console.log('Abrir contenido por Flush idContenido=', idContenido );
    	blockPage('Solicitando el archivo al sistema...');
    	var jsReq = {idEmpresaConf:$rootScope.session.idEmpresaConf, idContenido: idContenido};
    	if(!idPosicion){
    		jsReq.idPersona= $rootScope.session.idPersona; 
    	}
    	
    	var successFn = function (result) {
    		unBlockPage();
    		console.log('result: ', result);
	        if(!angular.equals(result, [])) 
	        {
	        	if(result[0].url){
	        		var url = result[0].url;
		        	
		        	var resPop = $window.open(url, '_blank');		        	
		    		console.log('resPop ', resPop );
		    		if(resPop == null || resPop== undefined){
		                $('#detError').html('Desactive el bloqueador de nuevas ventanas e intente nuevamente ' ); //MENSAJE EN MODAL ERROR GENERAL
		        		$('#mdError1Msg').modal('show');
		    		}else{
		    			resPop.title=result[0].fileDescripcion?result[0].fileDescripcion:'Documento';
		    		}
	        	}
	        	else{
	        		$('#detError').html('<b>Existió un error al solicitar el archivo</b>'
	        				+ result[0]?': '+result[0]:'' );
	        		$('#mdError1Msg').modal('show');
	        	}
	        	
	        }
	        else{
	        	$('#detError').html('No existen archivos ' );
        		$('#mdError1Msg').modal('show');
	        }
	    };
	    var failFn = function (result) {
	    	unBlockPage();
	    	console.log('Failed file.read: ', result);
	    	//console.log('<failFn> Error al procesar la petición: ', serviceResponse[0].message );
  			$('#mdFatalMsg').modal('show');
	    };
	    
	    commonResource.getJsonResp('FILE.R', jsReq ).success(successFn).error(failFn);    	
	};	


});/*// -fin de mainController

/* ******************* Home Controler (Default) ********************** */
dotHrApp
.controller('home', function($rootScope,$scope, $http, $location, SessionStorage) {
	console.log(" Welcome --> Home");
	if(SessionStorage.retrieve('idPersona')!=undefined && SessionStorage.retrieve('logged')==undefined){
		var mRolp = SessionStorage.retrieve('rol');
		//console.log(' initial  Modal...');
		//console.log('$rootScope.session: ', $rootScope.session );
//	    $('#infoModalcv').modal('show');
	}
});