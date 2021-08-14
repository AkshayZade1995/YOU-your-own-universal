function getYear(str) {
    var date = new Date(str);
    return date.getFullYear();
}

function getMonth(str) {
    var date = new Date(str);
    mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    return Number(mnth);
}

function getDay(str) {
    var date = new Date(str);
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return Number(day);
}

function dateYYYYMMDD(year, month, date){
  var calcMonth;
  var calcDate;

  if(month.toString().length == 2){
    calcMonth = month.toString();
  }
  else{
    calcMonth = "0"+month;
  }

  if(date.toString().length == 2){
    calcDate = date.toString();
  }
  else{
    calcDate = "0"+date;
  }

  return year+"-"+calcMonth+"-"+calcDate;
}

function drawMainChart(Actualdata){
  // Main Chart
  am4core.useTheme(am4themes_animated);
  am4core.useTheme(am4themes_dataviz);
  var chart = am4core.create("chartdiv", am4charts.XYChart);
  
  chart.data = Actualdata;

  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 50;

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value1";
  series.dataFields.dateX = "date";
  series.strokeWidth = 2;
  series.stroke = am4core.color("#30246e");
  series.minBulletDistance = 10;
  series.tooltipText = "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}";
  series.tooltip.pointerOrientation = "vertical";

  var series2 = chart.series.push(new am4charts.LineSeries());
  series2.dataFields.valueY = "value2";
  series2.dataFields.dateX = "date";
  series2.strokeWidth = 2;
  series2.strokeDasharray = "3,4";
  series2.stroke = series.stroke;

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.xAxis = dateAxis;

  chart.scrollbarX = new am4core.Scrollbar();
  //chart.scrollbarY = new am4core.Scrollbar();
}

function drawLinearRegression(linearRegressionArray, avg_value){
  var chart2 = am4core.create("chartLinearRegression", am4charts.XYChart);

  chart2.data = JSON.parse(JSON.stringify(linearRegressionArray));

  // Create axes
  var dateAxis2 = chart2.xAxes.push(new am4charts.DateAxis());
  dateAxis2.renderer.grid.template.location = 0;
  dateAxis2.renderer.minGridDistance = 50;

  var valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());
  valueAxis2.logarithmic = true;
  valueAxis2.renderer.minGridDistance = 20;

  // Create series
  var series3 = chart2.series.push(new am4charts.LineSeries());
  series3.dataFields.valueY = "val";
  series3.dataFields.dateX = "date";
  series3.stroke = am4core.color("#30246e");
  series3.tensionX = 0.8;
  series3.strokeWidth = 3;

  var bullet2 = series3.bullets.push(new am4charts.CircleBullet());
  bullet2.circle.fill = am4core.color("#fff");
  bullet2.circle.strokeWidth = 3;

  // Add cursor
  chart2.cursor = new am4charts.XYCursor();
  chart2.cursor.fullWidthLineX = true;
  chart2.cursor.xAxis = dateAxis2;
  chart2.cursor.lineX.strokeWidth = 0;
  chart2.cursor.lineX.fill = am4core.color("#000");
  chart2.cursor.lineX.fillOpacity = 0.1;

  // Add scrollbar
  chart2.scrollbarX = new am4core.Scrollbar();

  // Add a guide
  let range = valueAxis2.axisRanges.create();
  range.value = avg_value;
  range.grid.stroke = am4core.color("#396478");
  range.grid.strokeWidth = 1;
  range.grid.strokeOpacity = 1;
  range.grid.strokeDasharray = "3,3";
  range.label.inside = true;
  range.label.text = "Average";
  range.label.fill = range.grid.stroke;
  range.label.verticalCenter = "bottom";

  var regseries = chart2.series.push(new am4charts.LineSeries());
  regseries.dataFields.valueY = "val";
  regseries.dataFields.dateX = "date";
  regseries.strokeWidth = 2;
  regseries.name = "Linear Regression";

  regseries.plugins.push(new am4plugins_regression.Regression());
}

function drawPolynomialRegression(linearRegressionArray){
  var chart3 = am4core.create("chartPolynomialRegression", am4charts.XYChart);

  chart3.data = JSON.parse(JSON.stringify(linearRegressionArray));

  // Create axes
  var dateAxis3 = chart3.xAxes.push(new am4charts.DateAxis());
  dateAxis3.renderer.grid.template.location = 0;
  dateAxis3.renderer.minGridDistance = 50;

  var valueAxis3 = chart3.yAxes.push(new am4charts.ValueAxis());
  valueAxis3.logarithmic = true;
  valueAxis3.renderer.minGridDistance = 20;

  // Create series
  var series4 = chart3.series.push(new am4charts.LineSeries());
  series4.dataFields.valueY = "val";
  series4.dataFields.dateX = "date";
  series4.stroke = am4core.color("#30246e");
  series4.tensionX = 0.8;
  series4.strokeWidth = 3;

  var bullet3 = series4.bullets.push(new am4charts.CircleBullet());
  bullet3.circle.fill = am4core.color("#fff");
  bullet3.circle.strokeWidth = 3;

  // Add cursor
  chart3.cursor = new am4charts.XYCursor();
  chart3.cursor.fullWidthLineX = true;
  chart3.cursor.xAxis = dateAxis3;
  chart3.cursor.lineX.strokeWidth = 0;
  chart3.cursor.lineX.fill = am4core.color("#000");
  chart3.cursor.lineX.fillOpacity = 0.1;

  // Add scrollbar
  chart3.scrollbarX = new am4core.Scrollbar();

  var regseries2 = chart3.series.push(new am4charts.LineSeries());
  regseries2.dataFields.valueY = "val";
  regseries2.dataFields.dateX = "date";
  regseries2.strokeWidth = 2;
  regseries2.name = "Polynomial Regression";
  regseries2.tensionX = 0.8;
  regseries2.tensionY = 0.8;

  var reg2 = regseries2.plugins.push(new am4plugins_regression.Regression());
  reg2.method = "polynomial";
}

var input = document.getElementById('input');
var Actualdata = [];
var linearRegressionArray = [];
var excelTable = document.getElementById('tbodyid');

var blocksObj = {
    best_value: 0,
    best_date: "",
    avg_value: 0,
    avg_date: "",
    low_value: 1000,
    low_date: ""
};

var temp;
var average_calc = 0;

var appendRow = "";

input.addEventListener('change',function(){
  
  // Read Excel File 
  readXlsxFile(input.files[0]).then(function(data){
    Actualdata = [];
    linearRegressionArray = [];
    blocksObj = {
        best_value: 0,
        best_date: "",
        avg_value: 0,
        avg_date: "",
        low_value: 1000,
        low_date: ""
    };
    appendRow = "";
    excelTable.innerHTML = "";
    for (var i = 1; i < data.length; i++) {        

      temp = Number(data[i][1]);

      if(i == 1 || i == (data.length-1)){
        var strdate = getDay(data[i][0])+"-"+getMonth(data[i][0])+"-"+getYear(data[i][0]);
        if(i == 1){
          blocksObj.avg_date = blocksObj.avg_date + strdate.toString();  
        }
        else{
          blocksObj.avg_date = blocksObj.avg_date +" To "+ strdate.toString();  
        }
        
      }

      average_calc =  average_calc + Number(data[i][1]);

      if(temp > blocksObj.best_value){
        blocksObj.best_value = temp;
        blocksObj.best_date = getDay(data[i][0])+"-"+getMonth(data[i][0])+"-"+getYear(data[i][0]);
      }
      else if(temp < blocksObj.low_value){
        blocksObj.low_value = temp;
        blocksObj.low_date = getDay(data[i][0])+"-"+getMonth(data[i][0])+"-"+getYear(data[i][0]);
      }
      
      
      Actualdata.push({
        date:new Date(getYear(data[i][0]),getMonth(data[i][0]),getDay(data[i][0])), value1:data[i][1], value2:data[i][2],
        previousDate:new Date(getYear(data[i][0]),getMonth(data[i][0]),getDay(data[i][0]))
      });

      linearRegressionArray.push({
        val : Number(data[i][1]),
        date : dateYYYYMMDD(getYear(data[i][0]),getMonth(data[i][0]),getDay(data[i][0]))
      }); 

      appendRow = appendRow + "<tr><td class='font-weight-bold'>"+dateYYYYMMDD(getYear(data[i][0]),getMonth(data[i][0]),getDay(data[i][0]))+"</td><td class='text-muted'>"+data[i][1]+"</td><td>"+data[i][2]+"</td></tr>";
      

    }// close iteration loop
    
    $("#tbodyid").empty();
    excelTable.innerHTML = appendRow;


    
    blocksObj.avg_value = Number(average_calc)/Number(data.length-1);

    document.getElementById("id_best_val").innerHTML = blocksObj.best_value;
    document.getElementById("id_best_date").innerHTML = blocksObj.best_date;
    document.getElementById("id_avg_val").innerHTML = blocksObj.avg_value.toFixed(2);
    document.getElementById("id_avg_date").innerHTML = blocksObj.avg_date;
    document.getElementById("id_low_val").innerHTML = blocksObj.low_value;
    document.getElementById("id_low_date").innerHTML = blocksObj.low_date;

    // Amcharts Function
    am4core.ready(function(){

      drawMainChart(Actualdata);
      
      drawLinearRegression(linearRegressionArray, blocksObj.avg_value);

      drawPolynomialRegression(linearRegressionArray);

      $('#excelTable').DataTable();
    }); // close Amcharts Function

  }); // close readXlsxFile
    
});   