var phaseData;

function getData() {

  $.ajax({
    type: "GET",
    url: "phase10_data.json",
    dataType: "json",
    success: function (data) {
      phaseData = data;
      generateHtmlTable(data, $('#csv-display'));
    }
  });
}

function generateHtmlTable(data, element) {
  var html = '<table  class="table table-condensed table-hover table-striped">';

  if (typeof (data[0]) === 'undefined') {
    return null;
  } else {
    $.each(data, function (index, row) {
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
    element.html(html);
  }
}

function generateDefault() {
  var randomTenPhases = [];
  for (let i = 0; i < 10; i++) {
    var randomNumber = Math.floor(Math.random() * phaseData.length) + 1;
    randomTenPhases[i] = getPhaseByRank(randomNumber);
  }
  randomTenPhases.sort(function (a, b) {
    return a.Rank - b.Rank;
  });
  // alert(randomTenPhases.map(function(p) {return p.Rank;}));
  console.log(randomTenPhases);
  generateHtmlTable(randomTenPhases, $('#generator-result'))
}

function getPhaseByRank(rank) {
  let filterElement = phaseData.filter(function (phase) {
    return phase.Rank == rank;
  });
  console.log(filterElement.length);
  return filterElement[0];
}

function generatePhaseTable(){

}

getData();

