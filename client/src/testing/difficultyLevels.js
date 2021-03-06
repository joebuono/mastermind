const { initializeGame } = require('../solverAlgorithm/globalLogic');
const { generateAllPermutations } = require('../solverAlgorithm/generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('../solverAlgorithm/filterPermutations');
const { updateColorTracker } = require('../solverAlgorithm/updateColorTracker');
const { generateNextGuess } = require('../solverAlgorithm/generateNextGuess');

// **************************** GLOBAL VARIABLES **************************** //

exports.difficultyLevels = (/* TESTING */ secretTestCode = null, difficulty /* TESTING */) => {
  const CODE_SIZE = secretTestCode ? secretTestCode.length : 4;

  let [COLORS, COLOR_TRACKER, SECRET_CODE] = initializeGame(CODE_SIZE);

  // *** TESTING *** //
  SECRET_CODE = secretTestCode || SECRET_CODE;
  // *** TESTING *** //

  let COLORS_TRIED_THUS_FAR = [];

  // To start, our first template is ['x', 'x', 'x', 'x'] or ['x', 'x', 'x', 'x', 'x'], depending on the size of the code
  let templates = [new Array(CODE_SIZE).fill('x')];

  // This stores our current guess
  let guess = [];

  let previousGuesses = new Set();

  let priorRounds = {};

  let colorOrColorsUsedToFillTemplate = [];

  let CURRENT_ROUND = 1;
  const ROUND_LIMIT = 12;

  while (CURRENT_ROUND <= ROUND_LIMIT) {
    // these variable names are still a bit verbose and confusing. Run them by Ethan, Andrew, Dillon, Alex
    let [bestNextGuess, fillTempateColorOrColors, addToColorsTriedThusFar] = generateNextGuess(templates, COLOR_TRACKER, COLORS_TRIED_THUS_FAR, CODE_SIZE, previousGuesses, difficulty);
    guess = bestNextGuess;
    previousGuesses.add(`${bestNextGuess}`);
    colorOrColorsUsedToFillTemplate = fillTempateColorOrColors;
    // addToColorsTriedThusFar could be an empty array, which is totally fine
    COLORS_TRIED_THUS_FAR = COLORS_TRIED_THUS_FAR.concat(addToColorsTriedThusFar);

    let guessResults = getBlackAndWhitePegs(guess, SECRET_CODE);

    // check win condition
    if (guessResults[0] === CODE_SIZE) {
      return CURRENT_ROUND;
    }

    priorRounds[CURRENT_ROUND] = {
      guess: [...bestNextGuess],
      results: [...guessResults]
    }

    let allPermutations = generateAllPermutations(templates, colorOrColorsUsedToFillTemplate); // previously was hard-coded ['r', 'b', 'x']

    for (let round in priorRounds) {
      allPermutations = filterForPossibleSolutions(priorRounds[round].guess, priorRounds[round].results, allPermutations);
    }

    let possibleSolutions = allPermutations;
  
    // FILTER OUT PREVIOUS GUESSES
    possibleSolutions = possibleSolutions.filter(solution => !previousGuesses.has(`${solution}`));

    // set the global variable
    templates = [...possibleSolutions];

    // updateColorTracker
    COLOR_TRACKER = updateColorTracker(possibleSolutions, COLORS, COLORS_TRIED_THUS_FAR, COLOR_TRACKER);

    CURRENT_ROUND++;
  }

  // If the algorithm could not guess the secret code in under ROUND_LIMIT guesses
  return CURRENT_ROUND;
};
