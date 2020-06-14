'use strict';

/* Filters */

angular.module('dothrFilters', [])
.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
})
.filter('yesno', function() {
  return function(val) {
	  if(val==1){
		  return 'Si';
	  }else{
		  return 'No';
	  }
  };
})
.filter('obtieneDesc', function() {
	/* obtiene el texto asociado al Id en input de un catalogo */
	return function(input, catalogo){
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
	};
})
.filter('getDesc', function() {
	/* obtiene el texto asociado al Id en input de un catalogo */
	return function(input, catalogo, textDef){
		if(input==undefined || input ==null){
		  input=-1;
		}
		var resp = textDef;
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
	};
})
/*  **** ETIQUETAS (Label) en base a ID ****** */
.filter('lbEmpresa', function(){
	/*  obtiene nombre de empresa desde listado */
	return function(input, listEmpresa, lbDefault){
		/* console.log('empresas en filtro: ', listEmpresa );*/
		var lbEmp = lbDefault;
		jQuery.each(listEmpresa, function(i, item) {
			if(input === item.idEmpresa){
				lbEmp = item.razonSocial;
			}
        });
		return lbEmp;
	};
})
.filter('labelinYears', function(){
	/*  año/años dependiendo el valor */
	return function(input){
		if(input ===1 || input === 0){
			return input + ' año';
		}else{
			return input + ' años';
		}
	};
})
/* Generico para cuando titulo es null*/
.filter('emptyTitle', function() {
	/* Etiqueta por defecto en caso de vacio o nulo */
	return function(input) {
	    return input ? input : '< Sin titulo >';
	  };
})
/* cadena null > N/A */
.filter('emptyNa', function() {
	/* Etiqueta por defecto en caso de vacio o nulo */
	return function(input) {
	    return input ? input : 'N/A';
	  };
})
/*  **** Iconos/Codigo HTMLa partir de dato de entrada ****** */
.filter('iconStatusPosition', function() {
	/* obtiene icono dothr (arbitraria por definicion) en base a numero de entrada, para lista vacantes REPLICAR VALOR INPUT DE BD*/
  return function(input) {
	  if(input==undefined || input ==null){
		  input=1;
	  }
	return input==1 ? 'pie-0' : input==2? 'checkmark-circle': input==3? 'warning': input==5? 'handshake':'cancel-circle';
	//1->Creada| 2->Publicada| 3->Búsqueda con error| 5->Cubierta| 6->Desactivada
  };
})
.filter('EstatusEmpresa', function() {
	/* obtiene icono dothr (arbitraria por definicion) en base a numero de entrada, para lista de Empresas REPLICAR VALOR INPUT DE BD */
  return function(input) {
	  if(input==undefined || input ==null){
		  input=4;
	  }
	return input==1 ? 'notification' : input==3? 'checkmark-circle': input==4? 'cancel-circle':'warning';
	//1->notification; 3->checkmark-circle; 4->cancel-circle; 'otro'->warning;
  };
})
.filter('EstatusClassif', function() {
	/* obtiene icono dothr (arbitraria por definicion) en base a numero de entrada para pag de clasificacion*/
	return function(input) {
		  if(input==undefined || input ==null){
			  input=4;
		  }
		return input==1 ? 'star-2' : input==2? 'star-3': input==3? 'checkmark-circle' : input==4? 'yen2' : input==5? 'cancel-circle' :'star';
		//1->Parcialmente Clasificada; 2->Clasificada; 3->Verificada; 4->Semilla; 'otro'->No Clasificada o indeterminado;
	  };
})
.filter('vistoClass', function() { 
	/* obtiene class (cadena) de estilos en base a numero de entrada de estatus operativo, pag de dataList Detalle Posicion*/
	return function(input) {
		  if(input==undefined || input ==null){
			  input=4;
		  }
		return input==1 ? 'positive' : '';
	  };
})
.filter('tipoDocClassif', function() {
	/* obtiene icono dothr (arbitraria por definicion) en base a numero de entrada) para pag de clasificacion*/
	return function(input) {
		  if(input==undefined || input ==null){
			  input=4;
		  }
		return input==1 ? 'user2' : input==2? 'suitcase': 'warning';
		//1->Parcialmente Clasificada; 2->Clasificada; 3->Verificada(humano, no debe mostrarse en Prod) 'otro'->No Clasificada;
	  };
})
.filter('indexadolb', function() {
	/* Obtiene etiqueta/definición del indexado (sirve para texto y css-class ) */
	return function(input) {
		  if(input==undefined || input ==null){
			  input='bajo';
		  }
		return input==0 ? 'bajo' : input==1? 'medio': input==2? 'alto': input==3? 'sobresaliente': 'bajo';
		//0->Bajo, 1->Medio, 2->Alto,  3->Sobresaliente
	  };
})

.filter('startFrom', function() {
	/* regresa el indice de dato, en base a pagina actual y #datos por pagina, se utiliza para paginar */
	    return function(input, start) {
	        start = +start; //parse to int
	        return input.slice(start);
	    };
	})

.filter('perfilPosicionRow', function(){
	return function(perfil){		
		var pNombre = perfil.nombre;
		var mxLong = 20;
		if(pNombre.length > mxLong){
			pNombre = pNombre.substring(0,mxLong)+'...';
		}
		var codHtml = '<i>'+pNombre +' ['+perfil.ponderacion+']</i>';
		return codHtml;
	};
})
.filter('contactoRow', function(){
	return function(contacto){
		var codHtml = '';
		var tipo = parseInt(contacto.idTipoContacto);
		/* console.log('tipo: ', tipo ); */
		switch(tipo) {
		    case 1:
		        /* console.log('<!-- Email -->'); */
		        codHtml = '<span><label class="main"><i class="dhrIcon-envelope"></i> Correo Electrónico </label> ' + contacto.contacto + '</span>';
		        break;
		    case 2:
		        /* console.log('<!-- Facebook -->'); */
		        codHtml = '<span> <label class="main"><i class="dhrIcon-facebook"></i> Facebook </label> ' + contacto.contacto + '</span>';
		        break;
		    case 3:
		    	/* console.log('<!-- Google+ -->'); */
		        codHtml = '<span> <label class="main"><i class="dhrIcon-googleplus"></i> Google+ </label> ' + contacto.contacto + '</span>';
		        break;
		    case 4:
		        /* console.log('<!-- Twitter -->'); */
		        codHtml = '<span> <label class="main"><i class="dhrIcon-twitter"></i> Twitter </label> ' + contacto.contacto + '</span>';
		        break;
		    case 5:
		        /* console.log('<!-- Yahoo messenger -->'); */
		        codHtml = '<span> <label class="main"><i class="dhrIcon-chat"></i> Yahoo messenger </label> ' + contacto.contacto + '</span>';
		        break;
		    case 6:
		        /* console.log('<!-- Linkedin -->'); */
		        codHtml = '<span> <label class="main"><i class="dhrIcon-linkedin"></i> Linkedin </label> ' + contacto.contacto + '</span>';
		        break;
		    case 7:
		        /* console.log('<!-- "Flickr" -->'); */
		        codHtml = '<span> <label class="main"><i class="dhrIcon-spinner"></i> Flickr </label> ' + contacto.contacto + '</span>';
		        break;
		    case 8:
		        /* console.log('<!-- "DeviantART" -->'); */
		        codHtml = '<span> <label class="main"><i class="dhrIcon-pictures"></i> DeviantART </label> ' + contacto.contacto + '</span>';
		        break;
		    case 9:
		        /* console.log('<!-- YouTube -->'); */
		        codHtml = '<span> <label class="main"><i class="dhrIcon-youtube3"></i> YouTube </label> ' + contacto.contacto + '</span>';
		        break;
		    case 10:
		        /* console.log('<!-- Skype -->'); */
		        codHtml = '<span> <label class="main"><i class="dhrIcon-skype"></i> Skype </label> ' + contacto.contacto + '</span>';
		        break;
		    case 11:
		        /* console.log('<!-- Teléfono Recados -->'); */
		    	codHtml = '<span><label class="main"><i class="dhrIcon-phone"></i> Teléfono </label> ' 
		        	+ (contacto.codigoArea!=undefined?'['+contacto.codigoArea+'] ':'' ) + ' ' + contacto.numero + (contacto.adicional!=undefined?' Ext: '+contacto.adicional:'')+'</span>'
		        break;
		    case 12:
		        /* console.log('<!-- "Teléfono Oficina" -->'); */
		        codHtml = '<span><label class="main"><i class="dhrIcon-phone"></i> Teléfono </label> ' 
		        	+ (contacto.codigoArea!=undefined?'['+contacto.codigoArea+'] ':'' ) + contacto.numero + (contacto.adicional!=undefined?' Ext: '+contacto.adicional:'')+'</span>';
		        break;
		    case 13:
		    	/* console.log('<!-- Teléfono Celular -->'); */
		    	codHtml = '<span><label class="main"><i class="dhrIcon-mobile"></i> Móvil </label> '
						+ (contacto.codigoArea!=undefined?'['+contacto.codigoArea+'] ':'' ) + contacto.numero +'</span>';
		        break;
		    case 14:
		    	/* console.log('<!-- "Página personal" -->'); */
		    	codHtml = '<span><label class="main"><i class="dhrIcon-profile"></i> Página Personal </label> ['+
		    				contacto.contacto +'</span>';
		        break;
		    case 15:
		    	/* console.log('<!-- "Blog" -->'); */
		    	codHtml = '<span><label class="main"><i class="dhrIcon-frame"></i> Blog </label> ['+
		    				contacto.contacto +'</span>';
		        break;
		    case 16:
		    	/* console.log('<!-- GitHub -->'); */
		    	codHtml = '<span><label class="main"><i class="dhrIcon-tags"></i> GitHub </label> '+ contacto.contacto +'</span>';
		        break;
		    default:
		        codHtml = '<span> <i class="dhrIcon-bubbles"></i></span>';
		}
		return codHtml;
	};
})
.filter('contactoText', function(){
	return function(contacto){
		/* console.log('contactoText: ', contacto);*/
		var texto;

			texto = ' ' + (contacto.codigoArea!=undefined?'['+contacto.codigoArea+'] ':' ' )
				+ (contacto.numero!=undefined?contacto.numero:' ' )
				+ (contacto.contacto!=undefined?contacto.contacto:' ' )
				+ (contacto.adicional!=undefined?' Ext: '+contacto.adicional:'')
				+'';
		return texto;
	};
})
.filter('contactoIcono', function(){
	return function(idTipoContacto){
		var iconClass = '';
		var tipo = parseInt(idTipoContacto);
		/* console.log('tipo: ', tipo ); */
		switch(tipo) {
		    case 1:
		        /* console.log('<!-- Email -->'); */
		        iconClass ='envelope';
		        break;
		    case 2:
		        /* console.log('<!-- Facebook -->'); */
		        iconClass ='facebook';
		        break;
		    case 3:
		    	/* console.log('<!-- Google+ -->'); */
		    	iconClass ='googleplus';
		        break;
		    case 4:
		        /* console.log('<!-- Twitter -->'); */
		        iconClass ='twitter';
		        break;
		    case 5:
		        /* console.log('<!-- Yahoo messenger -->'); */
		        iconClass ='chat';
		        break;
		    case 6:
		        /* console.log('<!-- Linkedin -->'); */
		        iconClass ='linkedin';
		        break;
		    case 7:
		        /* console.log('<!-- "Flickr" -->'); */
		        iconClass ='spinner';
		        break;
		    case 8:
		        /* console.log('<!-- "DeviantART" -->'); */
		        iconClass ='pictures';
		        break;
		    case 9:
		        /* console.log('<!-- YouTube -->'); */
		        iconClass ='YouTube';
		        break;
		    case 10:
		        /* console.log('<!-- Skype -->'); */
		        iconClass ='skype';
		        break;
		    case 11:
		        /* console.log('<!-- Teléfono Recados -->'); */
		        iconClass ='phone';
		        break;
		    case 12:
		        /* console.log('<!-- "Teléfono Oficina" -->'); */
		        iconClass ='phone2';
		        break;
		    case 13:
		    	/* console.log('<!-- Teléfono Celular -->'); */
		    	iconClass ='mobile';
		        break;
		    case 14:
		    	/* console.log('<!-- "Página personal" -->'); */
		    	iconClass ='bookmark';
		        break;
		    case 15:
		    	/* console.log('<!-- "Blog" -->'); */
		    	iconClass ='bookmark';
		        break;
		    case 16:
		    	/* console.log('<!-- GitHub -->'); */
		    	iconClass ='tags';
		        break;
		    default:
		    	iconClass ='bubbles';
		}
		return iconClass;
	};
})
/*Filtro estandard para compilar codigo HTML en angular */
.filter('unsafe', function($sce) {
	/*sustituye al < ng-bind-html-unsafe= > */
	return $sce.trustAsHtml; 
})
//Fecha Formato estandar
.filter('formatdateStnd', function($filter) {
  return function(txtDate) {
  	if(txtDate!=undefined && txtDate!=''){
  		var myDate = new Date(txtDate);
    	return $filter('date')(myDate);
  	}else{
  		return '';
  	}
  };
})
//Fecha formato dd/MM/yyyy
.filter('formatdate', function($filter) {
  return function(txtDate) {
  	if(txtDate!=undefined && txtDate!=''){
  		var myDate = new Date(txtDate);
    return $filter('date')(myDate,'dd/MM/yyyy');
  	}else{
  		return '';
  	}
  };
})
//Fecha formato MM/yyyy
.filter('minimdate', function($filter) {
  return function(txtDate) {
  	if(txtDate!=undefined && txtDate!=''){
  		var myDate = new Date(txtDate);
	//var formDate = $filter('date')(myDate,'dd/MM/yyyy');
    return $filter('date')(myDate,'MM/yyyy');	
  	}else{
  		return '';
  	}
  };
})
.filter('xlargemail', function($filter) {
  return function(txtMail) {
  	if(txtMail!=undefined && txtMail!=''){
  		console.log('txtMail.length ' + txtMail.length );
  		if(txtMail.length>25){
  			txtMail = txtMail.replace('@', '\n@'); 
  		}
  	}
  	return txtMail;
  };
})
.filter('nom_activ', function(){
	return function(etiqueta){
		var mxLong = 10;
		if(etiqueta.length > mxLong){
			etiqueta = etiqueta.substring(0,mxLong)+'\n...';
		}
		return etiqueta;
	};
})
.filter('trackbtcolor', function(){
	return function(input) {
		  if(input==undefined || input ==null){
			  input=3;
		  }
		return input==1 ? 'warning' : input==2? 'success': input==3? 'default' : input==4? 'danger':'default';
	  };
})
.filter('selrange', function() {
  return function(input, min, max) {
    min = parseInt(min); //Make string input int
    max = parseInt(max);
    for (var i=min; i<max; i++)
      input.push(i);
    return input;
  };
})
/* Tracking: nombre-boton Longitud maxima*/
.filter('trackbtdes', function(){
	return function(descripcion){
		var mxLong = 11;
		if(descripcion.length > mxLong){
			descripcion = descripcion.substring(0,mxLong)+'.';
		}
		return descripcion;
	};
})
/* Tracking: icono Postulante/Monitor [0/1] */
.filter('iconTrackMonitor', function() {
	  return function(input) {
		  if(input==undefined || input ==null){
			  input=1;
		  }
		return input==1 ? 'eye' :'user2';
	  };
})
/* Tracking: icono Estado Track (actividad) */
.filter('iconTrackEstado', function() {
	  return function(idEdo) {
		if(idEdo==undefined || idEdo ==null){
			  idEdo=1;
		}
		//console.log('idEdo: ', idEdo)
		let tipo = parseInt(idEdo);
		let iconClass = ''
			/* console.log('tipo: ', tipo ); */
		switch(tipo) {
			case 1:
			    iconClass = 'dhrIcon-pie-0'
			    break;
			case 2:
			    iconClass = 'glyphicon glyphicon-hand-down'
			    break;
			case 3:
			    iconClass = 'glyphicon glyphicon-ok-circle'
			    break;
			case 4:
			    iconClass = 'glyphicon glyphicon-remove-circle'
			    break;
			default:
				iconClass = 'dhrIcon-pie-0'
		}
		//console.log('iconClass: ', iconClass)
		return iconClass;
	  };
})
/* Tracking: color Estado Track (actividad) */
.filter('colorTrackEstado', function() {
	  return function(idEdo) {
		if(idEdo==undefined || idEdo ==null){
			  idEdo=1;
		}
		//console.log('idEdo: ', idEdo)
		let tipo = parseInt(idEdo);
		let colorClass = ''
			/* console.log('tipo: ', tipo ); */
		switch(tipo) {
			case 1:
			    colorClass = 'dhr-notaccomplishedr'
			    break;
			case 2:
			    colorClass = 'dhr-important'
			    break;
			case 3:
			    colorClass = 'dhr-success'
			    break;
			case 4:
			    colorClass = 'dhr-danger'
			    break;
			default:
				colorClass = 'dhr-notaccomplished'
		}
		return colorClass;
	  };
})
/* Tracking: Obtiene Hora de fecha formato yyyy-MM-DD hh:mm:ss */
.filter('soloHora', function(){
	return function(fechaCompleta){
		if(fechaCompleta){
			console.log('fechaCompleta.length ', fechaCompleta.length)
			return fechaCompleta.substring(11, fechaCompleta.length-3)
		}
		else
			return ''
	}
})
;
