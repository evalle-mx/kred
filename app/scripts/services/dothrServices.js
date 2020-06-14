'use strict';
angular.module('dotHrServices', ['ngResource'])
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
})
.factory('TokenAuthInterceptor', function($q, TokenStorage) {
	return {
		//en cada petición se inyecta el authToken
		request: function(config) {
			var authToken = TokenStorage.retrieve();
			//console.log("request -> Se aplica la injeccion al header de authToken:",authToken);
			if (authToken) {
				config.headers['x-auth-token'] = authToken;
			}
			return config;
		},
		//en cada error de respuesta se limpia el TokenStorage
		responseError: function(error) {
			console.log('responseError -> Se aplica el responseError:', error);
			console.log('responseError: error.status:', error.status);
			if (error.status === 401 || error.status === 403) {
				console.log('TokenStorage.clear();');				
				TokenStorage.clear();
				if(error.statusText == 'Unauthorized'){
					blockPage('Es necesario iniciar sesión...');
					//alert('Es necesario iniciar sesión...');
					window.location.href=loginPage;
				}
			} else if (error.status === 0) {
				console.log('Error de Conexión');
				blockPage('Error de Conexión...');
				
				setTimeout(function(){
					//Temporalmente solo recarga la pagina 
					location.reload(); 
					}, 5000);
			}
			else if (error.status === 404) { /*<title>404 Not Found</title> <p>The requested URL /current was not found on this server.</p>*/
				console.log('Servicio no Disponible [requested URL /current was not found on this server]');
				blockPage('Error de Servicio, intente más Tarde.');
				alert('Error de Servicio, intente más Tarde.');
				
				setTimeout(function(){
					window.location.href=loginPage;
					}, 5000);
			}
			else{
				console.log('otro estatus: ', error.status);
				alert('Error de Servicio ['+ error.status + '], intente más Tarde.');
				
				setTimeout(function(){
					window.location.href=loginPage;
					}, 2000);
			}
			return $q.reject(error);
		}
	};
})

// Obtiene la información de un archivo específico
.factory('fileResource', function ($resource) {
    var FileResource = $resource(
	    		'json/:myFile',
	    		{},
	            {
	            	get:{method:'GET', params:{myFile:'' }, isArray:true}
	            }
            );
    FileResource.prototype.getCatalogue = function (fileName, successCat, failCat) {
    	console.log('<fileResource> Calling for :',fileName);
        return FileResource.get({myFile:fileName}, successCat, failCat);
        
    };
    return new FileResource;
})
// Configura el caché de angular
.factory('cacheResource', function($cacheFactory) {
    return $cacheFactory('initialCache', {
        capacity: 3 // optional - turns the cache into LRU cache
    });
})
//*// Obtiene la información de un servicio específico definido por su UriCode
.factory('restResource', function ($http) {	
	return {
        getJsonResp: function(pUriCode, pJson) {
        	var stJson = angular.fromJson(pJson);
        	console.log('<restResource> stJson: ', stJson );
        	console.log('<restResource> stJson(stringify) ', JSON.stringify(stJson) );
        	console.log('<restResource> UriCode: ', pUriCode );
            return $http.get('http://localhost:8080/greeting', { 
            	uriCode : pUriCode,
            	json    : stJson
            });
        }
    };
}) //*/
// Obtiene la información de un archivo plano .json dependiendo su UriCode
.factory('commonResource', function ($http) {	
	return {
        getJsonResp: function(pUriCode, pJson) {
        	var stJson = angular.fromJson(pJson);
        	console.log('<commonResource> stJson ', stJson );
        	console.log('<commonResource> UriCode: ', pUriCode );
        	var uriFile = getRestUrl(pUriCode, pJson);
        	console.log('<commonResource> uriFile: ', uriFile );
            return $http.get(uriFile, {});
        }
    };
})
.factory('menuResource', function ($resource) {
	/*return {
		getMenu: function(idRol){
			console.log('obteniendo Json de Menu por Rol ', idRol);
			return $http.get('./json/menu-1.json', {});
		}
	};	*/
	var MenuResource = $resource(
	    		'json/mn/menu-:rol.json',
	    		{},
	            {
	            	get:{method:'GET', params:{myFile:'' }, isArray:true}
	            }
            );
    MenuResource.prototype.getMenu = function (idRol) {
    	console.log('obteniendo Json de Menu por Rol ', idRol);
        return MenuResource.get({rol:idRol});
        
    };
    return new MenuResource;
})
.factory('MarkerCreatorService', function () {

    var markerId = 0;

    function create(latitude, longitude) {
        var marker = {
            options: {
                animation: 1,
                labelAnchor: "28 -5",
                labelClass: 'markerlabel'    
            },
            latitude: latitude,
            longitude: longitude,
            id: ++markerId          
        };
        return marker;        
    }

    function invokeSuccessCallback(successCallback, marker) {
        if (typeof successCallback === 'function') {
            successCallback(marker);
        }
    }

    function createByCoords(latitude, longitude, successCallback) {
        var marker = create(latitude, longitude);
        invokeSuccessCallback(successCallback, marker);
    }

    function createByAddress(address, successCallback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstAddress = results[0];
                var latitude = firstAddress.geometry.location.lat();
                var longitude = firstAddress.geometry.location.lng();
                var marker = create(latitude, longitude);
                invokeSuccessCallback(successCallback, marker);
            } else {
                alert("Dirección desconocida: " + address);
            }
        });
    }

    function createByCurrentLocation(successCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var marker = create(position.coords.latitude, position.coords.longitude);
                invokeSuccessCallback(successCallback, marker);
            });
        } else {
            alert('No es posible localizar la ubicación actual'); //Unable to locate current position
        }
    }

    return {
        createByCoords: createByCoords,
        createByAddress: createByAddress,
        createByCurrentLocation: createByCurrentLocation
    };

})
;
