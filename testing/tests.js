const { gameLogic } = require('../gameLogic');
const { fillInTemplate } = require('../solverAlgorithm/generatePermutations');

const COLORS = ['r', 'b', 'g', 'y', 'o', 'p', 'n', 'w'];

let failedAtLeastOnce = [];

const generateAllPermutationsForTesting = (codeSize) => {
  const colors = COLORS.slice(0, (codeSize * 2 - 2));
  let template = new Array(codeSize).fill('?');
  return fillInTemplate(template, colors);
};

const getAverageTurnsPerPermutation = (codeSize, iterations) => {
  let allPermutations = generateAllPermutationsForTesting(codeSize);
  let averageTurns = [];

  for (let perm of allPermutations) {
    console.log(perm);
    let totalTurns = 0;
    for (let i = 0; i < iterations; i++) {
      let turnsToSolve = gameLogic(perm);
      if (turnsToSolve > 20) {
        failedAtLeastOnce.push(perm);
        break;
      }
      totalTurns += turnsToSolve;
    }
    let avgTurns = +(totalTurns / iterations).toFixed(2);
    averageTurns.push([avgTurns, perm]);
  }

  return averageTurns.sort((a, b) => b[0] - a[0]);
};

const getWorstCaseTurnsPerPermutation = (codeSize, iterations) => {
  let allPermutations = generateAllPermutationsForTesting(codeSize);
  let worstCases = [];

  for (let perm of allPermutations) {
    console.log(perm);
    let worstCase = 0;
    for (let i = 0; i < iterations; i++) {
      let turnsToSolve = gameLogic(perm);
      worstCase = Math.max(worstCase, turnsToSolve);
    }
    worstCases.push([worstCase, perm]);
  }

  return worstCases.sort((a, b) => b[0] - a[0]);
};

let codeSize = 4;
let worstCases = getAverageTurnsPerPermutation(codeSize, 100);
console.log(`Single worst average case for code size ${codeSize}:`, worstCases[0]);
let total = 0;
for (let worstCase of worstCases) {
  total += worstCase[0];
}
let globalAverageForWorstCases = total / worstCases.length;
console.log(`Global average for average cases for code size ${codeSize}:`, globalAverageForWorstCases);
// let averageCases = getAverageTurnsPerPermutation(4, 10);
// console.log(averageCases);
// console.log('failed at least once:', failedAtLeastOnce);

// 1,296 possible solutions for codeSize of 4
// 32,768 possible solutions for codeSize of 5

