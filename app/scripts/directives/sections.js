dotHrApp
/* Elementos Fijos de Index */
.directive('commfooter', function() {
		var templateFooter = 'nav/footerIn.html';
	    return {
	    	templateUrl: templateFooter
	    };
	})	
.directive('dothrheader', function() {
		var templateHeader = 'nav/headerIn.html';
        return {
        	templateUrl: templateHeader
        };
    })
/* Bienvenida dependiendo perfil-usuario welcome-msg*/
.directive('welcomeMsg', function(SessionStorage,$rootScope) {
    		console.log('rootScope.session.vistaInicial: ', $rootScope.session.vistaInicial );
    		var myTemplate;
    		//Si hay vistaInicial
    		if($rootScope.session.vistaInicial != 'null'  ){
    			myTemplate=$rootScope.session.vistaInicial;
    		}else{
    			myTemplate='views/sections/welc-cand.html';
    		}
        	console.log('myTemplate_2: ', myTemplate );
            return {
            	templateUrl: myTemplate
            };
        })
/* Plantillas dinamicas */
//---------- cv-docclass  (cuerpo del Modal de vista de CV)
.directive('cvDocclass', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/template/cv-docclass.html'
  };
})
.directive('cvCard', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/template/cv-card.html'
  };
})
.directive('cvMini', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/template/cv-mini.html'
  };
})
.directive('fmtComp', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/person/section/formato-mini.html'
    //templateUrl: 'views/template/fmt-comp.html'
  };
})
.directive('cvPreview', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/template/cv-preview.html'
  };
})
.directive('candConfirm', function() { /*cand-confirm */
  return {
    restrict: 'E',
    templateUrl: 'views/position/section/cand-confirm.html'
  };
})
.directive('candPotencial', function() { /*cand-potencial */
  return {
    restrict: 'E',
    templateUrl: 'views/position/section/cand-potencial.html'
  };
})
.directive('positPreview', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/template/posit-preview.html'
  };
})

.directive('mdTrackmini', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'views/template/md-trackmini.html'
	  };
	})
.directive('mrscModales', function() {
      return {
        restrict: 'E',
        templateUrl: 'views/position/section/mrsc-modales.html'
    };
})
.directive('sectDiagparticipante', function() {
      return {
        restrict: 'E',
        templateUrl: 'views/position/section/sect-diagparticipante.html'
    };
})
///home/dothr/app/webServer/sitios/selex/app/views/position/section/sect-diagparticipante.html

/* Modales estandard al final de la pagina */
//------------ modal-failure (modales de Aviso, Error y Fatal en Index.html)
.directive('modalFailure', function() {
    return {
        restrict: 'E',
        templateUrl: 'nav/modalFailure.html'
    };
})
//---------- class-sec-modal  (Multiples modales requeridos)
.directive('classSecModal', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/classification/section/class-modal.html'
  };
})
//---------- empresa-modal  (Multiples modales requeridos)
.directive('empresaModal', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/sections/emp-modal.html'
  };
})
//---------- posit-modal  (Multiples modales requeridos)
.directive('positModal', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/position/section/posit-modal.html'
  };
})
//---------- posit-modal-form  (Multiples modales requeridos)
.directive('positModalForm', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/position/section/posit-modal-form.html'
  };
})
//---------- compensa-modal  (Multiples modales de Input)
.directive('compensaModal', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/person/section/compensa-modal.html'
  };
})
// --- track-mdred Modal de Tracking reducido usado en [trackingList/trackingCV]
.directive('trackMdred', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/sections/track-mdred.html'
  };
})
// --- md-trackcand Modal de Tracking reducido usado en [postulantList]
.directive('mdTrackcand', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/position/section/md-trackcand.html'
  };
})

//---------- area-summary  (Resumen descriptivo de Áreas)
.directive('areaSummary', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/sections/area-summary.html'
  };
})

/* C.V. PERSONA  */
//------- cvr-personalinfo DIRECTIVE
.directive('cvInfo', function() {
    return {
        restrict: 'E',
        templateUrl: 'nav/cvp/cvr-info.html',
        controller: function() {
            this.toggle = false;

            this.show = function() {
                this.toggle = true;
            };

            this.hide = function() {
                this.toggle = false;
            };
        },
        controllerAs: 'secInfoCtrl'
    };
})
//------- cvr-contacto 
.directive('cvContacto', function() {
    return {
        restrict: 'E',
        templateUrl: 'nav/cvp/cvr-contacto.html',
        controller: function() {
            this.toggle = false;

            this.show = function() {
                this.toggle = true;
            };

            this.hide = function() {
                this.toggle = false;
            };
        },
        controllerAs: 'secContactCtrl'
    };
})
//------- cv-ubicacion 
.directive('cvUbicacion', function() {
    return {
        restrict: 'E',
        templateUrl: 'nav/cvp/cvr-ubicacion.html',
        controller: function() {
            this.toggle = false;

            this.show = function() {
                this.toggle = true;
            };

            this.hide = function() {
                this.toggle = false;
            };
        },
        controllerAs: 'secLocaCtrl'
    };
})
//------- cvr-estudios 
.directive('cvAcademia', function() {
    return {
        restrict: 'E',
        templateUrl: 'nav/cvp/cvr-academias.html',
        controller: function() {
            this.toggle = false;

            this.show = function() {
                this.toggle = true;
            };

            this.hide = function() {
                this.toggle = false;
            };
        },
        controllerAs: 'secAcadCtrl'
    };
})

//------- cvr-estudios 
.directive('cvExperiencia', function() {
    return {
        restrict: 'E',
        templateUrl: 'nav/cvp/cvr-experiencia.html',
        controller: function() {
            this.toggle = false;

            this.show = function() {
                this.toggle = true;
            };

            this.hide = function() {
                this.toggle = false;
            };
        },
        controllerAs: 'secExpCtrl'
    };
})

//------- cvr-habilidades 
.directive('cvHabilidad', function() {
    return {
        restrict: 'E',
        templateUrl: 'nav/cvp/cvr-habilidades.html',
        controller: function() {
            this.toggle = false;

            this.show = function() {
                this.toggle = true;
            };

            this.hide = function() {
                this.toggle = false;
            };
        },
        controllerAs: 'secHabCtrl'
    };
})

/* RESULTADO BUSQUEDA CANDIDATOS  */
//------- apl-acepted 
.directive('aplAcepted', function() {
    return {
        restrict: 'E',
        //templateUrl: 'views/sections/appli-acepted.html',
        templateUrl: 'views/position/section/applicant-acepted.html',
        controller: function() {
            this.toggle = false;

            this.show = function() {
                this.toggle = true;
            };

            this.hide = function() {
                this.toggle = false;
            };
        },
        controllerAs: 'secAceptedCtrl'
    };
})
//------- apl-reject 
.directive('aplReject', function() {
    return {
        restrict: 'E',
        //templateUrl: 'views/sections/appli-reject.html',
        templateUrl: 'views/position/section/applicant-reject.html',
        controller: function() {
            this.toggle = false;

            this.show = function() {
                this.toggle = true;
            };

            this.hide = function() {
                this.toggle = false;
            };
        },
        controllerAs: 'secRejectCtrl'
    };
})
//------- apl-selected 
.directive('aplSelected', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/position/section/applicant-selected.html',
        controller: function() {
            this.toggle = false;

            this.show = function() {
                this.toggle = true;
            };

            this.hide = function() {
                this.toggle = false;
            };
        },
        controllerAs: 'secSelectCtrl'
    };
})
/*  EMpresas */
//------- apl-empresa
.directive('aplEmpresa', function() {
    return {
        restrict: 'E',
        //templateUrl: 'views/sections/appli-empresa.html',
        templateUrl: 'views/position/section/applicant-empresa.html',
        controller: function() {
            this.toggle = false;

            this.show = function() {
                this.toggle = true;
            };

            this.hide = function() {
                this.toggle = false;
            };
        },
        controllerAs: 'secEmpresaCtrl'
    };
})
/*  Documento Clasificacion */
//------- class-docs
.directive('classDocs', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/classification/section/class-docs.html',
        controller: function() {
            this.toggle = false;

            this.show = function() {
                this.toggle = true;
            };

            this.hide = function() {
                this.toggle = false;
            };
        },
        controllerAs: 'secDocsCtrl'
    };
})
//------- class-funct
.directive('classFunct', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/classification/section/class-funct.html',
        controller: function() {
            this.toggle = false;

            this.show = function() {
                this.toggle = true;
            };

            this.hide = function() {
                this.toggle = false;
            };
        },
        controllerAs: 'secFunctCtrl'
    };
})
//------- emp-list
.directive('empList', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/sections/emp-list.html',
        controller: function() {
            this.toggle = false;

            this.show = function() {
                this.toggle = true;
            };

            this.hide = function() {
                this.toggle = false;
            };
        },
        controllerAs: 'secEmpList'
    };
})
// directive for a single list
.directive('dndList', function($parse) {

    return function(scope, element, attrs) {

        // variables used for dnd
        var toUpdate;
        var startIndex = -1;

        // watch the model, so we always know what element
        // is at a specific position
        scope.$watch(attrs.dndList, function(value) {
            toUpdate = value;
        },true);

        // use jquery to make the element sortable (dnd). This is called
        // when the element is rendered
        $(element[0]).sortable({
            items:'li',
            start:function (event, ui) {
                // on start we define where the item is dragged from
                startIndex = ($(ui.item).index());
            },
            stop:function (event, ui) {
                // on stop we determine the new index of the
                // item and store it there
                var newIndex = ($(ui.item).index());
                var toMove = toUpdate[startIndex];
                toUpdate.splice(startIndex,1);
                toUpdate.splice(newIndex,0,toMove);

                // we move items in the array, if we want
                // to trigger an update in angular use $apply()
                // since we're outside angulars lifecycle
                scope.$apply(attrs.dndList);
            },
            axis:'y'
        })
    }
});
;
