var phaseData;

function getData() {
  $.ajax({
    type: "GET",
    url: "phase10_data.json",
    dataType: "json",
    success: data => phaseData = data
  });
}

function presentResult(data, element) {
  var html = '<ol>';

  if (typeof (data[0]) === 'undefined') {
    return null;
  } else {
    $.each(data, (index, phase) => {
      html += '<li>';
      $.each(phase, (index, goal) => {
        html += `<div class="goal"><div class="goal-content">${goal}</div></div>`
      });
      html += '</li>';
    });

    html += '</ol>';
    element.html(html);
  }
}

function generateRandom(length) {
  return Math.floor(Math.random() * length) + 1;
}

function getUniqueRandomPhases(numberOfPhases = 10) {
  var randomNumbers = [];

  while (randomNumbers.length < numberOfPhases) {
    var num = generateRandom(phaseData.length);
    if (randomNumbers.indexOf(num) === -1) {
      randomNumbers.push(num);
    }
  }

  return randomNumbers.map(num => getPhaseByRank(num));
}

function generateDefault() {
  var randomTenPhases = getUniqueRandomPhases();
  randomTenPhases.sort((a, b) => a.Rank - b.Rank);

  presentResult(
      randomTenPhases.map(phase => generatePhaseSentence(phase)),
      $('#generator-result'))
}

function getPhaseByRank(rank) {
  return phaseData.find(phase => phase.Rank === rank);
}

function generatePhaseSentence(phase) {
  var sentence = [];
  sentence[0] = generateGoalSentence(phase.Type1, phase.Count1);

  if (phase.Type2 != null) {
    sentence[1] = generateGoalSentence(phase.Type2, phase.Count2);
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
  sentence += `<span class="goal-count">${count}</span>`;
  if (type === 'E' || type === 'CE') {
    if (generateRandom(2) === 1) {
      sentence += " evens";
    } else {
      sentence += " odds";
    }
  }
  if (type === 'C' || type === 'CR' || type === 'CE') {
    sentence += " of one colour";
  }
  return sentence;
}

getData();

