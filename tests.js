const { gameLogic } = require('./gameLogic');
const { fillInTemplate } = require('./solverAlgorithm/generatePermutations');

const COLORS = ['r', 'b', 'g', 'y', 'o', 'p', 'n', 'w'];

// // 1,296 for codeSize of 4
// // 32,768 for codeSize of 5

const generateAllPermutationsForTesting = (codeSize) => {
  const colors = COLORS.slice(0, (codeSize * 2 - 2));
  let template = new Array(codeSize).fill('?');
  return fillInTemplate(template, colors);
};

const getAverageTurnsPerPermutation = (codeSize, iterations) => {
  let allPermutations = generateAllPermutationsForTesting(codeSize);
  let averageTurns = [];

  for (let perm of allPermutations) {
    let totalTurns = 0;
    for (let i = 0; i < iterations; i++) {
      totalTurns += gameLogic(perm);
    }
    let avgTurns = +(totalTurns / iterations).toFixed(2);
    averageTurns.push([avgTurns, perm]);
    console.log(perm);
  }

  return averageTurns.sort((a, b) => b[0] - a[0]);
};

let result = getAverageTurnsPerPermutation(5, 10);
console.log(result);
