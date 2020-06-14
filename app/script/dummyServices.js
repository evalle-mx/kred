/* Archivo Temporal Dummy para simular comunicacion con Servicios rest */
/**
 * Convierte un endPoint en una ruta de archivo http-json
 * @param endPoint
 * @param pToken
 * @returns
 */
function transjsonFile(endPoint, pToken){
	var jsonFile = endPoint.replace(pToken, '-jsonModule-');
	jsonFile= jsonFile.replace('/','_');
	jsonFile= jsonFile.replace('-','/').replace('-','/');
	jsonFile = jsonFile+'.json';
	return jsonFile;
}

/**
 * Convierte un uriCode en una ruta de archivo http-json
 * @param uriCode
 * @returns {String}
 */
function getRestUrl(uriCode, pJson){
	console.log('  <DUMMY-services> pJson: ', JSON.stringify(pJson));
	var endPoint = '';
	var jsonFile = '/jsonModule/test.json';
		if(uriCode == 'ADMIN.M'){
			if(pJson.idUser){
				let idUser = parseInt(pJson.idUser)
				console.log('idUser: ', idUser)
				jsonFile = 'json/menu.json'
			}
		}
		else if(uriCode == 'PERSON.PW'){
			jsonFile = 'json/management_updpwd.json'
		}
		else if(uriCode == 'USERINFO.R'){
			if(pJson.idUser){
				let idUser = parseInt(pJson.idUser)
				console.log('idUser: ', idUser)
				jsonFile = 'json/userinfo-'+idUser+'.json'
			}
		}
		
		else if(uriCode == 'CASHFLOW.R'){
			jsonFile = 'json/cashflow.json'
		}
		else if(uriCode == 'CREDPROFILE.R'){
				jsonFile = 'json/creditProf.json'
   		}
		
	console.log('  <DUMMY-services> ['+ endPoint + '] ==> jsonFile: ' + jsonFile);
	return jsonFile;
}
