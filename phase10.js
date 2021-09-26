var phaseData;

function getData (){

  $.ajax({
    type: "GET",
    url: "phase10_data.json",
    dataType: "json",
    success: function(data)
    {
      phaseData = data;
      generateHtmlTable(data);
    }
  });
}

function generateHtmlTable(data) {
  var html = '<table  class="table table-condensed table-hover table-striped">';

  if(typeof(data[0]) === 'undefined') {
    return null;
  } else {
    $.each(data, function( index, row ) {
      //bind header
      html += '<tr>';
      $.each(row, function (index, colData) {
        html += '<td>';
        html += colData;
        html += '</td>';
      });
      html += '</tr>';
    });
    html += '</tbody>';
    html += '</table>';
    $('#csv-display').append(html);
  }
}



function generateDefault(){
  var randomTenNumbers = [];
  for(let i = 0; i < 10; i++){
    var randomNumber = Math.floor(Math.random() * phaseData.length) + 1;
    randomTenNumbers[i] = randomNumber;
  }
  randomTenNumbers.sort(function(a,b){return a-b});
  alert(randomTenNumbers);


}

getData();

