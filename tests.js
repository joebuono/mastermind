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
  }

  return averageTurns.sort((a, b) => b[0] - a[0]);
};

let result = getAverageTurnsPerPermutation(4, 100);
console.log(result);

// let result = gameLogic(['r', 'p', 'o', 'p']);
// console.log(result);

/*

Write a test suite!

- First, generate every possible permutation (1296 for a code of 4)

- Then, run the solver algorithm 100 times for each secret code

- Store the average number of turns it takes to solve each code, along with the code

- Then, return an array sorted by the average number of turns it takes to solve each code

- Then, see if you can reduce this through randomization in selecting colors (and perhaps other clever tricks!)

Test these secret codes:

// Have (thus far) fixed all secret codes stumping the algorithm!

// Less important tests:

[ 'r', 'b', 'r', 'b' ] // solves it in 7 steps; seems inefficient

['r', 'r', 'r', 'p'] // this involves a fascinating optimization that I haven't yet coded!

*/

