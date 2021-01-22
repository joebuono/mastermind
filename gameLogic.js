const { initializeGame } = require('./solverAlgorithm/globalLogic');
const { generateAllPermutations } = require('./solverAlgorithm/generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('./solverAlgorithm/filterPermutations');
const { updateColorTracker } = require('./solverAlgorithm/updateColorTracker');
const { generateNextGuess } = require('./solverAlgorithm/generateNextGuess');

// **************************** GLOBAL VARIABLES **************************** //

exports.gameLogic = (/* TESTING */ secretTestCode = null /* TESTING */) => {
  const CODE_SIZE = secretTestCode ? secretTestCode.length : 4;

  let [COLORS, SECRET_CODE, COLOR_TRACKER] = initializeGame(CODE_SIZE);

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
    let [bestNextGuess, fillTempateColorOrColors, addToColorsTriedThusFar] = generateNextGuess(templates, COLOR_TRACKER, COLORS_TRIED_THUS_FAR, CODE_SIZE, previousGuesses);
    guess = bestNextGuess;
    previousGuesses.add(`${bestNextGuess}`);
    colorOrColorsUsedToFillTemplate = fillTempateColorOrColors;
    // addToColorsTriedThusFar could be an empty array, which is totally fine
    COLORS_TRIED_THUS_FAR = COLORS_TRIED_THUS_FAR.concat(addToColorsTriedThusFar);

    // console.log(`------------------------------------------------ Round ${CURRENT_ROUND} ------------------------------------------------`);
    // console.log('Next guess:', guess);

    let guessResults = getBlackAndWhitePegs(guess, SECRET_CODE);
    // console.log('Guess Results:', guessResults);

    // check win condition
    if (guessResults[0] === CODE_SIZE) {
      // console.log('YOU WIN!!!');
      return CURRENT_ROUND;
    }

    priorRounds[CURRENT_ROUND] = {
      guess: [...bestNextGuess], // not sure if copying the arrays is necessary, just playing it safe
      results: [...guessResults]
    }

    // console.log('These are the templates being used to generate all permutations:', templates);
    let allPermutations = generateAllPermutations(templates, colorOrColorsUsedToFillTemplate); // previously was hard-coded ['r', 'b', 'x']
    // console.log('All Permutations:', allPermutations);
    // console.log('Number of all possible permutations:', allPermutations.length);


    // CRUCIAL STEP! Use information from prior rounds to filter viable templates. This solved the main problem!!!
    // Filter templates based on ALL PRIOR ROUNDS
    for (let round in priorRounds) {
      // console.log('previous round:', priorRounds[round]);
      // console.log('guess:', priorRounds[round].guess);
      // console.log('results:', priorRounds[round].results);
      allPermutations = filterForPossibleSolutions(priorRounds[round].guess, priorRounds[round].results, allPermutations);
    }

    // possibleSolutions and templates need to be consolidated. Just pick one!
    let possibleSolutions = allPermutations;
    // console.log('Possible Solutions:', possibleSolutions);
    // console.log('Number of possible solutions (templates):', possibleSolutions.length);
  
    // FILTER OUT PREVIOUS GUESSES
    possibleSolutions = possibleSolutions.filter(solution => !previousGuesses.has(`${solution}`));

    // set the global variable
    templates = [...possibleSolutions];

    // updateColorTracker
    COLOR_TRACKER = updateColorTracker(possibleSolutions, COLORS, COLORS_TRIED_THUS_FAR, COLOR_TRACKER);
    // console.log(COLOR_TRACKER);
    CURRENT_ROUND++;
  }

  // If the algorithm could not guess the secret code in under ROUND_LIMIT guesses
  return CURRENT_ROUND;
};
