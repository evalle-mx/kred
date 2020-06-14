'use strict';
/* Constantes */
var loginPage = '../login.html';

var appCte = {POSCREADA:1, POSPUBLICADA:2, POSBUSQUEDAERROR:3, POSCUBIERTA:5, POSDESACTIVADA:6,
		idTipoContExpediente:'3', JSONUBICACION:'/resources/dothr/json/', LATITUD:19.4326018, 
		LONGITUD:-99.1332049, ENFOQUE:6, ENFOQUE_UBICACION:17};
//TODO deprecar sustituyendo en la aplicación por appCte
var statusPosicionCreada = 1;
var statusPosicionPublicada = 2;
var statusPosicionProgramada = 4;
var statusPosDesactivada = 6; 

/*Ya no debe haber idRol en codigo duro, tomarlo de la sesión*/
var usrAdm = 1;
var usrAop = 12;

var minImgSize = 4000;	//TODO reemplazarlo al recibir datos de sesion
var maxProfileSize = 1047552;
var maximgSize = 1047552;
var profTypes = 'jpg,png,bmp,gif,jpeg';//'jpg|png|bmp|gif|jpeg';
var commonPageSize = 10;

var idTipoEmpresa = 0;
var idTipoPersona = 1;
var idTipoPosicion = 2;

var tipoContPerfil = 1;
var tipoContGaleria = 2;

var statusInscripcionPublicado = 3;

var statusCandRechazado = 8;
var statusCandInvitado = 3;

var perfilPublicado = 2;
var perfilDesactivado = 6;
var perfilfAsociado = 1;
var perfilDesasociado = 0;
var perfilInterno = 4;
var idTipoPerfilPublico = 1;

var asociado = 1;
var desasociado = 0;

var tipoVerificadoModel = 3;
var tipoVerificadoIndefinido = 5;

var offLineApp = false;
var appDatePattern = 'yyyy-MM-dd';

function offLiner(elem, tipo){
	
	console.log('<utils>offLiner, elem: ', elem);
	console.log('<utils>offLiner, tipo: ', tipo);
	if(tipo==1){	//Google maps error
		console.log('Google maps error');
		elem.src='/selex/js/offline/maps.google.js';
	}
	else if(tipo==2){	//Google Jquery error
		console.log('jquery error');
		elem.src='/selex/js/offline/jquery.min.js';
	}
	else if(tipo==3){	//Google webfont error
		console.log('Google webfont error');
		elem.src='/selex/js/offline/webfont.js';
	}
	else if(tipo==4){	//Google jsapi error
		console.log('Google jsapi error');
		elem.src='/selex/js/offline/jsapi.js';
	}
	//document.getElementById('offlineJs').innerHTML = 'Writed';
	offLineApp = true;
}


/**
 * Agrega atributos especificos de un objeto dado
 * @param obj Objeto javascript
 * @param obj Nombre del atributo a agregar
 * @param obj Valor del atributo a agregar
 * @returns newObj
 */
function addAttribute(obj, name, value) {
	var newObj = obj;
	newObj[name] = value;	
	return newObj;
}

/**
 * Elimina atributos especificos de un objeto dado
 * @param objJson Objeto javascript (json)
 * @param strKey Clave del elemento a eliminar
 * @returns obj
 */
function deleteAttribute(objJson, strKey) {
	var newJson = objJson;
	for (var key in newJson) {
	    if(key == strKey){
	    	delete newJson[key];
	    }
	}		
	return newJson;
}

/**
 * Metodo Comun para (re)cargar el archivo de Catalogos en el cacheResource
 * @param $q
 * @param $route
 * @param $timeout
 * @param fileResource
 * @param cacheResource
 * @returns deferred.promise
 */
function loadCatalogues($q, $route, $timeout, fileResource, cacheResource){
	    var deferred = $q.defer();
	    var successFn = function (result) {
	        if (angular.equals(result, [])) {
	            deferred.reject("No catalogue");
	        }
	        else {
               /* console.log('<loadCatalogues,successFn> Result :',result); */
	            deferred.resolve(result[0]);
	        }
	    };
	    var failFn = function (result) {
	       deferred.reject("Failed catalogue");
	    };
	    console.log('<resolve,cataloguesResponse> Checking cache (for catalogues)');
	    /*console.log('<resolve,cataloguesResponse> Cache for catalogues :',cacheResource.get("catalogues")); */
	    var serviceCache = cacheResource.get("catalogues");
	    if(serviceCache == undefined){
	        fileResource.getCatalogue("catalogues.json",successFn, failFn);
	    }else{
	    	deferred.resolve(serviceCache);
	    }
	    return deferred.promise;
}

/*  *******   FUNCIONALIDAD PARA BLOQUEO DE PAGINA  ******   */
/**
 * Crea un div del tamaño maximo y deshabilita la escritura en la pagina, 
 * acepta un elemento HTML que se insertara en el cuerpo del Div
 * @param htmlElement
 */
function blockPage(htmlElement){
	/* console.log('bloqueando pagina con blqDiv '); */
	$('#mainmenu').hide();
	var blqDiv = $('<div class="overlay"> </div>');
	var overlay = blqDiv.prependTo('body').attr('id', 'overlay');	
	var unblDiv = $('<div class="fixedDivMsg" style="align:center;"></div>');
	if(htmlElement!=undefined && htmlElement!=null){
		unblDiv.html(htmlElement);
	}else{
		unblDiv.html('<b>Espere por favor...</b>');
	}
	unblDiv.prependTo('#overlay');
}

/**
 * Elimina el div que deshabilita la escritura en la pagina
 */
function unBlockPage(){
	 /*console.log('Desbloqueando la pagina'); */
	$('#overlay').remove();
	$('#mainmenu').show();
}

/**
* Procesa el catalogo [{"index":value, "":,] en una lista de elementos descripcion,idArea
* para plugin de chosen.js
*/
function getAreals(arrArea) {
	console.log('<utils> GetAreals.arrArea: ', arrArea);
	var arrLs = [];

	$.each(arrArea, function(index, value) {
		/*console.log('index: ', index );	console.log('value: ', value );*/
		arrLs.push({"descripcion":index, "idArea":value});
	});
	
    return arrLs;
}

/**
* Procesa catalogo [{id:descrip, ...}] en una lista de elementos [{label,value},{}] 
* para catalogo con Angular
*/
function convertCatalog(arrCat) {
	console.log('<utils> convertCatalog.arrCat: ', arrCat);
	var arrOptions = [];

	$.each(arrCat, function(index, value) {
		/*console.log('index: ', index );	console.log('value: ', value );*/
		arrLs.push({"label":index, "value":value});
	});
	
    return arrLs;
}

/*   ***********   CODIGO ENCARGADO DEL ENVIO DE PAQUETES EN MODIFICACIÓN AUTOMATICA  *******  */
/**
 * Llamada a los servicios cuando se realiza submit en las formas
 * @param commonResource Inyección del factory de recursos angular
 * @param cacheResource Inyección del cache angular
 * @returns null
 */
function processSubmitPackages(commonResource, cacheResource) {
	$('html').on('form.submitPackage', function(e) {
		console.log('<form.submitPackage> e.dataPackage :',e.dataPackage);
		console.log('<form.submitPackage> e.uriCode :',e.uriCode);
		console.log('<form.submitPackage> e.formID :',e.formID);
		//console.log('<form.submitPackage> json :',e.dataPackage); 
    console.log('toString: ', JSON.stringify(e.dataPackage));
        if (e.uriCode != undefined && e.uriCode != false) {
        	processService(commonResource, cacheResource, e.uriCode, e.dataPackage, e.formID);
        } else {
    		console.log('<form.submitPackage> No se llama servicio por uricode falso o indefinido');
        }
	});
};

/**
 * Llamada comun de los servicios
 * @param commonResource Inyección del factory de recursos angular
 * @param cacheResource Inyección del cache angular
 * @param uriCode UriCode del servicio a llamar 
 * @param inputJson Mensaje de entrada del servicio 
 * @param formID Identificador del invocador del servicio 
 * @returns response Respuesta json del servicio
 */
function processService(commonResource, cacheResource, uriCode, inputJson, formID) {
	console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> processService');
    var successCommon = function (response) {
		processSuccessResponse(uriCode,response, cacheResource, formID);        	                	
    };
    var failCommon = function (response) {
		processFailResponse(uriCode, response, formID);        	                	
    };
    commonResource.getJsonResp(uriCode,inputJson).success(successCommon).error(failCommon)
};

/**
 * Funcion que administra los mensajes de fallo de los servicios
 * @param response
 * @param idFormCaller
 */
function processFailResponse(uriCodeSource, serviceResponse, idFormCaller){
	console.log('<processFailResponse> Inicio...');
	console.log("<processFailResponse> " + uriCodeSource + " serviceResponse :",serviceResponse);		
	console.log("<processFailResponse> idFormCaller :",idFormCaller);		

	if(serviceResponse != null){
		var formObj = $('#' + idFormCaller);
		// MANEJO PARTICULAR DE MENSAJES DE RETORNO
		// MANEJO GENERAL DE MENSAJES DE RETORNO
		// Respuesta vacía 
		var serviceResponseLength = serviceResponse.length;
		if(serviceResponseLength == 0){
			console.log("<processFailResponse> Respuesta fallida pero vacía");
		}else{
			console.log('<processFailResponse> Tamaño respuesta :', serviceResponseLength);
			formObj.trigger({ type:'services.error', formID: formObj.prop('id'), response: serviceResponse});
		}
	}else{ 
		console.log("<processFailResponse> Respuesta fallida nula");
	}
	console.log('<processFailResponse> Fin...');
	
}

/**
 * Funcion que administra los mensajes exitosos de los servicios
 * @param uriCode
 * @param response
 * @param idFormCaller
 */
function processSuccessResponse(uriCodeSource,serviceResponse, cacheResource, idFormCaller){
	console.log('<processSuccessResponse> Inicio...');
	console.log("<processSuccessResponse> " + uriCodeSource + " serviceResponse :",serviceResponse);		
	console.log("<processSuccessResponse> idFormCaller :",idFormCaller);		

	if(serviceResponse != null){
		var formObj = $('#' + idFormCaller);
		if(cacheResource.get("cv.user") != undefined){
			cacheResource.remove("cv.user");
		}
		/* MANEJO GENERAL DE MENSAJES DE RETORNO */
		var serviceResponseLength = serviceResponse.length;
		if(serviceResponseLength == 0){ /*Caso UPDATE*/
			console.log("<processSuccessResponse> Respuesta exitosa pero vacía");	
		}else{
			/* Caso CREATE, DELETE Y ERROR */
			console.log('<processSuccessResponse> Tamaño respuesta :', serviceResponseLength);
			if(typeFatal(serviceResponse)){
				console.log('<processSuccessResponse> Error al procesar la petición: ', serviceResponse[0].message );
				$('#mdFatalMsg').modal('show');
				console.log('Se debe mostrar el modal mdFatalMsg!! ');
			}else if(serviceResponse[0].type!=undefined && serviceResponse[0].type=='E'){
				console.log('<processSuccessResponse> Error al procesar la petición:', serviceResponse[0].message );
				$('#detError').html(serviceResponse[0].message);
				
				if(idFormCaller == 'domicilio'){
					//$('#detError').html('Error al ubicar automaticamente, intente con el modo Manual');
					/*$('#domicilio a[href="#locManual"]').tab('show');
					/*$('.nav-tabs a[href="#locManual"]').tab('show'); */
					$('.rejectButton').click();
				}
				$('#mdError1Msg').modal('show');
			}
			else{
				if(serviceResponse[0].code != undefined && (serviceResponse[0].code == '014' || serviceResponse[0].code == 14) ) 
				//idFormCaller == 'positionInfo'){
				{
					var fScope = angular.element( formObj ).scope();
					// POSICIÓN deja de ser publicado 
					if(fScope.vacancy != undefined && fScope.vacancy.user!=undefined){
						console.log('>>>>>> fScope.vacancy.user.idEstatusPosicion: ', fScope.vacancy.user.idEstatusPosicion );
						//visibilityPublicate(false);
						$('#detInfo').html('Es requerido publicar nuevamente para hacer efectivos los cambios.');
						$('#mdInfoMsg').modal('show');
					}else if(fScope.posicion != undefined && serviceResponse[0].type=='W'){
						console.log('fScope.posicion: ', fScope.posicion );
						$('#detInfo').html('Es requerido publicar nuevamente para hacer efectivos los cambios.');
						$('#mdInfoMsg').modal('show');
					}else if(fScope.cv != undefined && fScope.cv.user!=undefined && serviceResponse[0].type=='W'){
						//console.log('fScope.cv: ', fScope.cv );
						$('#detInfo').html('Es requerido publicar nuevamente para hacer efectivos los cambios.');
						$('#mdInfoMsg').modal('show');
					}
				}
				else if(idFormCaller == 'domicilio' ){
					var fScope = angular.element( formObj ).scope();
					console.log('++++  fScope: ', fScope );
					console.log('fScope.posicion: ', fScope.posicion );
					if(fScope.posicion){
						fScope.setLocation(serviceResponse);
					}
				}
				formObj.trigger({ type:'dataPackage.success', formID: formObj.prop('id'), uriCode: uriCodeSource, response: serviceResponse });
			}
		}
	}else{ 
		console.log("<processSuccessResponse> Respuesta Nula");
	}
	console.log('<processSuccessResponse> Fin...');
}

/** 
 * (DEPRECANDO) Encargado de procesar la respuesta del error de publicación.
 */
function errorPublicate(response) {
	var errorArray = [] ;
	
	var rspLength = response.length;
	var i=0;
	response.forEach(function(item){
		/* console.log(item); console.log('i: '+i );*/
		if(item.atributoDescripcion!=undefined){
			console.log('item.atributoDescripcion: ', item.atributoDescripcion);
			var valid = true;
			/* Segmento que evita duplicados y descripciones no explicitas, dentro la descripción */
			if(item.atributoDescripcion.indexOf('preprocesamiento')!=-1 
					|| item.atributoDescripcion.indexOf('coordenada')!=-1){
				valid = false;
				/* console.log('invalido por palabra reservada: (preprocesamiento)', item.atributoDescripcion); */
			}
			if(valid){
				errorArray.forEach(function(item2){
					if(item.atributoDescripcion == item2.label){
						valid = false; //invalido por duplicidad
						/* console.log('invalido por duplicidad: ', item.atributoDescripcion); */
						return;
					}
				});
			}
			if(valid){				
				errorArray.push({indx:(i+1), label:item.atributoDescripcion});
				i++;
			}
		}
	});
	
	return errorArray;
}

/*   ***********   CODIGO PARA VACANCY/POSICION  *******  */
/**
 * Modifica la vista en la pagina de listado de posiciones/vacantes si existen o mensaje si no existen registradas
 * @param total
 * @param valActivo
 */
function emptyVacancyResult(total, valActivo){
	/* console.log('<appUtils.emptyVacancyResult>');
	console.log('total: ', total );
	console.log('valActivo: ', valActivo ); */
	if(total!=undefined && total>0){		
		$('#infoEmpty').addClass('hidden');
		$('#vcpager').removeClass('hidden');
	}else{
		//si No hay resultados
		if(valActivo == 1){
			//$('#pActivo').removeClass('hidden');
			console.log('es activo, se muestra');
		}else{
			console.log('No es activo, se oculta');
			$('#pActivo').addClass('hidden');
		}
		$('#vcpager').addClass('hidden');
		$('#infoEmpty').removeClass('hidden');
	}
}
/**
 * Realiza llamado al servicio de PROGRAMACION para la Posicion
 * @param commonResource
 * @param $rootScope
 * @param $location
 */
function vacancyProgrammingService(commonResource, $rootScope, $location, $scope, $filter){
    var successFn = function (result) {
        if (angular.equals(result, [])) {
            alert("Posición programada");
            $scope.vacancy.user.idEstatusPosicion = $scope.estatusPosicionProgramada;
            
            $scope.vacancy.user.anioProgramacion = $scope.anioProgramacion;
            $scope.vacancy.user.mesProgramacion = $scope.mesProgramacion;
            $scope.vacancy.user.diaProgramacion = $scope.diaProgramacion;
            $scope.vacancy.user.fechaProgramacion = '  al ' + $scope.diaProgramacion + '/' +
            										$scope.convMes($scope.mesProgramacion) + '/' + 
            										$scope.anioProgramacion;
            unBlockPage();
        }
        else {
        	/* Este código está definido en el servicio y corresponde al fecha inválida  */
        	console.log('<vacancyProgrammingService> result :', result);
        	if(result[0].code == '006.6'){
                alert('Fecha de programación incorrecta');        		
        	}else{
                alert("No se logró programar :" + JSON.stringify(result));
        	} 
            unBlockPage();
        }
    };
    var failFn = function (result) {
    	console.log('Failed vacancyProgrammingService');
    };
	blockPage();
    commonResource.getJsonResp('VACANCY.P',
    		'{' +
    		'"idPosicion":' + $scope.sessionvacancy.idPosicion	+ ',' +
    		'"anioProgramacion":' + $scope.anioProgramacion	+ ',' + 
    		'"mesProgramacion":' + $scope.mesProgramacion	+ ',' +
    		'"diaProgramacion":' + $scope.diaProgramacion +
    		'}' ).success(successFn).error(failFn);
}

/**
 * Actualiza la bandera de asignado de la posición, se opta por este método ya que hay una retroalimentación en el éxito del servicio
 * @param commonResource
 * @param $rootScope
 * @param $location
 */
function vacancyAssignedService(commonResource, $rootScope, $location, $scope, $filter){
    var successFn = function (result) {
        if (angular.equals(result, [])) {
            console.log("Posición asignada");
//            $scope.vacancy.user.idEmpresa = $scope.empresaLst.idEmpresa;
//            if($scope.empresaLst.idEmpresa != '""'){
//            	$scope.vacancy.user.descAsignacion = '(' + $scope.convEmpresa($scope.empresaLst.idEmpresa) + ')';
//            }else{
//            	$scope.vacancy.user.descAsignacion = '(Personal)';
//            }
            unBlockPage();
        }
        else {
            console.log("No se logró atualizar la posición :" + JSON.stringify(result));
            unBlockPage();
        }
    };
    var failFn = function (result) {
    	console.log('Failed vacancyAssignedService');
    };
	blockPage();
	console.log('$scope.empresaLst.idEmpresa: ', $scope.empresaLst.idEmpresa );
	
	if($scope.empresaLst.idEmpresa == '""'){
		//alert('empresa vacio ');
		commonResource.getJsonResp('VACANCY.U',
	    		'{' +    		
	    		'"idEmpresaConf":' + $rootScope.session.idEmpresaConf +
	    		',"idPosicion":' + $scope.sessionvacancy.idPosicion	+
//	    		'"idPersona":' + $rootScope.session.idPersona +
	    		',"personal":"true"'  +
	    		'}' ).success(successFn).error(failFn);
	}else{
		commonResource.getJsonResp('VACANCY.U',
	    		'{' +    		
	    		'"idEmpresaConf":' + $rootScope.session.idEmpresaConf	+ ',' +
	    		'"idPosicion":' + $scope.sessionvacancy.idPosicion	+ ',' +
	    		'"idEmpresa":' + $scope.empresaLst.idEmpresa +
	    		'}' ).success(successFn).error(failFn);
	}
}

/**
 * Elimina filas en un listado de collaps'es, por paso de parametros (Servicio Update) y si el resultado es positivo
 * remueve elemento dinamico en la vista
 * @param idP
 * @param scope
 */
function removeVacancyOut(commonResource, idP, uriCode, json, scope ){
	/*console.log('<utils.removeVacancyOut>...');
	console.log('idp: ' + idP ); */
	var successFn = function(response){
		console.log('response de commonResource: ');
		console.log(response);
		
		var rspLength = response.length;
		if(rspLength == 0){
			console.log('no hay detalle, por tanto es correcto');
			var tmpVacs = scope.vacantes;
		 	var myIndex = -1;
		 	for(var ix = 0; ix<tmpVacs.length; ix++){
		 		if(tmpVacs[ix].idPosicion == idP){
		 			console.log('encontrado :');
		 			console.log(tmpVacs[ix]);
		 			myIndex = ix;
		 		}
		 	}
		 	if(myIndex!=-1){
		 		console.log('se elimina elemento ' + myIndex + ' del arreglo');
		 		scope.vacantes.splice(myIndex, 1);
		 	}
		}else{
			console.log('Existe detalle [' + rspLength +'], se muestra error en pantalla');
			var msg = 'no se pudo eliminar el elemento';
			for(var i=0; i<rspLength; i++){
				console.log(response[i]);
				if(response[i].message!=undefined){
					msg = response[i].message;
				}
			}
			alert(msg);
		}
		unBlockPage();
	};
	var failFn = function(response){
		alert('error al eliminar vacante');
		unBlockPage();
	};
	blockPage();
	if(confirm('¿Desea eliminar la vacante seleccionada?')){
		commonResource.getJsonResp(uriCode, json ).success(successFn).error(failFn);
	}else{
		unBlockPage();
	}
}

/**
 * Obtiene el objeto EMPRESA de un arreglo de empresas con la condicion idEmpresa proporcionada
 * @param objJson Objeto javascript (json)
 * @param idEmpresa Identificador de la empresa a obtener
 * @returns objJson || null
 * 
 * Se ocupa en Posición edit
 */
function getCompanyObject(objJson, idEmpresa) {
	for (var i in objJson) {
		var id = objJson[i].idEmpresa;
		if(id == idEmpresa){
			/* console.log('<getCompanyObject> Empresa encontrada :',objJson[i]); */
			return objJson[i];
		}
	}
	return null;
}

/*  
 * *******************************************************************************
 * *************************  CLASSIFY / APLICANT  *******************************
 * *******************************************************************************
 */
/**
 * Procesa un elemento de Cv para mostrar los elementos de Experiencia Laboral y elementos de Historial 
 * Academico, regresando un Objeto HTML &lt;p&gt;
 * @param objCv json obtenido de Persona/posicion
 * @param catAreas catalogo de areas
 * @param idTipo tipo de entidad (1-Persona, 2-Posicion)
 * @returns
 */
function obtieneHtmlCV(objCv, catAreas, idTipo){
	console.log('en util.selex.js' );
	var htmlContent = $('<p/>');
	var divProfile = $('<div style="background-color: #F2F2F2; height:330px; overflow: auto;" />');
	var divExp = $('<div />');
	var divAcad = $('<div/>');
	
	//if(idTipo==1 || idTipo=='1'){		/* Detalle para persona */
	if(idTipo== idTipoPersona || idTipo==''+idTipoPersona){		/* Detalle para persona */
		var divHeaderCv = $('<div/>');
		divHeaderCv.append('<H1>'+objCv.nombre + ' '+objCv.apellidoPaterno + ' ' + objCv.apellidoMaterno +'</H1>');
		if(objCv.edad!=undefined){
			divHeaderCv.append('<H2> edad: '+objCv.edad +'</H2>');
		}
		if(objCv.diasExperienciaLaboral!=undefined){
			var diasExpCv = parseInt(objCv.diasExperienciaLaboral);
			divHeaderCv.append('<H3> Años experiencia laboral: '+ (diasExpCv/365).toFixed(2) +'</H3>');
		}
		
		var jsExpLaboral = objCv.experienciaLaboral;
		if(jsExpLaboral!=undefined){
			divExp.append('Experiencia Laboral:<br/>');
			$.each(jsExpLaboral, function(i, item) {
				var tempo = '('+item.anioInicio +  (item.anioFin!=undefined?'-' + item.anioFin:'')+') '
							+ (item.nombreEmpresa!=undefined?item.nombreEmpresa+': ':'' ) + item.puesto
							+ '<br>Actividades:<br> <p style="font-size:12px">'+ item.texto+'</p>';
				divExp.append(tempo).append('<br/>');
			});
			divProfile.append(divExp);
		}
		var jsHistAcad = objCv.escolaridad;	
		
		if(jsHistAcad!=undefined){
			divAcad.append('Historial Academico:<br/>');
			/*console.log('jsHistAcad: ', jsHistAcad);*/
			$.each(jsHistAcad, function(i, item2) {
				var area = '';
				if(item2.idArea !=undefined ){
					area = '> ' + obtValueInCat(item2.idArea, catAreas ) + '';
				}
				var tempo2 = '('+item2.anioInicio +  (item2.anioFin!=undefined?'-' + item2.anioFin:'')+') '
							//+ item2.nombreInstitucion + '> '+item2.titulo + area ;
							+ (item2.nombreInstitucion!=undefined?item2.nombreInstitucion+'> ':'' )
							+ (item2.texto!=undefined?item2.texto:'') + area
							+ '<br>Conocimientos:<br> <p style="font-size:12px">'+ item2.texto+'</p>' ;
				divAcad.append(tempo2).append('<br/>');
			});
			divProfile.append('<hr>').append(divAcad);
		}
		
		var aCvp = '<a href="#/cv" class="hidden">ver CV completo</a>';
		
		//htmlContent.append(divExp).append('<hr>').append(divAcad).append(aCvp);
		//htmlContent.append(divHeaderCv).append('<hr>').append(divExp).append('<hr>').append(divAcad).append(aCvp);
		htmlContent.append(divHeaderCv).append('<br><hr>').append(divProfile).append(aCvp);
	}else if(idTipo==idTipoPosicion || idTipo=='2'){		/* Detalle para posicion */
		var perfiles = objCv.perfiles;
		var divAsociados = $('<div/>');
		var divFunciones = $('<div style="background-color: #F2F2F2; height:330px; overflow: auto;" />');
		if(perfiles!=undefined){			
			$.each(perfiles, function(i, pfint) {
				if(pfint.idTipoPerfil == perfilInterno){
					var tempotextos = pfint.textos;
//					divAcad.append('- '+(i+1)).append('<br/>');
					$.each(tempotextos, function(j, textoInt) {
						var tempo4 = '&nbsp;-'+textoInt.texto;
						divFunciones.append(tempo4).append('<br/>');
					});
				}
				else{
					divAsociados.append('* ').append(pfint.nombre).append('<br/>');
				}
			});
		}
		htmlContent.append('Funciones: <br/>').append(divFunciones).append('<hr>').append(divAsociados) ;
	}
	else if(idTipo==idTipoEmpresa || idTipo=='0'){  /* Detalle para empresa */
		divExp.append('Razón Social: ').append(objCv.razonSocial).append('<br/>')
		divExp.append('Número de Empleados: ').append(objCv.numeroEmpleados).append('<br/>');
		divExp.append('Descripción: ').append(objCv.descripcion).append('<br/>');
		divExp.append('Inicio de Operaciones: ').append(objCv.diaInicio+'/'+objCv.mesInicio +'/'+objCv.anioInicio ).append('<br/>');
		
		htmlContent.append(divExp);
		
		var contactos = objCv.contacto;
		if(contactos!=undefined){
			divAcad.append('Contactos:<br/>');
			console.log('contactos:', contactos);
			$.each(contactos, function(i, cont) {
				var tmContNum = cont.numero;
				console.log('tmContNum ', tmContNum );
				divAcad.append('* '+
						(tmContNum!=undefined?('Telefono: '+(cont.codigoPais!=undefined?'['+cont.codigoPais+']':'') +
								(cont.codigoArea!=undefined?'('+cont.codigoArea+')':'') + 
								(tmContNum!=undefined?' '+ cont.numero+' ':''))
						:'') +
						(cont.contacto!=undefined?' '+ retContact(cont.contacto) + '':'')+
						'<br>');
			});
			htmlContent.append('<hr>').append(divAcad);
		}
	}
	return htmlContent;
}

function retContact(contacto){
	if(contacto.indexOf('@')!=-1){
		return 'email: '+contacto;
	}else{
		return 'skype: '+contacto;
	}
}

/**
 * Obtiene el valor del catalogo recibido (codigo duplicado de Filtros de Angular)
 * @param input (entero)
 * @param catalogo
 * @returns {String}
 */
function obtValueInCat(input, catalogo){
	if(input==undefined || input ==null){
	  input=-1;
	}
	var resp = '\u2718'; /*Default*/
	if(catalogo != undefined){
		jQuery.each(catalogo, function(txt, id) {
			if(id==input){
				resp = txt; 
				return false;
			}
        });
	}else{
		console.log('El catalogo es null');
	}
	return resp;
}

/**
 * PAGINAS: CLASSIFY | DETALLEPOS
 * Recibe un arreglo de valores, y un elemento de catalogos js, devolviendo las etiquetas
 * de los valores, concatenados con coma
 * @param selCats (arreglo de enteros)
 * @param catAreas (json de catalogo)
 * @returns {String}
 */
function interpretaAreas(selCats, catAreas){
	//console.log('selCats: ', selCats); console.log('catAreas: ', catAreas );
	var textoCats = '';
	if(catAreas!=undefined){
		if(selCats != undefined && selCats!=null){
	   		 $.each(selCats, function(i, item) {
	   			   if(isNaN(item)){
		   	   			textoCats =  ' <Sin definir> ';
	   			   }else{
		   				var vArea = obtValueInCat(item, catAreas);
		   	   			textoCats =  textoCats+'; '+vArea;   
	   			   }   			 
	         });
	   		textoCats =  textoCats.substring(1, textoCats.length);
		}
		//else{ console.log('Error, no hay valores');alert('Error, no hay valores'); }
	}
	//else{ console.log('Error, falta catalogo'); }
	return textoCats;
}

/**
 * Obtiene el arreglo objetos de areas (categorias) clasificadas en el documento Solr 
 * @param stCategorias
 * @param catAreas
 * @returns {Array}
 */
function getDocDataArray(stCategorias, catAreas){
	var respuesta = [];//[{"id":8, "nombre":"des"}];
	if(stCategorias!=undefined && stCategorias!=''){
		var objCats = stCategorias.split(",");
		var intCats = new Array();
		 $.each(objCats, function(i, stCat) {
        		intCats[i] = parseInt(stCat);
         });
		 $.each(intCats, function(j, intCat) {
			 var txto = obtValueInCat(intCat, catAreas);
			 /*console.log('txto: ', txto);*/
			 var elem = {"id":""+intCat, "nombre": txto};
			 respuesta.push(elem);
		 });
   	 }
	return respuesta;
}


/**
 * Valida si el nuevo texto existe en el catalogo
 * @param txtArea
 * @param catAreas
 * @returns {Boolean}
 */
function existeAreas(txtArea, catAreas){
	var existe = false;
	if(catAreas!=undefined){
		$.each(catAreas, function(txt, id) {
			if(txt.toLowerCase()==txtArea.toLowerCase()){				
				existe = true;
				return false;
			}
        });
	}else{
		console.log('No existe Catalogo');
	}
	return existe;
}
/**
 * Modifica la vista en la pagina de listado de Documentos Clasificados si existen o mensaje si no existen registradas
 * @param total
 * @param valActivo
 */
function emptyDocsView(total){
	console.log('<classify.emptyDocsView>');
	console.log('total: ', total );
	
	if(total!=undefined && total>0){		
		$('#infoEmpty').addClass('hidden');
//		$('#vcpager').removeClass('hidden');
		$('#tbDocs').removeClass('hidden');
		$('#btProcesar').show();
	}else{
		//si No hay resultados		
//		$('#vcpager').addClass('hidden');
		$('#tbDocs').addClass('hidden');
		$('#infoEmpty').removeClass('hidden');
		$('#btProcesar').hide();
	}
}

function setSelPadre(dataArray){
	/* console.log('<setSelPadre> DataArray: ', dataArray);  */
	$.each(dataArray, function(i, item) {
		/*  console.log(item); */
		$('#ctPadre').append('<option value="' + item.id + '">' + item.nombre + '</option>');
	});
	//ordenar
	var my_options = $("#ctPadre option");
	my_options.sort(function(a,b) {
	    if (a.text > b.text) return 1;
	    else if (a.text < b.text) return -1;
	    else return 0;
	});
	$("#ctPadre").empty().append('<option value="-1">Seleccione</option>').append( my_options );
}

/**
 * Funcionalidad y reinicio de campos para el boton de nueva categoria
 */
$('#btNueva').click(function() {
	$( '#btCatego' ).hide();
	$('#descripcion').val('');
	$('#addAreaInfo').html('');
});

/**
 * Agrega funcionalidad al campo de Nueva Categoria (area) para evitar duplicidades
 */
$( '#descripcion' ).keyup(function() {
	var keyUpArea = $('#descripcion').val();
	/*  console.log('keyUpArea(keyup): ', keyUpArea ); */
	var fScope = angular.element( $('#descripcion') ).scope();
	var catAreas = fScope.catalogues.Area;;
	
	var bExiste = existeAreas(keyUpArea, catAreas);
	if(bExiste){
		 /*  console.log(keyUpArea + ' ya existe, ocultando agregar...'); */
		 $( '#btCatego' ).hide();
		 $('#addAreaInfo').html('Ya existe categoria');
	}
	else if($.trim(keyUpArea)==''){
		$( '#btCatego' ).hide();
		$('#addAreaInfo').html('Ingrese categoria');
	}
	else{
		$( '#btCatego' ).show();
		$('#addAreaInfo').html('');
	};
});

/**
 * TEMPORAL: muestra los documentos clasificados en la consola
 */
$('#btcheckDocs').click(function() {
	var fScope = angular.element( $('#main') ).scope();
	console.log('obteniendo scope de angular: ', fScope );
	var doccs = fScope.docsclassif;
	console.log('doccs: ', doccs);
});


/* ***************************************************************************
 * ***********************  GeneraTOKENS  ************************************
 * ************************************************************************* */

function collectToks(){
	var arrayToken = new Array();
	var arrayPondera = new Array();
	var stJsTokn = '-1';

	$("input:text[name=token]").each(function(){
		 var name = $(this).attr("name");
		 var id = $(this).attr("id");
		 var val = $(this).val();
		    
		console.log('name: ', name, ", id: ", id, ', val: ', val );
		if(val==''){
			return stJsTokn;
		}
		arrayToken.push(val);
	});
	
	$("select[name=pondera]").each(function(){
		var name2 = $(this).attr("name");
		var id2 = $(this).attr("id");
		var val2 = $(this).val();
		    
		console.log('name2: ', name2, ", id2: ", id2, ', val2: ', val2 );
		if(val2==-1){
			return stJsTokn;
		}
		arrayPondera.push(val2);
	});
	console.log('arrayToken: ', arrayToken , ' length: ' , arrayToken.length);
	console.log('arrayPondera: ', arrayPondera , ' length: ' , arrayPondera.length );
	console.log('igualdad: ', arrayToken.length == arrayPondera.length);
	
	if((arrayToken.length == arrayPondera.length) && (arrayPondera.length>0)){
		stJsTokn = '';
		var jsonToken = {};
		
		console.log('arrayToken: ', arrayToken );
		console.log('arrayPondera: ', arrayPondera );
		
		for(var i=0; i<arrayToken.length;i++){
			console.log('"'+arrayToken[i]+'":'+arrayPondera[i]);
			jsonToken[arrayToken[i]] = arrayPondera[i];
			stJsTokn += '\"'+arrayToken[i]+'\":'+arrayPondera[i]+',';
		}
		
		stJsTokn = '{'+stJsTokn.substring(0, stJsTokn.length-1)+'}';
	}
	console.log(stJsTokn);
	return stJsTokn;
}


/*  *******   FUNCIONES PARA EMPRESA-PERSONA  ****** */
/**
 * Realiza petición para crear nueva empresa relacionada con la persona
 */
function createCompany(stRfc, stRazonSocial, stTipoRel, commonResource, $scope, $rootScope, $location){
	console.log('<createCompany> Creating company...');
	console.log('<createCompany> rfc: ', stRfc);
	console.log('<createCompany> razonSocial: ', stRazonSocial);
	console.log('<createCompany> tipo Relacion: ', stTipoRel);
	
    var successFn = function (result) {
		console.log('<createCompany> result', result);
        if (angular.equals(result, [])) {
            console.log('<createCompany> Failed create company because empty or fatal');
            //TODO implementar manejo de error
        }
        else {
        	//existe resultado, pero se debe evaluar para cerrar modal o mostrar error
        	if(result[0].name != undefined && result[0].name=='idEmpresa'){
        		console.log('se creo la empresa, se oculta mdAlta ...');
            	$('#mdAlta').modal('hide');
            	$location.path('/eupd/' + result[0].value);
        	}
        	if(result[0].name != undefined && result[0].name=='rfc'){
        		console.log('No se pudo crear la empresa: ', result[0].message);
        		$('#mdErrorAlta').html(result[0].message);//setTimeout ("alert ('Redireccionando a vista previa de empresa existente');", 5000); 
        		alert(result[0].message);
        		$('#btAgregar').removeAttr('disabled');
        		$('#addRfc').val('');
    		 	$('#addRazonsocial').val('');
    		 	findCompany(stRfc, null, commonResource, $scope, $rootScope, $location);
        		$('#mdErrorAlta').html('');
        	}
        	else{
        		console.log(result[0]);
        		$('#mdErrorAlta').html(result[0].message);
        	}
        }
    };
    var failFn = function (result) {
    	console.log('Failed newPosition');
    	$('#mdErrorAlta').html('<b>' + 'Error al crear nueva empresa' + '</b>');
    };
    
    commonResource.getJsonResp('COMPANY.C',
    		'{"idEmpresaConf":"' + $rootScope.session.idEmpresaConf + '","idPersona":"' + $rootScope.session.idPersona
			+ '","idRol":"' + stTipoRel + '","rfc":"' + stRfc + '","razonSocial":"' + stRazonSocial
    		+ '"}' ).success(successFn).error(failFn);
}


/**
 * Realiza busqueda de empresa por medio del RFC y/p la razón social proporcionada
 */
function findCompany(stRfc, stRazonSocial, commonResource, $scope, $rootScope, $location){
	console.log('<findCompany> Finding company...');
	console.log('<findCompany> rfc: ', stRfc);
	console.log('<findCompany> razonSocial: ', stRazonSocial);
	
	var successFindFn = function (result) {
		$('#btBusqueda').removeAttr('disabled');
		console.log('<findCompany> result', result);
        if (angular.equals(result, [])) {
        	$('#mdErrorBusqueda').html('<b>' + 'No se encontraron empresas con los parametros' + '</b>');
            console.log('<findCompany> No se encontraron empresas con los parametros');
        }
        else {
        	//existe resultado, pero se debe evaluar para cerrar modal o mostrar error
        	if(result[0].code != undefined && result[0].type != undefined ){//Existio error
        		$('#mdErrorBusqueda').html('<b>' + 'Error en la operacion' + '</b>');
        		console.log('<findCompany> Existe error en operacion: ', result[0].message);
        		console.log('<findCompany> Respuesta: ', result );
        	}else{//Es arreglo de empresas:
        		$scope.empresasEnc = result;
        		$('#companiesList').addClass('hidden');
				$('#searchList').removeClass('hidden');//formEmpresasEnc
				$('#btShMyEmpr').removeClass('hidden');
        		
        		$('#updRfc').val('');
    		 	$('#updRazonsocial').val('');
        		$('#mdBusq').modal('hide');
        		$('#mdAlta').modal('hide');
        	}
        }
    };
    var failFindFn = function (result) {
    	$('#mdErrorBusqueda').html('<b>' + 'Error al buscar empresas' + '</b>');
    	console.log('<findCompany> Failed find Company\'s');
    };
    
    var paramRfc = '', paramRazonSocial = '';
    if(stRfc!=undefined && stRfc!=''){
    	paramRfc = ', "rfc":"'+stRfc+'"';
    }
    if(stRazonSocial!=undefined && stRazonSocial!=''){
    	paramRazonSocial = ', "razonSocial":"'+stRazonSocial+'"';
    }
    
    console.log('{"idEmpresaConf":"' + $rootScope.session.idEmpresaConf + paramRfc + paramRazonSocial + '}');
    commonResource.getJsonResp('COMPANY.FS',
    		'{"idEmpresaConf":"' + $rootScope.session.idEmpresaConf +'", "idPersona":"'+$rootScope.session.idPersona+'" ' + paramRfc + paramRazonSocial + '}' ).success(successFindFn).error(failFindFn);
}

/**
 * Valida por medio de una expresión regular si la cadena stRfc es un RFC valido para la entidad
 * de tipo Type
 * @param stRfc Cadena de RFC
 * @param type  TIpo de Entidad (1=empresa)
 * @returns true/false 
 */
function validRfc(stRfc, type) {
	console.log('<validRfc>: ' +stRfc + "*"+type);
	if(stRfc==undefined || stRfc ==''){
		return false;
	}else{
		var stRegExp = '^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$';//Persona (default)
		var inSize = 13; 
		if(type==idTipoEmpresa){
			stRegExp = '^[A-Z]{3}[0-9]{6}[A-Z0-9]{3}$';//empresa
			inSize = 12;
		}
		
		if(stRfc.length==inSize){
			   if(stRfc.toUpperCase().match(new RegExp(stRegExp) ) ){
					/*console.log('longitud valida'); */
					return true;
				}else{
					console.log('<validRfc>E: formato RFC incorrecto');
					return false;
				}
		}else{
			console.log('<validRfc>E: RFC No tiene la longitud esperada');
			return false;
		}
	}
}

/**
 * Actualiza la asociación determinada con la empresa
 */
function updateAssociation(jsonRequest, commonResource, $scope, $rootScope, $location){
	console.log('<updateAssociation> update association to company...');
	console.log('<updateAssociation> jsonRequest: ', jsonRequest);
	var successFn = function (result) {
		console.log('<updateAssociation> result', result);
		if (angular.equals(result, [])) {
            console.log('<updateAssociation> OK, se ha actualizado la relación');
            //TODO recargar los resultados de busqueda y asociaciones
            $('#btEnviar').removeClass('hidden');
            $('#mdSolicitud').modal('hide');
        }else {
        	console.log(result[0]);
    		$('#mdInfoAnex').html(result[0].message);
        }
	};
	
	var failFn = function (result) {
    	console.log('Failed update request');
    	$('#mdInfoAnex').html('<b>' + 'Error al actualizar la relación' + '</b>');
    };
    
    commonResource.getJsonResp('ASSOCIATE.U', JSON.stringify(jsonRequest) )
    .success(successFn).error(failFn);
}
/**
 * Envia json para cancelar la solicitud de anexión
 * @param jsonRequest
 * @param commonResource
 * @param $scope
 * @param $rootScope
 * @param $location
 */
function cancelAssociation(jsonRequest, commonResource, $scope, $rootScope, $location){
	console.log('<cancelAssociation> Cancel Request association to company...');
	jsonRequest.idPersonaEjecutor = jsonRequest.idPersona;
	jsonRequest.operacionRelacion = 'CANCELA';
	
	console.log('<cancelAssociation> jsonRequest: ', jsonRequest);
	$('#btAnex').addClass('hidden');
	$('#btCancelReq').addClass('hidden');
	var successFn = function (result) {
		console.log('<cancelAssociation> result', result);
		if (angular.equals(result, [])) {
            console.log('<cancelAssociation> OK, se ha cancelado la solicitud');
            $('#mdInfoAnex').html('Se ha cancelado tu solicitud correctamente');
            $('#btCancel-'+jsonRequest.idEmpresa).hide();
            //TODO recargar los resultados de busqueda y asociaciones
        }else {
        	console.log(result[0]);
    		$('#mdInfoAnex').html(result[0].message);
        }
	};
	
	var failFn = function (result) {
    	console.log('Failed cancel request');
    	$('#mdInfoAnex').html('<b>' + 'Error al cancelar la solicitud' + '</b>');
    };
	
    commonResource.getJsonResp('ASSOCIATE.U',
    		JSON.stringify(jsonRequest) )
    		.success(successFn).error(failFn);
};

/**
 * Envia json de solicitud de anexion a servicio
 * @param jsonRequest
 * @param commonResource
 * @param $scope
 * @param $rootScope
 * @param $location
 */
function requestAssociation(jsonRequest, commonResource, $scope, $rootScope, $location){
	console.log('<requestAssociation> Request association to company...');
	console.log('<requestAssociation> jsonRequest: ', jsonRequest);
	$('#btAnex').addClass('hidden');
	var successFn = function (result) {
		console.log('<requestAssociation> result', result);
		if (angular.equals(result, [])) {
            console.log('<requestAssociation> Failed to request company because empty or fatal');
            //TODO implementar manejo de error
        }else {
        	//existe resultado, pero se debe evaluar para cerrar modal o mostrar error
        	if(result[0].name != undefined && result[0].name=='idRelacionEmpresaPersona'){
        		console.log('se obtuvo el id de la solicitud '+result[0].value + ' se oculta mdAnexion ...');
        		$('#btmdClbj').removeClass('hidden');
            	$('#mdAnexion').modal('hide');
            	$('#btAdd-'+jsonRequest.idEmpresa).hide();
            	//TODO Recargar las relaciones (solicitudes)
        	}
        	else{
        		console.log(result[0]);
        		$('#mdInfoAnex').html(result[0].message);
        	}
        }
		//$('#btAnex').removeClass('hidden');
	};
	
	var failFn = function (result) {
    	console.log('Failed newPosition');
    	$('#mdInfoAnex').html('<b>' + 'Error al enviar solicitud de asociación' + '</b>');
    };
    commonResource.getJsonResp('ASSOCIATE.C', JSON.stringify(jsonRequest) )
    	.success(successFn).error(failFn);
}

/**
 * Realiza llamado al servicio de PUBLICACION para Empresa
 * @param commonResource
 * @param $rootScope
 * @param $location
 */
function companyPublicationService(commonResource, $rootScope, $location){
    var successFn = function (result) {
        if (angular.equals(result, [])) {
            alert("Empresa publicada");
            unBlockPage();
        }
        else {
            alert("No se logró publicar :" + JSON.stringify(result));
            unBlockPage();
        }
    };
    var failFn = function (result) {
    	console.log('Failed companyPublicationService');
    };
	blockPage();
	console.log('publicando empresa: ', $rootScope.sessioncompany.idEmpresa);
    commonResource.getJsonResp('COMPANY.P',
    		'{' + '"idEmpresaConf":' + $rootScope.session.idEmpresaConf	+ ',' + '"idEmpresa":' + $rootScope.sessioncompany.idEmpresa	+ '}' )
    		.success(successFn).error(failFn);
}

/**
 * Vacancy. Funcion Encargada de filtrar los perfiles, regresando una lista
 * sin los perfiles asociados en la posicion
 * @param perfiles
 * @param asociados
 * @returns {Array}
 */
function getPerfilesDisponibles(perfiles, asociados){
	console.log('<getPerfilesDisponibles> depurando perfiles sin asociar: ');
	console.log('perfiles: ', perfiles );
	var perfDisp = [];

	/* validar si es Error/notificacion de sistema: */
	if(perfiles!=undefined && perfiles.length>0){
		var jsZero = perfiles[0];
		if(jsZero.code!=undefined && jsZero.type!=undefined ){
			console.log('No es un arreglo de perfiles valido ');
		}else{
			var idPerf1 = ''; 	var idAsoc = ''; var noAsociado = true;
			$.each(perfiles, function(i, item) {
				noAsociado = true;
				idPerf1 = item.idPerfil;
				$.each(asociados, function(j, item2) {
					idAsoc = item2.idPerfil;
					if(idAsoc==idPerf1){
						//item2.idEstatusPerfil = item.idEstatusPerfil;
						noAsociado = false;
					}
				});
				
				if(noAsociado){
					perfDisp.push(item);
				}
			});
		}
	}
	return perfDisp;
}

/* ***************************************************************************************
 * ******        PANTALLA DE DETALLE POSICION (Aplicant) ::: ***************
 * ***************************************************************************************
 * */

function detalleDesdeEstatus(estatus, causas){
	var spanRetro = '';
	if(estatus!=undefined && estatus>0){
		if(causas==undefined){
			causas = '<b>No especificadas</b>';
		}
		var detNuevo =  '<span class="dhrIcon-eye-blocked"></span> Algunos datos del candidato serán omitidos hasta que el candidato acepte una invitación suya.';
		 var detInvitado =  '<span class="dhrIcon-envelope"></span> Se ha enviado una invitación al candidato y aún no se recibe respuesta.';
		 var interesado = '<span class="dhrIcon-checkmark-circle"></span> El candidato ha aceptado su invitación.<br><span class="dhrIcon-eye"></span> Ya puede ver todos los datos del candidato.';
		 var noInteresado = '<span class="dhrIcon-cancel-circle"></span> El candidato rechazó su invitación por las siguientes causas: ';
		 var rechazado = '<span class="dhrIcon-cancel-circle"></span> Usted rechazó al candidato por las siguientes causas: ';
		 /*1->Nuevo; 2->Modificado; 3->Visto; 4->En espera; 5->Inactivo; 6->Aceptado (por candidato); 
		  7->Rechazado (por candidato); 8->Aceptado (por contratante); 9->Rechazado por contratante 'otro'->indeterminado; //*/
		 var seleccionado = '<span class="dhrIcon-handshake"></span> Se ha seleccionado el candidato. ';
		 var inactivo = '<span class="dhrIcon-warning"></span>La información del Candidato ha sido modificada y no ha sido republicada. ';
		 
		 /* 1->Nuevo; 2->Visto; 3->Invitado; 4->Inactivo; 5->Interesado; 6->No interesado; 7->Aceptado; 8->Rechazado; 9->Seleccionado */
		 if(estatus == 1 || estatus == 2){
			 spanRetro= detNuevo;
		 }else if(estatus == 3){
			 spanRetro = detInvitado;
		 }else if(estatus == 4){
			 spanRetro = inactivo;
		 }else if(estatus == 5 || estatus == 7){
			 spanRetro = interesado;
		 }else if(estatus == 6){
			 spanRetro = noInteresado +causas+'.';
		 }else if(estatus == 8){
			 spanRetro = rechazado+causas+'.';
		 }else if(estatus == 9){
			 spanRetro = seleccionado;
		 }else {
			 spanRetro = detNuevo;
		 }
	}
	 return spanRetro;
}

/**
 * Genera una etiqueta para desplegar, donde se detalla situación de visibilidad
 * de información derivada de HandShake
 * Se utiliza en la vista de Resultado busqueda Candidatos
 * @param estatus
 * @param causas
 * @returns {String}
 */
function detalleDesdeEstatusEmp(estatus, causas){
	var spanRetro = '';
	if(estatus!=undefined && estatus>0){
		if(causas==undefined){
			causas = '<b>No especificadas</b>';
		}
		 var detNuevo =  '<span class="dhrIcon-location-3"></span> Seleccione Contactar para enviar una notificación a la empresa.';
		 var detInvitado =  '<span class="dhrIcon-envelope"></span> Se ha enviado una solicitud a la empresa.';
		 var interesado = '<span class="dhrIcon-checkmark-circle"></span> La empresa ha visto su solicitud.';
		 var noInteresado = '<span class="dhrIcon-cancel-circle"></span> La empresa ha rechazado su solicitud: ';
		 var rechazado = '<span class="dhrIcon-cancel-circle"></span> Usted rechazó a la empresa por las siguientes causas: ';
		 /*1->Nuevo; 2->Modificado; 3->Visto; 4->En espera; 5->Inactivo; 6->Aceptado (por candidato); 
		  7->Rechazado (por candidato); 8->Aceptado (por contratante); 9->Rechazado por contratante 'otro'->indeterminado; //*/
		 var seleccionado = '<span class="dhrIcon-handshake"></span> Se ha seleccionado el candidato. ';
		 var inactivo = '<span class="dhrIcon-warning"></span>La información del Candidato ha sido modificada y no ha sido republicada. ';
		 
		 /* 1->Nuevo; 2->Visto; 3->Invitado; 4->Inactivo; 5->Interesado; 6->No interesado; 7->Aceptado; 8->Rechazado; 9->Seleccionado */
		 if(estatus == 1 || estatus == 2){
			 spanRetro= detNuevo;
		 }else if(estatus == 3){
			 spanRetro = detInvitado;
		 }else if(estatus == 4){
			 spanRetro = inactivo;
		 }else if(estatus == 5 || estatus == 7){
			 spanRetro = interesado;
		 }else if(estatus == 6){
			 spanRetro = noInteresado +causas+'.';
		 }else if(estatus == 8){
			 spanRetro = rechazado+causas+'.';
		 }else if(estatus == 9){
			 spanRetro = seleccionado;
		 }else {
			 spanRetro = detNuevo;
		 }
	}
	 return spanRetro;
}

/**
 * FUNCION QUE DETERMINA INICIALMENTE SI EL SERVICIO ES FATAL Y ENVIAR UN TRUE
 * @param transResponse
 * @returns {Boolean}
 */
function typeFatal(transResponse){
//	console.log('<typeFatal>');
//	console.log('<typeFatal> transResponse : ', transResponse );
	var resp = transResponse[0];
//	console.log('<typeFatal> transResponse[0] : ', transResponse[0] );
	
	if(resp!=undefined && resp.type=='F'){
		return true;
	}
	
	return false;
}


function visibilityPublicate(bPublicate){
	console.log('<visibilityPublicate>: ', bPublicate);
	if(bPublicate){
		$('.publicado').addClass('hidden');
		$('.search').removeClass('hidden');
	}else{
		$('.search').addClass('hidden');
		$('.publicado').removeClass('hidden');
	}
}

/* Procesa un arreglo para generar un menu/submenu a partir del arreglo de entrada, funciona recursivamente [navigate.js > $scope.getMenuTemplate]*/
function formatMenuArray2(arrMenu, nivel){
	//console.log('<formatMenuArray> ', arrMenu);
  	var plantilla = '';
  	arrMenu.forEach(function(item, i){
		 //console.log(item); console.log('i: '+i );
		console.log('<formatMenuArray> item: ', item);
		console.log('<formatMenuArray> nivel: ', nivel);
		if(item.ruta){
			//console.log('es hoja (ruta): ', item.ruta);
			plantilla+= ' <li><a href="'+ item.ruta +'"><span class="dhr-routelk">'+ item.etiqueta +'</span></a></li> ';			
		}else if(item.elementos){
			//console.log('es Rama (etiqueta): ', item. etiqueta);
			plantilla+= '<li class="dropdown-submenu ' + (nivel==0?'':'pull-left')  +'"> '+
			'<a href><span class="dhr-routelk">'+ item.etiqueta +'</span></a> '+
			'<ul class="dropdown-menu">'
				+ formatMenuArray(item.elementos, (nivel+1))+
			'</ul>'+'</li> ';
		}
	});

	return plantilla;
}


/* Procesa un arreglo para generar un menu/submenu a partir del arreglo de entrada, funciona recursivamente [navigate.js > $scope.getMenuTemplate]*/
function formatMenuArray(arrMenu, nivel){
	//console.log('<formatMenuArray> ', arrMenu);
	var topNivel=1;
	var espacios='';
	var iconHijo='&raquo;&nbsp;';
  	var plantilla = '';
  		
  	arrMenu.forEach(function(item, i){
		//console.log(item); console.log('i: '+i );
		//console.log('item: ', item);  		
  		//console.log('*************** --> nivel: ', nivel);
  		
  		//Dependiendo el nivel se pone los espacios(tabs)
  		//esto se hace para ver los hios de cada padre
  		if(nivel > topNivel){
  			for (var i = topNivel; i < nivel; i++) {
  				espacios+='&emsp;';
  			}
  		}  		
  		
  		//si es hoja
		if(item.ruta){
			//console.log('es hoja (etiqueta): ', item.etiqueta);
			//console.log('es hoja espacios: ', espacios);
			plantilla+= ' <li><a href="'+ item.ruta +'"> <span class="dhr-routelk">';
			
			//Dependiendo del nivel se aplica el num de espacios
		 	//Tambien se adjunta un icono a la hoja
			if(nivel > topNivel){
				plantilla+=espacios+iconHijo;
				espacios='';
			}
			plantilla+= item.etiqueta +'</span></a></li> ';

		//si es rama
		}else if(item.elementos){
			//console.log('es Rama (etiqueta): ', item.etiqueta);
			//console.log('es Rama espacios: ', espacios);

			//Solo para el nivel cero
			 if(nivel==0){
			   	plantilla+= '<li>'+
			   		'<a aria-expanded="false" href="" class="dropdown-toggle " data-toggle="dropdown">'+ item.etiqueta +'<span class="caret"></span></a>'+
			   		'<ul class="dropdown-menu" role="menu">'+
			   		formatMenuArray(item.elementos, (nivel+1))+
			   		'</ul>'+
			   		'</li>';
			  //nivel > 0
			 }else {
				 	plantilla+= '<li class="dropdown-header">';
				 	
				 	//Dependiendo del nivel se aplica el num de espacios
				 	//Tambien se adjunta un icono a la rama
				 	if(nivel > topNivel){
				 		plantilla+=espacios+iconHijo;
				 		espacios='';
					}
			 		plantilla+=item.etiqueta 
			 		/* +' <span class="glyphicon glyphicon-list" style="float: right;"></span>' */
			 		+'</li>' + formatMenuArray(item.elementos, (nivel+1));
			 }
		}
	});

	return plantilla;
}


/**
 * Clona un objeto JS
 * @param obj Objeto javascript
 * @returns obj copiado
 */
function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}


function fnPreValidaCV(cvpersona){
	console.log('<fnPreValidaCV> cvpersona ', cvpersona);
	var acadVal = '';
	var expVal = '';
	var errorPubList = [];
		if(cvpersona.idEstadoCivil == undefined){
	 		console.log('Estado Civil es requerido');
	 		errorPubList.push({"atributoValor": "idEstadoCivil", "atributoDescripcion":"Estado Civil es requerido"});
	 	}
	 	if(cvpersona.idTipoDispViajar == undefined){
	 		console.log('Disponibilidad para Viajar es requerido');
	 		errorPubList.push({"atributoValor": "idTipoDispViajar", "atributoDescripcion":"Disponibilidad para Viajar es requerido"});
	 	}
		if(cvpersona.nombre == undefined){
	 		console.log('Nombre es requerido');
	 		errorPubList.push({"atributoValor": "nombre", "atributoDescripcion":"Nombre es requerido"});
	 	}
	 	if(cvpersona.apellidoPaterno == undefined){
	 		console.log('Apellido Paterno es requerido');
	 		errorPubList.push({"atributoValor": "apellidoPaterno", "atributoDescripcion":"Apellido Paterno es requerido"});
	 	}
	 	if(cvpersona.email == undefined){
	 		console.log('Correo Electrónico es requerido');
	 		errorPubList.push({"atributoValor": "email", "atributoDescripcion":"Correo Electrónico es requerido"});
	 	}
	 	if(cvpersona.anioNacimiento == undefined){
	 		console.log('Año nacimiento es requerido');
	 		errorPubList.push({"atributoValor": "anioNacimiento", "atributoDescripcion":"Año nacimiento es requerido"});
	 	}
	 	if(cvpersona.mesNacimiento == undefined){
	 		console.log('Mes de Nacimiento es requerido');
	 		errorPubList.push({"atributoValor": "mesNacimiento", "atributoDescripcion":"Mes de Nacimiento es requerido"});
	 	}
	 	if(cvpersona.idTipoGenero == undefined){
	 		console.log('Genero es requerido');
	 		errorPubList.push({"atributoValor": "idTipoGenero", "atributoDescripcion":"Genero es requerido"});
	 	}
	 	if(cvpersona.salarioMin == undefined){
	 		console.log('Salario Minimo es requerido');
	 		errorPubList.push({"atributoValor": "salarioMin", "atributoDescripcion":"Salario Minimo es requerido"});
	 	}
	 	if(cvpersona.salarioMax == undefined){
	 		console.log('Salario Maximo es requerido');
	 		errorPubList.push({"atributoValor": "salarioMax", "atributoDescripcion":"Salario Maximo"});
	 	}
	 	if(cvpersona.permisoTrabajo == undefined){
	 		console.log('Permiso de Trabajo es requerido');
	 		errorPubList.push({"atributoValor": "permisoTrabajo", "atributoDescripcion":"Permiso de Trabajo es requerido"});
	 	}
	 	if(cvpersona.cambioDomicilio == undefined){
	 		console.log('Cambio de Domicilio es requerido');
	 		errorPubList.push({"atributoValor": "cambioDomicilio", "atributoDescripcion":"Cambio de Domicilio es requerido"});
	 	}
	 	if(cvpersona.disponibilidadHorario == undefined){
	 		console.log('Disponibilidad de Horario es requerido');
	 		errorPubList.push({"atributoValor": "disponibilidadHorario", "atributoDescripcion":"Disponibilidad de Horario es requerido"});
	 	}

	 	if(cvpersona.localizacion == undefined || cvpersona.localizacion.length < 1){
	 		console.log('La localización es requerida' );
	 		errorPubList.push({"atributoValor": "localizacion", "atributoDescripcion":"La localización es requerida"});
	 	}else{
	 		if(cvpersona.localizacion[0].googleLatitude == undefined){
	 		console.log('Latitud es requerido' );
	 		errorPubList.push({"atributoValor": "localizacion", "atributoDescripcion":"La Latitud no es correcta, vuelva a capturar la ubicación"});
		 	}
		 	if(cvpersona.localizacion[0].googleLongitude == undefined){
		 		console.log('Longitud es requerido' );
		 		errorPubList.push({"atributoValor": "localizacion", "atributoDescripcion":"La Longitud no es correcta, vuelva a capturar la ubicación"});
		 	}
	 	}
	 	
	 	if(cvpersona.contacto == undefined || cvpersona.contacto.length <1){
	 		console.log('Al menos un contacto es requerido' );
	 		errorPubList.push({"atributoValor": "contacto", "atributoDescripcion":"Al menos un contacto es requerido"});
	 	}

	 	/* cvpersona.alMenosUnaEscOExp  ==  true*/
	 	if(cvpersona.escolaridad == undefined && cvpersona.experienciaLaboral == undefined){
	 		console.log('Es requerido al menos una Escolaridad o Experiencia Laboral' );
	 		errorPubList.push({"atributoValor": "persona", "atributoDescripcion":"Es requerido al menos una Escolaridad o Experiencia Laboral"});	
	 	}else{
	 		if(cvpersona.escolaridad != undefined && cvpersona.escolaridad.length>0){
				$.each(cvpersona.escolaridad, function(i, item) {				      		
				      		if(item.nombreInstitucion == undefined){
				      			console.log('Escolaridad['+i+'].nombreInstitucion ');	
				      			if(acadVal==''){
				      				acadVal = 'Datos incompletos en Escolaridad ';
				      			}
				      		}
				      		if(item.idGradoAcademico == undefined){
				      			console.log('Escolaridad['+i+'].idGradoAcademico ');	
				      			if(acadVal==''){
				      				acadVal = 'Datos incompletos en Escolaridad ';
				      			}
				      		}				      		
				      		if(item.idEstatusEscolar == undefined){
				      			console.log('Escolaridad['+i+'].idEstatusEscolar ');	
				      			if(acadVal==''){
				      				acadVal = 'Datos incompletos en Escolaridad ';
				      			}
				      		}
				      		if(item.mesInicio == undefined){
				      			console.log('Escolaridad['+i+'].mesInicio ');	
				      			if(acadVal==''){
				      				acadVal = 'Datos incompletos en Escolaridad ';
				      			}
				      		}
				      		if(item.anioInicio == undefined){
				      			console.log('Escolaridad['+i+'].anioInicio ');	
				      			if(acadVal==''){
				      				acadVal = 'Datos incompletos en Escolaridad ';
				      			}
				      		}
				      		/*
				      		if(item.mesFin == undefined && item.trabajoActual == undefined){
				      			console.log('Escolaridad['+i+'].mesFin ');	
				      			if(acadVal==''){
				      				acadVal = 'Datos incompletos en Escolaridad ';
				      			}
				      		}
				      		if(item.anioFin == undefined && item.trabajoActual == undefined){
				      			console.log('Escolaridad['+i+'].anioFin ');	
				      			if(acadVal==''){
				      				acadVal = 'Datos incompletos en Escolaridad ';
				      			}
				      		}
				      		if(item.texto == undefined){
				      			console.log('Escolaridad['+i+'].texto ');	
				      			if(acadVal==''){
				      				acadVal = 'Datos incompletos en Escolaridad ';
				      			}
				      		}
				      		*/
				});
	 		}
	 		if(cvpersona.experienciaLaboral != undefined && cvpersona.experienciaLaboral.length>0){
				$.each(cvpersona.experienciaLaboral, function(i, item) {
				      		//console.log('item: ', item );				      		
				      		if(item.idNivelJerarquico == undefined){
				      			console.log('Experiencia['+i+'].idNivelJerarquico ');	
				      			if(expVal==''){
				      				expVal = 'Datos incompletos en Experiencia Laboral ';
				      			}
				      		}
				      		if(item.idTipoJornada == undefined){
				      			console.log('Experiencia['+i+'].idTipoJornada ');	
				      			if(expVal==''){
				      				expVal = 'Datos incompletos en Experiencia Laboral ';
				      			}
				      		}
				      		if(item.mesFin == undefined && item.trabajoActual == undefined){
				      			console.log('Experiencia['+i+'].mesFin ');	
				      			if(expVal==''){
				      				expVal = 'Datos incompletos en Experiencia Laboral ';
				      			}
				      		}
				      		if(item.anioFin == undefined && item.trabajoActual == undefined){
				      			console.log('Experiencia['+i+'].anioFin ');	
				      			if(expVal==''){
				      				expVal = 'Datos incompletos en Experiencia Laboral ';
				      			}
				      		}
				      		if(item.genteACargo == undefined){
				      			console.log('Experiencia['+i+'].genteACargo ');	
				      			if(expVal==''){
				      				expVal = 'Datos incompletos en Experiencia Laboral ';
				      			}
				      		}
				      		if(item.anioInicio == undefined){
				      			console.log('Experiencia['+i+'].anioInicio ');	
				      			if(expVal==''){
				      				expVal = 'Datos incompletos en Experiencia Laboral ';
				      			}
				      		}
				      		if(item.mesInicio == undefined){
				      			console.log('Experiencia['+i+'].mesInicio ');	
				      			if(expVal==''){
				      				expVal = 'Datos incompletos en Experiencia Laboral ';
				      			}
				      		}
				      		if(item.nombreEmpresa == undefined){
				      			console.log('Experiencia['+i+'].nombreEmpresa ');	
				      			if(expVal==''){
				      				expVal = 'Datos incompletos en Experiencia Laboral ';
				      			}
				      		}
				      		if(item.puesto == undefined){
				      			console.log('Experiencia['+i+'].puesto ');	
				      			if(expVal==''){
				      				expVal = 'Datos incompletos en Experiencia Laboral ';
				      			}
				      		}
				      		/*if(item.texto == undefined){
				      			console.log('Experiencia['+i+'].texto ');	
				      			if(expVal==''){
				      				expVal = 'Datos incompletos en Experiencia Laboral ';
				      			}
				      		}*/
				});
	 		}
	 	}
	 	if(acadVal!=''){
	 		console.log('acadVal ', acadVal);
	 		errorPubList.push({"atributoValor": "escolaridad", "atributoDescripcion":acadVal});
		}
		if(expVal!=''){
			console.log('expVal ', expVal);
			errorPubList.push({"atributoValor": "experienciaLaboral", "atributoDescripcion":expVal});
		}

	 	if(cvpersona.areaPersona == undefined){
	 		console.log('Es requerido escoger un área principal');
	 		errorPubList.push({"atributoValor": "areaPersona", "atributoDescripcion":"Es requerido escoger un área principal"});
	 	}else{
	 		var tienePrincipal = false;
	 		$.each(cvpersona.areaPersona, function(i, item) {
				//console.log('item: ', item );
				if(item.principal!=undefined){
					tienePrincipal = true;
					cvpersona.areaPrincipal = item.lbArea;
				}
			});
	 		if(!tienePrincipal){
	 			console.log('Tiene areas, pero no un área principal');
	 			errorPubList.push({"atributoValor": "areaPersona", "atributoDescripcion":"Es requerido escoger un área principal"});
	 		}
	 	}

	return errorPubList;
}
/**
 * Funcion que válida los campos requeridos en la posición para publicar
 * (Debe contener los valores de la tabla empresa_parámetro)
 * @param cvposicion
 * @returns {Array}
 */
function fnPreValidaPos(cvposicion){
	console.log('cvposicion ', cvposicion);
	var errorPubList = [];

	if(cvposicion.idAmbitoGeografico == undefined || cvposicion.idAmbitoGeografico == null ){
		errorPubList.push({"atributoValor": "idAmbitoGeografico", "atributoDescripcion":"El ámbito Geográfico es requerido"});
	}
	if(cvposicion.puesto == undefined || cvposicion.puesto == null ){
		errorPubList.push({"atributoValor": "puesto", "atributoDescripcion":"El nombre de la Vacante es requerido"});
	}
	if(cvposicion.domicilios == undefined || cvposicion.domicilios == null || cvposicion.domicilios.length < 1){
		errorPubList.push({"atributoValor": "domicilios", "atributoDescripcion":"La ubicación de la Vacante es requerido"});
	}
	if(cvposicion.salarioMin == undefined || cvposicion.salarioMin == null){
		errorPubList.push({"atributoValor": "salarioMin", "atributoDescripcion":"El salario Mínimo de la Vacante es requerido"});
	}
	if(cvposicion.salarioMax == undefined || cvposicion.salarioMax == null){
		errorPubList.push({"atributoValor": "salarioMax", "atributoDescripcion":"El salario Máximo de la Vacante es requerido"});
	}

	if(cvposicion.domicilios != undefined && cvposicion.domicilios.length > 0){
		if(cvposicion.domicilios[0].googleLatitude == undefined){
			errorPubList.push({"atributoValor": "googleLatitude", "atributoDescripcion":"La Latitud no es correcta, Re-capture la ubicación"});
		}
		if(cvposicion.domicilios[0].googleLongitude == undefined){
			errorPubList.push({"atributoValor": "googleLongitude", "atributoDescripcion":"La Longitud no es correcta, Re-capture la ubicación"});
		}
	}

	if(cvposicion.asignada == undefined || cvposicion.asignada == null){
		errorPubList.push({"atributoValor": "asignada", "atributoDescripcion":"Es requerido asignar la Vacante a una Persona/Empresa"});
	}
	if(cvposicion.perfiles == undefined || cvposicion.perfiles == null || cvposicion.perfiles.length < 1){
		errorPubList.push({"atributoValor": "domicilios", "perfiles":"Se requiere que existan funciones que describan a la posición "});
	}
	if(cvposicion.area == undefined || cvposicion.area == null){
		errorPubList.push({"atributoValor": "area", "atributoDescripcion":"El Área de la Vacante es requerido"});
	}

	return errorPubList;
}

//regresa un valor boolean de string
function parseBoolean(cadena){		 
	if(cadena != undefined  ){
		 if (typeof cadena === "boolean") {
			 return cadena;
		 }else if (typeof cadena === 'string') {
			 if(cadena.toLowerCase() == 'true'){
				return true
			 }else if(cadena.toLowerCase() == 'false'){
				 return false;
			 }
		 }
			
	}
}

function setBootstrapElements(){
	//console.log('activando funcionalidad Bootstrap');
	$('[data-toggle="popover"]').popover();
	$('[data-toggle="tooltip"]').tooltip();
}

function setProfFunctional(){
	//console.log('Activando funcionalidad de Imagen (setProfFunctional)');
	setBootstrapElements();
	$('#dvimgprofileMain').click(function(){//function muestraUpl(){ 
		console.log('muestraUpl desde Profile');
		$('#imgPerfilAngular').modal();
	});
//	$('[data-toggle="popover"]').popover();
	
	//$('#dvimgprofileMain').popover('show');
}

/*  ($scope.tracking, 1)*/
function convertTracking(arregloEdos, idEdoInicial){
	var trackPhases = [];
	var tmpEstados = arregloEdos; //[{},{},....,{}]
	console.log('<convertTracking> Tracking contiene '+ tmpEstados.length + ' estados ');

	tmpEstados.forEach(function(estado, index1) {
			//console.log('Estado: ', estado);
		
		var edoOrden = parseInt(estado.orden);
		var idEsquemaPerfilPosicion = estado.idEsquemaPerfilPosicion?estado.idEsquemaPerfilPosicion:undefined;
		var phase = null;
		var nuevo = false;
		if(isNaN(estado.orden)){
			edoOrden=0;
		}
		trackPhases.forEach(function(fase, index2){
			//console.log('Fase: ', fase );
			if(fase.idOrden===edoOrden){
				phase = fase;
				//TODO return
			}
		});
		if(phase == null){
			phase = {idOrden:edoOrden, estados:[]};
			if(idEsquemaPerfilPosicion){
				phase.idEsquemaPerfilPosicion = idEsquemaPerfilPosicion;
			}
			nuevo = true;
		}
		estado.idEstado=idEdoInicial;
		estado.idOrden = edoOrden;
		//FIx para fechas
		if(estado.fechaInicio!=undefined){
			estado.dateInicio= new Date(estado.fechaInicio);			
		}
		if(estado.fechaFin!=undefined){
			estado.dateFin= new Date(estado.fechaFin);
		}
		
		phase.estados.push(estado);
		if(nuevo){
			trackPhases.push(phase);	
			//$scope.reziseForm();
		}
		idEdoInicial++;
	});
	console.log('# Fases: ', trackPhases.length );
	return trackPhases;
}

/**
* Recibe Date y regresa cadena formato: 2018-12-19 00:00:00 
*/
function dothrDate(fecha,bSeg) {
	console.log('fecha.day: ', fecha.getDate() );
	var dia = fecha.getDate();
	console.log('fecha.month: ', fecha.getMonth() ); //Sumarle 1
	var mes = fecha.getMonth()+1;
	console.log('fecha.year: ', fecha.getFullYear() );
	
	//yyyy-MM-dd HH24:MI:SS
	var stDate = fecha.getFullYear()+'-'+ (mes<10?'0':'')+mes  +'-'+(dia<10?'0':'')+dia +''
	if(bSeg==1){
		stDate = stDate+' '+ (fecha.getHours()<10?'0':'') +fecha.getHours()+':'+ 
			(fecha.getMinutes()<10?'0':'') + fecha.getMinutes() + ':' + 
			(fecha.getSeconds()<10?'0':'') + fecha.getSeconds();
	}else{
		stDate = stDate+' 00:00:00';
	}
	return stDate;
}

function getIdRelTrack(arrayTrack){
	console.log('arrayTrack: ', arrayTrack );
	var idRel = undefined;
	arrayTrack.forEach(function(edo, index){
		console.log('Estado: ', edo );
		console.log('Estado.idTrackingEsquemaRel: ', edo.idTrackingEsquemaRel );
		if(edo.idTrackingEsquemaRel!=undefined){
			idRel =  edo.idTrackingEsquemaRel;
//			alert('encontrado '+idRel)
			return false;
		}
	});
	console.log('regresando idRel ', idRel );
	return idRel;
}

/*function isEmptyVal(dato){
	//Se utiliza if(dato) directamente, al existir y no ser blank, regresa true
	
	var resp = true;
	if(dato==undefined || dato==null){
		resp=false;
	}
	if(dato==''){
		resp=false;
	}
	if(dato)
}*/

function enableAllTheseDays(date, enableDays) {
    var sdate = $.datepicker.formatDate( 'dd/mm/yy', date)
    //console.log(sdate);//Imprime los días que corresponden al cuadro en calendario
    if($.inArray(sdate, enableDays) != -1) {
        return [true];
    }
    return [false];
};

/* OBtiene el prototipo solicitado dentro de un elemento div-item, para llenar carrusel, (workexp, acad) */
function obtieneNewItem(idDivPrototype){
	//objCarousel.data('prototype')
	var objetoHtml = $(idDivPrototype).data('prototype');//.html();//$('#workExperiencePrototype').html();
	
	//objetoHtml.removeClass('hidden');  //.addClass('new_class');
	var newItem = $('<div class="item"/>').html(objetoHtml);//.append($('#innerFormWExp').clone()).html();//*/
	
	//console.log(newItem);
	return newItem;
}


function invertDate(stFecha){
	console.log('fecha Original: ', stFecha)
	let nuevaFecha = ''
	if(stFecha.length>9){
		let diaIn = stFecha.substring(0, 2)
		let mesIn = stFecha.substring(3, 5)
		let anioIn = stFecha.substring(6, 10)
		nuevaFecha = anioIn+'-'+mesIn+'-'+diaIn; //
	}
	return nuevaFecha
}

function calcPorcent(numero, total){
	//console.log('numero: ', numero, ', total: ', total)
	let porcentaje= (numero / total)*100
	//console.log('porcentaje: ', porcentaje.toFixed(2))
	return porcentaje.toFixed(2)
}