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
		if(uriCode == 'TEST.C'){//Dummy create para pruebas iniciales
			jsonFile = '/jsonModule/_TESTcreate.json';
		}
		else if(uriCode == 'ACADBACK.C'){
			 endPoint = '/module/academicBackground/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'ACADBACK.D'){
			 endPoint = '/module/academicBackground/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'ACADBACK.G'){
			 endPoint = '/module/academicBackground/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'ACADBACK.U'){
			 endPoint = '/module/academicBackground/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'ADMIN.M'){
			 endPoint = '/admin/management/menu';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'APPLICANT.G'){
			 endPoint = '/module/applicant/getApplicants';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'APPLICANT.S'){
			 endPoint = '/module/applicant/searchApplicants';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'APPLICANTVACANCY.R'){
			 endPoint = '/module/applicant/readVacancy';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'ASSOCIATE.C'){
			 endPoint = '/module/curriculumCompany/requestAssociation';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'ASSOCIATE.G'){
			 endPoint = '/module/curriculumCompany/getAssociates';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'ASSOCIATE.U'){
			 endPoint = '/module/curriculumCompany/updateAssociation';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'AUTOMOBILE.C'){
			 endPoint = '/module/automobile/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'AUTOMOBILE.D'){
			 endPoint = '/module/automobile/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'AUTOMOBILE.R'){
			 endPoint = '/module/automobile/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'AUTOMOBILE.U'){
			 endPoint = '/module/automobile/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'BOND.C'){
			 endPoint = '/module/bond/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'BOND.D'){
			 endPoint = '/module/bond/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'BOND.R'){
			 endPoint = '/module/bond/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'BOND.U'){
			 endPoint = '/module/bond/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'CALENDAR.GD'){
			 endPoint = '/module/calendar/getdates';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'CATALOGUE.C'){
			 endPoint = '/admin/catalogue/createCatalogueRecord';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'CATALOGUE.G'){
			 endPoint = '/admin/catalogue/getCatalogueValues';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'CATALOGUE.U'){
			 endPoint = '/admin/catalogue/updateCatalogueRecord';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'CATAREA.G'){
			 endPoint = '/admin/catalogue/getAreas';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'COMPANY.C'){
			 endPoint = '/module/curriculumCompany/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'COMPANY.DIS'){
			 endPoint = '/module/curriculumCompany/disassociate';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'COMPANY.FS'){
			 endPoint = '/module/curriculumCompany/findSimilar';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'COMPANY.G'){
			 endPoint = '/module/curriculumCompany/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'COMPANY.P'){
			 endPoint = '/module/curriculumCompany/setEnterpriseResumePublication';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'COMPANY.R'){
			 endPoint = '/module/curriculumCompany/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'COMPANY.U'){
			 endPoint = '/module/curriculumCompany/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'COMPENSATION.C'){
			 endPoint = '/module/compensation/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'COMPENSATION.D'){
			 endPoint = '/module/compensation/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'COMPENSATION.R'){
			 endPoint = '/module/compensation/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'COMPENSATION.U'){
			 endPoint = '/module/compensation/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'CONTACT.C'){
			 endPoint = '/module/contact/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'CONTACT.D'){
			 endPoint = '/module/contact/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'CONTACT.U'){
			 endPoint = '/module/contact/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'DOCSCLASS.G'){
			 endPoint = '/module/classify/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'DOCSCLASS.U'){
			 endPoint = '/module/classify/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'EPARAMS.C'){
			 endPoint = '/module/enterpriseParameter/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'EPARAMS.D'){
			 endPoint = '/module/enterpriseParameter/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'EPARAMS.G'){
			 endPoint = '/module/enterpriseParameter/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'EPARAMS.M'){
			 endPoint = '/module/enterpriseParameter/updmultiple';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'EPARAMS.RL'){
			 endPoint = '/module/enterpriseParameter/reload';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'EPARAMS.U'){
			 endPoint = '/module/enterpriseParameter/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'FILE.D'){
			 endPoint = '/module/file/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'FILE.G'){
			 endPoint = '/module/file/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'FILE.R'){
			 endPoint = '/module/file/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'HANDSHAKE.C'){
			 endPoint = '/module/handshake/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'INSURANCE.C'){
			 endPoint = '/module/insurance/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'INSURANCE.D'){
			 endPoint = '/module/insurance/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'INSURANCE.R'){
			 endPoint = '/module/insurance/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'INSURANCE.U'){
			 endPoint = '/module/insurance/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'LANGUAGE.C'){
			 endPoint = '/module/language/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'LANGUAGE.D'){
			 endPoint = '/module/language/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'LANGUAGE.U'){
			 endPoint = '/module/language/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'LOCATION.C'){
			 endPoint = '/module/location/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'LOCATION.D'){
			 endPoint = '/module/location/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'LOCATION.G'){
			 endPoint = '/module/location/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'LOCATION.U'){
			 endPoint = '/module/location/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MODELRSC.C'){
			 endPoint = '/module/modeloRsc/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MODELRSC.D'){
			 endPoint = '/module/modeloRsc/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MODELRSC.G'){
			 endPoint = '/module/modeloRsc/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MODELRSC.R'){
			 endPoint = '/module/modeloRsc/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MODELRSC.U'){
			 endPoint = '/module/modeloRsc/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MODELRSCPOS.C'){
			 endPoint = '/module/modeloRscPos/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MODELRSCPOS.D'){
			 endPoint = '/module/modeloRscPos/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MODELRSCPOS.G'){
			 endPoint = '/module/modeloRscPos/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MODELRSCPOS.R'){
			 endPoint = '/module/modeloRscPos/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MODELRSCPOS.U'){
			 endPoint = '/module/modeloRscPos/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MODELRSCPOSF.C'){
			 endPoint = '/module/modeloRscPosFase/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MODELRSCPOSF.D'){
			 endPoint = '/module/modeloRscPosFase/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MODELRSCPOSF.U'){
			 endPoint = '/module/modeloRscPosFase/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MONITOR.C'){
			 endPoint = '/module/monitor/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MONITOR.D'){
			 endPoint = '/module/monitor/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MONITOR.G'){
			 endPoint = '/module/monitor/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'MONITOR.U'){
			 endPoint = '/module/monitor/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'NOTIFICATION.G'){
			 endPoint = '/module/notification/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PERMISSION.C'){
			 endPoint = '/admin/permission/create';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'PERMISSION.D'){
			 endPoint = '/admin/permission/delete';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'PERMISSION.G'){
			endPoint = '/admin/permission/get';
			if(pJson.idTipoPermiso){
				alert('++++++++  Crear JSON de solo tipo permiso  ++++++++')
				jsonFile = '/jsonModule/permission/getAll.json';
			}
			else{
				jsonFile = '/jsonModule/permission/getAll.json';
			}
			//jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'PERMISSION.U'){
			 //endPoint = '/admin/permission/update';
			 jsonFile = '/jsonModule/permission/update.json';
		}
		else if(uriCode == 'PERSCERT.C'){
			 endPoint = '/module/personCert/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PERSCERT.D'){
			 endPoint = '/module/personCert/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PERSCERT.U'){
			 endPoint = '/module/personCert/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PERSKILL.C'){
			 endPoint = '/module/personSkill/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PERSKILL.D'){
			 endPoint = '/module/personSkill/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PERSKILL.U'){
			 endPoint = '/module/personSkill/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PERSON.CM'){
			 endPoint = '/module/curriculumManagement/createManual';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PERSON.D'){
			 endPoint = '/module/curriculumManagement/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PERSON.G'){
			 endPoint = '/module/curriculumManagement/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PERSON.P'){
			 endPoint = '/module/applicant/setResumePublication';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PERSON.PW'){
			 endPoint = '/admin/management/updpwd';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'PERSON.R'){
			 endPoint = '/module/curriculumManagement/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PERSON.TR'){
			 endPoint = '/module/curriculumManagement/tracking';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PERSON.U'){
			 endPoint = '/module/curriculumManagement/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PLAN.C'){
			 endPoint = '/module/plan/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PLAN.D'){
			 endPoint = '/module/plan/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PLAN.R'){
			 endPoint = '/module/plan/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PLAN.U'){
			 endPoint = '/module/plan/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'POSITIONCERT.C'){
			 endPoint = '/module/positionCert/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'POSITIONCERT.D'){
			 endPoint = '/module/positionCert/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'POSITIONCERT.U'){
			 endPoint = '/module/positionCert/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'POSITIONCOMPETENCE.U'){
			 endPoint = '/module/positionCompet/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'POSITIONSKILL.C'){
			 endPoint = '/module/positionSkill/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'POSITIONSKILL.D'){
			 endPoint = '/module/positionSkill/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'POSITIONSKILL.G'){
			 endPoint = '/module/positionSkill/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'POSITIONSKILL.U'){
			 endPoint = '/module/positionSkill/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'POSTULANT.G'){
			 endPoint = '/module/postulante/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'POSTULANT.U'){
			 endPoint = '/module/postulante/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PROFILE.A'){
			 endPoint = '/module/profile/updateAssociation';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PROFILE.CPB'){
			 endPoint = '/module/profile/createpublic';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PROFILE.CPV'){
			 endPoint = '/module/profile/createprivate';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PROFILE.D'){
			 endPoint = '/module/profile/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PROFILE.G'){
			 endPoint = '/module/profile/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PROFILE.R'){
			 endPoint = '/module/profile/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PROFILE.U'){
			 endPoint = '/module/profile/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PROFILETEX.C'){
			 endPoint = '/module/profile/textcreate';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PROFILETEX.D'){
			 endPoint = '/module/profile/textdelete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PROFILETEX.G'){
			 endPoint = '/module/profile/textget';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'PROFILETEX.U'){
			 endPoint = '/module/profile/textupdate';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'RECLASIFY.T'){
			 endPoint = '/module/task/reClassification';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'RECLASSDOCS.LD'){
			 endPoint = '/admin/management/lastDateReclassDocs';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'REFERENCE.C'){
			 endPoint = '/module/reference/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'REFERENCE.D'){
			 endPoint = '/module/reference/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'REFERENCE.R'){
			 endPoint = '/module/reference/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'REFERENCE.U'){
			 endPoint = '/module/reference/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'RELOADCORESOLR.LD'){
			 endPoint = '/admin/management/lastDateReLoadCoreSolr';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'RELOADCORESOLR.T'){
			 endPoint = '/module/task/reloadCoreSolr';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'REMODELING.LD'){
			 endPoint = '/admin/management/lastDateRemodel';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'REMODELING.T'){
			 endPoint = '/module/task/reModel';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'REPORT.C'){
			 endPoint = '/module/report/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'ROL.AP'){
			 endPoint = '/admin/rol/assignPerms';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'ROL.C'){
			 endPoint = '/admin/rol/create';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'ROL.D'){
			 endPoint = '/admin/rol/delete';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'ROL.G'){
			 endPoint = '/admin/rol/get';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'ROL.U'){
			 endPoint = '/admin/rol/update';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'SALARY.C'){
			 endPoint = '/module/salary/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'SALARY.D'){
			 endPoint = '/module/salary/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'SALARY.R'){
			 endPoint = '/module/salary/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'SALARY.U'){
			 endPoint = '/module/salary/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'SETTLEMENT.C'){
			jsonFile = '/jsonModule/settlement/create.json';
		}
		else if(uriCode == 'SETTLEMENT.G'){
			 endPoint = '/module/settlement/get';
			 let codigoPostal = pJson.postalCode
			 console.log('codigoPostal: ', codigoPostal)
			 if(codigoPostal=='02710' || codigoPostal=='50160'){
				jsonFile = '/jsonModule/settlement/get-'+codigoPostal+'.json';
			 }else{
				jsonFile = '/jsonModule/settlement/get.json';
			 } 
		}
		else if(uriCode == 'SYNCDOCS.LD'){
			 endPoint = '/admin/management/lastDateSyncDocs';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'SYNCHRONIZE.T'){
			 endPoint = '/module/task/syncClassDocs';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'TIPOPERMISO.G'){
			 endPoint = '/admin/tipoPermiso/get';
			 jsonFile = transjsonFile(endPoint, '/admin/');
		}
		else if(uriCode == 'TOKENUPLOAD.C'){
			 endPoint = '/module/classify/loadTokens';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'TRACKMONITOR.C'){
			 endPoint = '/module/trackMonitor/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'TRACKMONITOR.D'){
			 endPoint = '/module/trackMonitor/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'TRACKMONITOR.R'){
			 endPoint = '/module/trackMonitor/read'
			 let ids = [153,164,188,230,244,17,45,59,65,84,163]
			 if(pJson.idCandidato){
			 	let idCandidato = parseInt(pJson.idCandidato)
			 	if(ids.includes(idCandidato)){
			 		jsonFile = '/jsonModule/trackingsMonitor/trackMonitor_read_'+pJson.idCandidato+'.json'; 
			 	}
			 	else{
			 		//EN caso de no estar en los existentes 
			 		jsonFile = transjsonFile(endPoint, '/module/')
			 	}
			 	//endPoint = '/module/trackMonitor/read';/home/dothr/app/webServer/jsonModule/trackingsMonitor/trackMonitor_read_153.json
			 	
			 }else{
			 	jsonFile = transjsonFile(endPoint, '/module/')
			 }
		}
		else if(uriCode == 'TRACKMONITOR.U'){
			 endPoint = '/module/trackMonitor/update';
			 
			 //alert('TrackMonitor update');
			 if(pJson.monitor){
				 alert('++++++++  Cambio de notificaciones monitor /Candidato  ++++++++')
				 jsonFile = transjsonFile(endPoint, '/module/');
			 }
			 else if(pJson.fechaInicio){
				 alert(' ++++++++ Asignación de agenda  ++++++++')
				 jsonFile = '/jsonModule/trackMonitor_update_Agenda.json';
			 }
			 else {
				 console.log('++++++++  caso estandar de TrackingMonitor Update  ++++++++')
				 jsonFile = transjsonFile(endPoint, '/module/');
			 }
			 
			 //jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'TRACKPOSTULANT.C'){
			 endPoint = '/module/trackPostulante/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'TRACKPOSTULANT.CF'){
			 endPoint = '/module/trackPostulante/confirm';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'TRACKPOSTULANT.D'){
			 endPoint = '/module/trackPostulante/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'TRACKPOSTULANT.G'){
			 endPoint = '/module/trackPostulante/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'TRACKPOSTULANT.R'){
			 endPoint = '/module/trackPostulante/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'TRACKPOSTULANT.RLB'){
			 endPoint = '/module/trackPostulante/rollback';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'TRACKPOSTULANT.U'){
			 endPoint = '/module/trackPostulante/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACANCY.C'){
			 endPoint = '/module/vacancy/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACANCY.CL'){
			 endPoint = '/module/vacancy/clone';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACANCY.D'){
			 endPoint = '/module/vacancy/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACANCY.DC'){
			 endPoint = '/module/vacancy/dataconf';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACANCY.G'){
			 endPoint = '/module/vacancy/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACANCY.P'){
			 endPoint = '/module/vacancy/setVacancyPublication';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACANCY.R'){
			 endPoint = '/module/vacancy/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACANCY.U'){
			 endPoint = '/module/vacancy/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACANCYTEXT.C'){
			 endPoint = '/module/vacancyText/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACANCYTEXT.D'){
			 endPoint = '/module/vacancyText/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACANCYTEXT.U'){
			 endPoint = '/module/vacancyText/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACATION.C'){
			 endPoint = '/module/vacation/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACATION.D'){
			 endPoint = '/module/vacation/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACATION.R'){
			 endPoint = '/module/vacation/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VACATION.U'){
			 endPoint = '/module/vacation/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VOUCHER.C'){
			 endPoint = '/module/voucher/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VOUCHER.D'){
			 endPoint = '/module/voucher/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VOUCHER.R'){
			 endPoint = '/module/voucher/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'VOUCHER.U'){
			 endPoint = '/module/voucher/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'WORKEXP.C'){
			 endPoint = '/module/workExperience/create';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'WORKEXP.D'){
			 endPoint = '/module/workExperience/delete';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'WORKEXP.G'){
			 endPoint = '/module/workExperience/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'WORKEXP.U'){
			 endPoint = '/module/workExperience/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}

		else if(uriCode == 'METRICS.R'){
			 endPoint = '/module/metrics/postulante';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'ROL.TR'){
			//endPoint = '/module/rol/taskread';
			//jsonFile = transjsonFile(endPoint, '/module/');
			jsonFile = '/jsonModule/rol/taskread.json';
	    }
		else if(uriCode == 'ROL.TU'){
			endPoint = '/module/rol/taskupdate';
			jsonFile = transjsonFile(endPoint, '/module/');
	    }
		else if(uriCode == 'PERMISSION.T'){
			jsonFile = '/jsonModule/permission/tasks.json';
	    }

		else if(uriCode == 'ENCUESTA.G'){
			 endPoint = '/module/encuesta/get';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'ENCUESTA.R'){
			 endPoint = '/module/encuesta/read';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'ENCUESTA.U'){
			 endPoint = '/module/encuesta/update';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}
		else if(uriCode == 'ENCUESTA.Q'){
			 endPoint = '/module/encuesta/questionary';
			 jsonFile = transjsonFile(endPoint, '/module/');
		}

		
		else if(uriCode == 'PERSON.T'){
			 jsonFile = '/jsonModule/test/personacv.json';
		}
		else if(uriCode == 'TRACKMONITOR.G'){
			 endPoint = '/module/trackMonitor/get';
			 //jsonFile = transjsonFile(endPoint, '/module/');
			 jsonFile = '/jsonModule/test/trackMonitor_get.json'; 
		}
		else if(uriCode == 'CVMAP.R'){
			 jsonFile = '/jsonModule/test/_TESTMapaCV.json';
		}
		else if(uriCode == 'ESTADOS.G'){
			 jsonFile = '/jsonModule/test/estados_get.json';
		}
		
	console.log('  <DUMMY-services> ['+ endPoint + '] ==> jsonFile: ' + jsonFile);
	return jsonFile;
}
