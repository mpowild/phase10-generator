var phaseData;

function getData() {
  $.ajax({
    type: "GET",
    url: "phase10_data.json",
    dataType: "json",
    success: data => {
      phaseData = data;
    }
  });
}

function generateHtmlTable(data, element) {
  var html = '<table class="table table-condensed table-hover table-striped">';

  if (typeof (data[0]) === 'undefined') {
    return null;
  } else {
    $.each(data, (index, row) => {
      //bind header
      html += '<tr>';
      $.each(row, (index, colData) => {
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

function getUniqueRandomPhases(numberOfPhases = 10) {
  var randomTenNumbers = [];

  while (randomTenNumbers.length < numberOfPhases) {
    var num = generateRandom(phaseData.length);
    if (randomTenNumbers.indexOf(num) === -1) {
      randomTenNumbers.push(num);
    }
  }

  return randomTenNumbers.map(num => getPhaseByRank(num));
}

function generateDefault() {
  var randomTenPhases = getUniqueRandomPhases();
  randomTenPhases.sort((a, b) => a.Rank - b.Rank);

  generateHtmlTable(
      randomTenPhases.map(phase => [generatePhaseSentence(phase)]),
      $('#generator-result'))
}

function getPhaseByRank(rank) {
  return phaseData.find(phase => phase.Rank === rank);
}

function generatePhaseSentence(phase) {
  var sentence = generateGoalSentence(phase.Type1, phase.Count1);

  if (phase.Type2 != null) {
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

