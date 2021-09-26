var phaseData;

function getData() {

  $.ajax({
    type: "GET",
    url: "phase10_data.json",
    dataType: "json",
    success: function (data) {
      phaseData = data;
      // generateHtmlTable(data, $('#csv-display'));
    }
  });
}

function generateHtmlTable(data, element) {
  var html = '<table class="table table-condensed table-hover table-striped">';

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

function generateRandom(length) {
  return Math.floor(Math.random() * length) + 1;
}

function generateDefault() {
  var randomTenPhases = [];

  for (let i = 0; i < 10; i++) {
    var randomNumber = generateRandom(phaseData.length);
    randomTenPhases[i] = getPhaseByRank(randomNumber);
  }
  randomTenPhases.sort(function (a, b) {
    return a.Rank - b.Rank;
  });
  generateHtmlTable(randomTenPhases.map(function (phase) {
    return [generatePhaseSentence(phase)];
  }), $('#generator-result'))
}

function getPhaseByRank(rank) {
  let filterElement = phaseData.filter(function (phase) {
    return phase.Rank == rank;
  });
  return filterElement[0];
}

function generatePhaseSentence(phase) {
  var sentence = generateGoalSentence(phase.Type1, phase.Count1);

  if (phase.Type2 != undefined) {
    sentence = sentence + "; " + generateGoalSentence(phase.Type2,
        phase.Count2);
  }

  return sentence;
}

function generateGoalSentence(type, count) {
  var sentence = "";
  if (type === 'S') {
    sentence = "Set of ";
  }
  if (type === 'R' || type === 'CR') {
    sentence = "Run of ";
  }
  sentence += count;
  if (type === 'E' || type === 'CE') {
    if (generateRandom(2) === 1) {
      sentence += " even cards";
    } else {
      sentence += " odd cards";
    }
  }
  if (type === 'C' || type === 'CR' || type === 'CE') {
    sentence += " of the same colour";
  }
  return sentence;
}

getData();

