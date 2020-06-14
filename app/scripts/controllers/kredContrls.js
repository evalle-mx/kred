/*  ************************************************      POSTULANT (RESULTADO DE CANDIDATOS)    ************************************************************* */
dotHrApp
.controller('myInfoCtrl',function($scope, $rootScope,$routeParams, $filter, $location, $anchorScroll,
    $window, $route, commonResource, restResource){
    document.title = 'Account information'
    console.log('myInfoCtrl...')
    /*   Auxiliar variables */
	$scope.msgSuccess=''
	$scope.msgError=''
    $scope.errFind=''
    console.log('User: ', $scope.user)

    if($scope.user && $scope.user.idUser){
      console.log('user COntacts')
     
    }


  $scope.docDelConf = function(idDoc){
    console.log('Deleting file...')
  }


  /*$scope.greeting = function(){
    console.log('Probando saludo desde dothrRest ...')

    let successFn = function (result) {      
      console.log('result: ', result);
    }; 
    let failFn = function (result) {
             alert('falla de comunicación');
    };
    
    let jsReq = {idUser:'99'};
        
    restResource.getJsonResp('URICODE',jsReq).success(successFn).error(failFn);
  } */



})
.controller('cashFlowCtrl',function($scope, $rootScope,$routeParams, $filter, $location, $anchorScroll,
    $window, $route, commonResource){
    document.title = 'Personal Cash Flow'
    console.log('cashFlowCtrl...')
    /*  Auxiliar variables */
	$scope.msgSuccess=''
	$scope.msgError=''
    $scope.errFind=''
  console.log('$scope.metrics: ', $scope.metricas)


    /*  +++++++ PIE Graph  ++++++  */
   

    let ctxP = document.getElementById("pieChart").getContext('2d');
    let myPieChart = new Chart(ctxP, {
      type: 'pie',
      data: {
        labels: ["Utilies", "Clothing", "Travel", "Groceries","Services","Business","Automotive"],
        datasets: [{
          data: [$scope.metricas.utilies, $scope.metricas.clothing, 
            $scope.metricas.travel, $scope.metricas.groceries, $scope.metricas.services, 
            $scope.metricas.business, $scope.metricas.automotive], 
          backgroundColor: ["#35EAE7", "#FFDD33", "#F7464A", "#949FB1","#3587EA","#48CD42","#EA6C35"],
          hoverBackgroundColor: ["#EA6CFF","#EA6CFF", "#EA6CFF", "#EA6CFF","#EA6CFF","#EA6CFF","#EA6CFF"]
        }]
      },
      options: {
        responsive: true
      }
    });


    /* ++++++++++++++++++++++ BAR GRAPH  +++++++++++++++++++++++++++++++++ */
var ctxB = document.getElementById("barChart").getContext('2d');
let colorBackg = 'rgba(252, 255, 51, 01)';
let colorBord = 'rgba(249,202,45,1)'


let barData=[]
let barLabels=[]
let colorBacks = []
let colorBords = [] 
$scope.metricas.expensesMonth.forEach(function(exMonth, index) {
  console.log('exMonth: ', exMonth)
  barLabels.push(exMonth.month)
  barData.push(exMonth.quantity)
  colorBacks.push(colorBackg)
  colorBords.push(colorBord)
});

console.log('barLabels: ', barLabels)

var myBarChart = new Chart(ctxB, {
    type: 'bar',
    data: {
        labels: barLabels,
        datasets: [{
            label: '$ Expenses',
            data: barData,
            backgroundColor: colorBacks,
            borderColor: colorBords,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});



    /*  ++++++++  Transactions  +++++++  */
    $scope.transactions = $scope.metricas.transactions
    $scope.totalTransactions = 0
    $scope.transactions.forEach(function(trans, index) {
      console.log('trans.amount: ', trans.amount)
      $scope.totalTransactions+=trans.amount
    });

    $scope.totalTransactions= $scope.totalTransactions.toFixed(2)
    console.log('$scope.totalTransactions> ', $scope.totalTransactions )
    
   $('[data-toggle="tooltip"]').tooltip();

})

.controller('credProfileCtrl',function($scope, $rootScope,$routeParams, $filter, $location, $anchorScroll,
  $window, $route, commonResource){
    document.title = 'Credit Profile'
    console.log('credProfileCtrl...')

    console.log('$scope.credProf> ', $scope.credProf)

    //line
    var ctxL = document.getElementById("lineChart").getContext('2d');
    var myLineChart = new Chart(ctxL, {
      type: 'line',
      data: {
        labels: ["October", "November", "December","January", "February", "March", "April"],
        datasets: [{
            label: "Your half year behavior",
            data: [770, 740, 750, 730, 770, 730, 780],
            backgroundColor: [
              'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
              'rgba(200, 99, 132, .7)',
            ],
            borderWidth: 2
          }
          ,
          {
            label: "Reference behavior",
            data: [750, 740, 780, 690, 780, 750, 790],
            backgroundColor: [
              'rgba(90.2, 89.8, 100, .2)',
            ],
            borderColor: [
              'rgba(80, 80, 89.8, .5)',
            ],
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true
      }
    });


    //doughnut
    let doughnutData=[]
    let doughnutLabels=[]
    let colorBacks = []
    let colorHover = [] 
    $scope.credProf.creditScoreCalculation.forEach(function(calcul, index) {
      console.log('calcul: ', calcul)
      doughnutLabels.push(calcul.name)
      doughnutData.push(calcul.percentage)
      colorBacks.push(calcul.rgb)
      colorHover.push("#FF5A5E")
    });
    var ctxD = document.getElementById("doughnutChart").getContext('2d');
    var myLineChart = new Chart(ctxD, {
      type: 'doughnut',
      data: {
        labels: doughnutLabels,
        datasets: [{
          data: doughnutData,
          backgroundColor: colorBacks,
          hoverBackgroundColor: colorHover
        }]
      },
      options: {
        responsive: true
      }
    });



})
;