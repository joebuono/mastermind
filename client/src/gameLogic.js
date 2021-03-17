const { initializeGame } = require('./solverAlgorithm/globalLogic');
const { generateAllPermutations } = require('./solverAlgorithm/generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('./solverAlgorithm/filterPermutations');
const { updateColorTracker } = require('./solverAlgorithm/updateColorTracker');
const { generateNextGuess } = require('./solverAlgorithm/generateNextGuess');

/*

Note: This module is used for running automated tests to ensure that the solver algorithm is both functioning and performant. 

*/

exports.gameLogic = (codeSize = 4) => {
  let [colorOptions, secretCode, colorTracker] = initializeGame(codeSize);
  let colorsTriedThusFar = [];
  let templates = [new Array(CODE_SIZE).fill('x')];
  let currentGuess = [];
  const previousGuesses = new Set();
  const priorRounds = {};
  let colorOrColorsUsedToFillTemplate = [];
  let currentTurn = 1;
  const turnLimit = 10;

  while (currentTurn <= turnLimit) {
    let [bestNextGuess, fillTempateColorOrColors, addToColorsTriedThusFar] = generateNextGuess(templates, colorTracker, colorsTriedThusFar, CODE_SIZE, previousGuesses);
    currentGuess = bestNextGuess;
    previousGuesses.add(`${bestNextGuess}`);
    colorOrColorsUsedToFillTemplate = fillTempateColorOrColors;
    colorsTriedThusFar = colorsTriedThusFar.concat(addToColorsTriedThusFar);

    let guessResults = getBlackAndWhitePegs(currentGuess, secretCode);

    // check win condition
    if (guessResults[0] === codeSize) {
      return currentTurn;
    }

    priorRounds[currentTurn] = {
      guess: [...bestNextGuess],
      results: [...guessResults]
    }

    let allPermutations = generateAllPermutations(templates, colorOrColorsUsedToFillTemplate); // previously was hard-coded ['r', 'b', 'x']

    let possibleSolutions = [];

    // Use information from prior rounds to filter viable templates
    for (let round in priorRounds) {
      possibleSolutions = filterForPossibleSolutions(priorRounds[round].guess, priorRounds[round].results, allPermutations);
    }
  
    // Filter out previous guesses
    possibleSolutions = possibleSolutions.filter(solution => !previousGuesses.has(`${solution}`));

    templates = [...possibleSolutions];

    colorTracker = updateColorTracker(possibleSolutions, colorOptions, colorsTriedThusFar, colorTracker);
   
    currentTurn++;
  }

  // If the algorithm could not guess the secret code in under [turnLimit] guesses
  return currentTurn;
};
