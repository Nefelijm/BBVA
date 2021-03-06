$(document).ready(function() {
  $('.sidenav').sidenav();
});

var $spendMonth = $('.spend-month-p');
var $numberCount = $('.number-count');
var $typeCount = $('.type-count');
var $residue = $('.residue');
var $typeCurrent = $('.type-curr');
var $boxNone = $('.box-none');
var $comentary = $('#comentary');
var url = 'https://alejandracp.github.io/BBVA-Json/data.json';

var proxy = 'https://cors-anywhere.herokuapp.com/';

$.ajax({
  url: proxy + url,
  contentType: 'application/json',
  method: 'GET',
  success: function(response) {
    getStatus(response);
    expensesMonths(response);
  }
});

// Estado de cuenta
function getStatus(data) {
  if (data.CODIGO_ESTADO === 200) {
    dataAccounts(data);
  }
}

var i = 0;
var consum = 0;
var j = 0;
var num = 0;
// Muestra número de cuenta, saldo y suma de saldos.
function dataAccounts(data) {
  var cantAcounts = data.DATA.LISTA_CTA;
  var creditCount = data.DATA.LISTA_TARJ;
  $.each(cantAcounts, function(index, value) {
    num = parseFloat(value.SALDO.replace(',', ''));
    $numberCount.append(`<p class="color-blue-text bold">${value.NCUENTA}</p>`);
    $numberCount.append(`<p class="type-count display-block">${value.TIPO_CTA}</p>`);
    $residue.append(`<p class="color-blue-text bold">${value.SALDO}</p>`);
    $residue.append(`<p class="type-count size-type">NUEVOS ${value.MONEDA}</p>`);
    i += num;
  });
  $.each(creditCount, function(index, value) {
    $numberCount.append(`<p class="color-blue-text bold">${value.NUMEROTARJETA}</p>`);
    $numberCount.append(`<p class="type-count display-block">CUENTA ${value.TIPOTARJETA}</p>`);
    $residue.append(`<p class="color-blue-text bold">${value.CREDITODISPONIBLE}</p>`);
    $residue.append(`<p class="type-count size-type">NUEVOS ${value.CURRENCY}</p>`);
    var creditAble = parseFloat(value.CREDITODISPONIBLE.replace(',', ''));
    var creditLimit = parseFloat(value.LIMITECREDITO.replace(',', ''));
    consum = creditLimit - creditAble;
  });

  function comentaryConti(num) {
    if (num > 5000) {
      $comentary.html(
        '<p>Sabías que con el gasto de este mes podrías ahorrar para empezar a pagar tu futuro departamento</p>'
      );
    } else if (num > 2000) {
      $comentary.html(
        '<p>Sabías que con el gasto de este mes podrías hacer un viaje a Cusco</p>'
      );
    } else if (num < 500) {
      $comentary.html(
        '<p>Sabías que con el gasto de este mes podrías pasar un fin de semanacon tu familia fuera de Lima</p>'
      );
    }
  }
  $spendMonth.append(i.toFixed(2));
  comentaryConti(consum);
}

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChart2);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', 'dg'],
    ['Ingreso', Number(i.toFixed(2))],
    ['Consumo', Number(consum.toFixed(2))]
  ]);
  var options = {
    title: 'Consumo vs Ingreso',
    colors: ['#02428C', '#61C2F0']
  };

  var chart = new google.visualization.PieChart(
    document.getElementById('donut1')
  );
  chart.draw(data, options);
}

var enero = 0;
febrero = 0;
marzo = 0;
abril = 0;
mayo = 0;
junio = 0;
julio = 0;
agosto = 0;
setiembre = 0;
octubre = 0;
noviembre = 0;
diciembre = 0;
function expensesMonths(data) {
  var cantAcounts = data.DATA.LISTA_CTA;
  $.each(cantAcounts, function(index, value) {
    enero += parseFloat(value.EGRESOS.MESES.ENERO);
    febrero += parseFloat(value.EGRESOS.MESES.FEBRERO);
    marzo += parseFloat(value.EGRESOS.MESES.MARZO);
    abril += parseFloat(value.EGRESOS.MESES.ABRIL);
    mayo += parseFloat(value.EGRESOS.MESES.MAYO);
    junio += parseFloat(value.EGRESOS.MESES.JUNIO);
    julio += parseFloat(value.EGRESOS.MESES.JULIO);
    agosto += parseFloat(value.EGRESOS.MESES.AGOSTO);
    setiembre += parseFloat(value.EGRESOS.MESES.SETIEMPBRE);
    octubre += parseFloat(value.EGRESOS.MESES.OCTUBRE);
    noviembre += parseFloat(value.EGRESOS.MESES.NOVIEMBRE);
    diciembre += parseFloat(value.EGRESOS.MESES.DICIEMBRE);
  });
  console.log(setiembre);
}


// google charts year
function drawChart2() {
  var data = new google.visualization.arrayToDataTable([
    ['Mes', 'Consumo'],
    ['Enero', enero],
    ['Febrero', febrero],
    ['Marzo', marzo],
    ['Abril', abril],
    ['Mayo', mayo],
    ['Junio', junio],
    ['Julio', julio],
    ['Agosto', agosto],
    ['Setiembre', setiembre],
    ['Octubre', octubre],
    ['Noviembre', noviembre],
    ['Diembre', diciembre]
  ]);

  var options = {
    title: 'Gasto mensual 2017',
    hAxis: { title: 'Year',
      titleTextStyle: { color: '#02428C' } },
    vAxis: { minValue: 0 }
  };

  var chart = new google.visualization.AreaChart(
    document.getElementById('chart-div')
  );
  chart.draw(data, options);
}