const maximumPhases = 10;
const maximumDifficulty = 5;

let phaseData;
let classicPhases;

$(document).ready(() => {
  $("#generate-phases").click(() => {
    let mode = $("input[name='mode']:checked").val();
    if (mode === "classic") {
      generateClassic();
    } else if (mode === "advanced") {
      generateAdvanced();
    }
  });

  let advancedOptions = $("#advanced-options");
  $("#mode-advanced").click(() => advancedOptions.slideDown(500));
  $("#mode-classic").click(() => advancedOptions.slideUp(500));
});

function getData() {
  $.ajax({
    type: "GET",
    url: "phase10_data.json",
    dataType: "json",
    success: data => phaseData = data
  });
  $.ajax({
    type: "GET",
    url: "classic_phase_data.json",
    dataType: "json",
    success: data => classicPhases = data
  });
}

function presentResult(data, element) {
  let html = '<ol>';

  if (typeof (data[0]) === 'undefined') {
    return null;
  } else {
    $.each(data, (index, phase) => {
      html += '<li>';
      $.each(phase, (index, goal) => {
        html += `<div class="goal ui-corner-all"><div class="goal-content">${goal}</div></div>`
      });
      html += '</li>';
    });

    html += '</ol>';
    element.html(html);
  }

  console.log("<end>")
}

function generateRandomInRange(min, max) {
  let length = (max - min) + 1;
  return Math.floor(Math.random() * length) + min;
}

function getUniqueAdvancedPhases() {
  let difficulty = $("#difficulty option:checked").val();
  let numberOfPhases = $("#phaseCount option:checked").val();

  let minRank;
  let maxRank;
  if (difficulty === "all-ranks") {
    minRank = 1;
    maxRank = phaseData.length;
  } else {
    minRank = ((phaseData.length / maximumDifficulty) * (difficulty - 1))
        - (((numberOfPhases - 1) * (maximumPhases / (maximumPhases - 1)))
            * (difficulty - 1));
    maxRank = ((phaseData.length / maximumDifficulty) * (difficulty))
        + (((numberOfPhases - 1) * (maximumPhases / (maximumPhases - 1)))
            * (maximumDifficulty - difficulty));
  }

  let randomNumbers = [];

  while (randomNumbers.length < numberOfPhases) {
    let num = generateRandomInRange(minRank, maxRank);
    if (randomNumbers.indexOf(num) === -1) {
      randomNumbers.push(num);
    }
  }

  return randomNumbers.map(num => getPhaseByRank(num));
}

function getUniqueRandomPhases(numberOfPhases = 10) {
  let randomNumbers = [];

  while (randomNumbers.length < numberOfPhases) {
    let num = generateRandomInRange(1, phaseData.length);
    if (randomNumbers.indexOf(num) === -1) {
      randomNumbers.push(num);
    }
  }

  return randomNumbers.map(num => getPhaseByRank(num));
}

function getUniqueClassicPhases(numberOfPhases = 10) {
  let ranks = [];

  while (ranks.length < numberOfPhases) {
    let origPhase = ranks.length + 1;
    let startRank = classicPhases.find(
        phase => phase.OriginalPhase === origPhase).Rank;
    let num = generateRandomInRange(startRank - 5, startRank + 5);
    if (ranks.indexOf(num) === -1) {
      ranks.push(num);
    }
  }

  return ranks.map(num => getPhaseByRank(num));
}

function generateClassic() {
  let randomClassicPhases = getUniqueClassicPhases();

  presentResult(
      randomClassicPhases.map(phase => generatePhaseSentence(phase)),
      $('#generator-result'))
}

function generateAdvanced() {
  let randomTenPhases = getUniqueAdvancedPhases();
  randomTenPhases.sort((a, b) => a.Rank - b.Rank);

  presentResult(
      randomTenPhases.map(phase => generatePhaseSentence(phase)),
      $('#generator-result'))
}

function getPhaseByRank(rank) {
  return phaseData.find(phase => phase.Rank === rank);
}

function generatePhaseSentence(phase) {
  let sentence = [];
  console.log("phase rank:", phase.Rank);
  sentence[0] = `<span class="debug-rank" data-rank="${phase.Rank}"></span> `
      + generateGoalSentence(phase.Type1,
          phase.Count1);

  if (phase.Type2 != null) {
    sentence[1] = generateGoalSentence(phase.Type2, phase.Count2);
  }

  return sentence;
}

function generateGoalSentence(type, count) {
  let sentence = "";
  if (type === 'S') {
    sentence = "Set of ";
  }
  if (type === 'R' || type === 'CR') {
    sentence = "Run of ";
  }
  sentence += `<span class="goal-count">${count}</span>`;
  if (type === 'E' || type === 'CE') {
    if (generateRandomInRange(1, 2) === 1) {
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
