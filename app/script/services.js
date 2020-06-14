'use strict';
angular.module('appServices', ['ngResource'])
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
		request: function(config) {
			var authToken = TokenStorage.retrieve();
			if (authToken) {
				config.headers['x-auth-token'] = authToken;
			}
			return config;
		},
		responseError: function(error) {
			console.log('responseError -> RsponseError:', error);
			console.log('responseError: error.status:', error.status);
			if (error.status === 401 || error.status === 403) {
				console.log('TokenStorage.clear();');				
				TokenStorage.clear();
				if(error.statusText == 'Unauthorized'){
					blockPage('Session required...');
					window.location.href=loginPage;
				}
			} else if (error.status === 0) {
				console.log('Connection Error');
				blockPage('Connection Error...');
				
				setTimeout(function(){
					//Temporalmente solo recarga la pagina 
					location.reload(); 
					}, 5000);
			}
			else if (error.status === 404) { /*<title>404 Not Found</title> <p>The requested URL /current was not found on this server.</p>*/
				console.log('Unavailable Service [requested URL /current was not found on this server]');
				blockPage('Service Error, please try later.');
				alert('Service Error, please try later..');
				
				setTimeout(function(){
					window.location.href=loginPage;
					}, 5000);
			}
			else{
				console.log('estatus: ', error.status);
				alert('Service Error ['+ error.status + '], please try late.');
				
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
/*// Obtiene la información de un servicio específico definido por su UriCode
.factory('commonResource', function ($http) {	
	return {
        getJsonResp: function(pUriCode, pJson) {
        	var stJson = angular.fromJson(pJson);
        	console.log('<commonResource> stJson: ', stJson );
        	console.log('<commonResource> stJson(stringify) ', JSON.stringify(stJson) );
        	console.log('<commonResource> UriCode: ', pUriCode );
            return $http.post('/common', { 
            	uriCode : pUriCode,
            	json    : stJson
            });
        }
    };
}) */
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
			//'json/mn/menu-9.json',
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
