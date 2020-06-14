/*  ************************************************      POSTULANT (RESULTADO DE CANDIDATOS)    ************************************************************* */
protoApp.controller('cashFlowCtrl',function($scope, $rootScope,$routeParams, $filter, $location, $anchorScroll,
    $window, $route, commonResource){
    document.title = 'Métricas de Posición'
    console.log('cashFlowCtrl...')
    /*  Variables auxiliares para la vista */
	$scope.msgSuccess=''
	$scope.msgError=''
    $scope.errFind=''

  
  //$scope.idPosicion = '5';
  console.log('$scope.metricas: ', $scope.metricas)
    
    /*  ++++ Pestaña Candidatos ++++++ */
    $scope.candidatos = $scope.metricas.candidatos
    /*[
        {nombre:'Violeta la Poeta', idTipoGenero:'1', idCandidato:'9', nFasesCompletas:8, nFasesTotal:15, enProceso:'1', porcAvance:60, porcPendiente:40},
        {nombre:'Justin bieber', idTipoGenero:'2', idCandidato:'41', nFasesCompletas:6, nFasesTotal:15, enProceso:'0', porcAvance:40, porcPendiente:60},
        {nombre:'Selena Gomez', idTipoGenero:'1', idCandidato:'35', nFasesCompletas:10, nFasesTotal:15, enProceso:'1', advertencia:'Candidato Desfasado', porcAvance:70, porcPendiente:30},
        {nombre:'Dannia Ukranian', idTipoGenero:'1', idCandidato:'5', nFasesCompletas:3, nFasesTotal:15, enProceso:'1', porcAvance:10, porcPendiente:90}
    ]*/

    /*  +++++++ Grafica de Proceso  ++++++  */
    //NOTA: En servicio si no se define cuota, se calcula sumando los candidatos existentes
    $scope.alcance = {cuota:$scope.metricas.cuota, contratados:$scope.metricas.contratados, 
      enproceso:$scope.metricas.enproceso, rechazados:$scope.metricas.rechazados}
    //{cuota:20, contratados:2, enproceso:10, rechazados:5 }

    /* calculo de faltantes */
    console.log('calculando faltantes')
    let iCuota = parseInt($scope.alcance.cuota)
    let iContratados =  parseInt($scope.alcance.contratados)
    let iEnProceso = parseInt($scope.alcance.enproceso)
    let iRechazado = parseInt($scope.alcance.rechazados)

    $scope.alcance.faltantes = $scope.metricas.faltantes
    //iCuota - (iContratados + iEnProceso + iRechazado )
    console.log('cuota: ',  iCuota, ', contratados: ', iContratados, ', enProceso: ', iEnProceso,
     ', rechazados: ', iRechazado  )

     //console.log(parseInt($scope.alcance.cuota), "- (",  )

     console.log(' faltantes: ', $scope.alcance.faltantes)

    let ctxP = document.getElementById("pieChart").getContext('2d');
    let rechazado = $scope.alcance.rechazados, enProceso = $scope.alcance.enproceso, contratado = $scope.alcance.contratados, faltante = $scope.alcance.faltantes
    let myPieChart = new Chart(ctxP, {
      type: 'pie',
      data: {
        labels: ["Contratados", "En proceso", "Rechazados", "Faltantes"],
        datasets: [{
          data: [contratado, enProceso, rechazado, faltante], 
          backgroundColor: ["#48CD42", "#FFDD33", "#F7464A", "#949FB1"],
          hoverBackgroundColor: ["#8DFF33", "#FFF933", "#FF5A5E", "#A8B3C5"]
        }]
      },
      options: {
        responsive: true
      }
    });

    /*  ++++++++  Avance General (FASES)  +++++++  */
    $scope.fases = $scope.metricas.fases
    /* [{
      "nombre": "Búsqueda Candidato",
      "idModeloRscPosFase": "88",
      "completado":20,
      "total":"20"
    }, {
      "nombre": "Entrevista Técnica",
      "idModeloRscPosFase": "90",
      "completado":18,
      "total":"20"
    }, {
      "nombre": "Evaluación",
      "idModeloRscPosFase": "91",
      "completado":10,
      "advertencia":"pedro esta desfasado",
      "total":"20"
    }, {
      "nombre": "Oferta",
      "idModeloRscPosFase": "92",
      "completado":4,
      "total":"20"
    }, {
      "nombre": "Contrato",
      "idModeloRscPosFase": "93",
      "completado":2,
      "total":"20"
    }]*/
    /* Calculo de Porcentajes para vista */
    $scope.fases.forEach(function(myFase, index) {
      console.log('myFase.total: ', myFase.total, ' myFase.completado: ', myFase.completado)
      myFase.pendiente = parseInt(myFase.total) - parseInt(myFase.completado)
      myFase.porcCompletado =  calcPorcent(parseInt(myFase.completado), parseInt(myFase.total))
      myFase.porcPendiente =  calcPorcent(parseInt(myFase.pendiente), parseInt(myFase.total))
      //console.log('myFase.porcCompletado: ', myFase.porcCompletado)
    });

    /*  ++++++++  Avance General (FASES)  +++++++  */
    $scope.monitores = $scope.metricas.monitores
    if($scope.monitores.length > 0){
      console.log('Calculando porcentajes ', )
      $scope.monitores.forEach(function(monitorTmp, index){
          if(monitorTmp.fases && monitorTmp.fases.length>0){
            monitorTmp.fases.forEach(function(faseMon){
              faseMon.pendiente = parseInt(faseMon.total) - parseInt(faseMon.completado)
              faseMon.porcCompletado =  calcPorcent(parseInt(faseMon.completado), parseInt(faseMon.total))
              faseMon.porcPendiente =  calcPorcent(parseInt(faseMon.pendiente), parseInt(faseMon.total))
            })
          }
      });

    }

    
   $('[data-toggle="tooltip"]').tooltip();

    
    


    $scope.regrCandidatos = function(){
      console.log('volviendo a la vista de Candidatos')
      $location.path('/candproc/'+$scope.idPosicion)
    }
    $scope.regrPosicion = function(){
      console.log('volviendo a la vista de Posicion')
      $location.path('/vcEdit/'+$scope.idPosicion)
    }
});