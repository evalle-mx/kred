//alert('Cargado graphic...');
var arrCandidatos = [];
function showMyModal(){
	$('#graphCandidato').modal('show');
}

function drawChart() {
		  console.log('drawChart()');
		  
		/* opciones/encabezado */
       
        var optionsCandidato = {
          title: 'Candidato'
        };
        var optionsEmpresa = {
                title: 'Empresa'
              };

		/* Objeto gráficador */		
        if(arrCandidatos!=undefined && arrCandidatos.length>1){
			console.log('arrCandidatos: ', arrCandidatos);
			var dataCandidato = google.visualization.arrayToDataTable(
				arrCandidatos
			);
			console.log('dataCandidato: ', dataCandidato);
			var chartCandidato = new google.visualization.PieChart(document.getElementById('piecandidato'));
			chartCandidato.draw(dataCandidato, optionsCandidato);
		}
      }
      
      function callDraw(){
		  console.log('callDraw');
		 //jsonCandidatos = [{nombre:'Aceptados',cantidad:10},{nombre:'Rechazo por ipg',cantidad:5},{nombre:'Rechazo por ias',cantidad:2},{nombre:'Rechazo por Estado Civil',cantidad:6},{nombre:'Rechazo por Edad',cantidad:2},{nombre:'Rechazo por Formacion Académica',cantidad:3}];  
		  
		  var setData = setDataArray();
		  if(setData==1){
			//google.setOnLoadCallback(drawChart);
			drawChart();
			console.log('after');
		  }
	  }
	  
	  function setDataArray(){
		  console.log('setDataArray');
		  //segmento de candidatos:
		  if(jsonCandidatos!=null && jsonCandidatos.length>0){
			  var tabElem = ['Tipo', 'Cantidad'];
			   arrCandidatos.push(tabElem);
	          $.each(jsonCandidatos, function(i, item) {
				  console.log('candidato: ' + i +': ', item); 
				  tabElem = [item.nombre, item.cantidad ];
				  arrCandidatos.push(tabElem);
			  });
			  
			  return 1; 
		  }
		  return -1;
	  }
