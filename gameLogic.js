const { initializeGame } = require('./solverAlgorithm/globalLogic');
const { generateAllPermutations } = require('./solverAlgorithm/generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('./solverAlgorithm/filterPermutations');
const { updateColorTracker } = require('./solverAlgorithm/updateColorTracker');
const { generateNextGuess } = require('./solverAlgorithm/generateNextGuess');

// ******* GLOBAL VARIABLES ******* //

exports.gameLogic = (/* TESTING */ secretTestCode /* TESTING */) => {
  const CODE_SIZE = secretTestCode.length; // 4 or 5

  let [COLORS, SECRET_CODE, COLOR_TRACKER] = initializeGame(CODE_SIZE);

  // *** TESTING *** //
  SECRET_CODE = secretTestCode; 
  // *** TESTING *** //

  let COLORS_TRIED_THUS_FAR = [];
  // we only add to this when we have complete information, or when the template is still ['x', 'x', 'x', 'x']

  // console.log('COLORS', COLORS);
  // console.log('SECRET_CODE', SECRET_CODE);
  // console.log('COLOR_TRACKER', COLOR_TRACKER);

  let templates = [new Array(CODE_SIZE).fill('x')];

  let guess = [];

  let colorOrColorsUsedToFillTemplate = [];

  let CURRENT_ROUND = 1;
  const ROUND_LIMIT = 20;

  while (CURRENT_ROUND <= ROUND_LIMIT) {
    // these variable names are still a bit verbose and confusing. Run them by Ethan and Andrew
    let [bestNextGuess, fillTempateColorOrColors, addToColorsTriedThusFar] = generateNextGuess(templates, COLOR_TRACKER, COLORS_TRIED_THUS_FAR, CODE_SIZE);
    guess = bestNextGuess;
    colorOrColorsUsedToFillTemplate = fillTempateColorOrColors;
    // addToColorsTriedThusFar could be an empty array, which is totally fine
    COLORS_TRIED_THUS_FAR = COLORS_TRIED_THUS_FAR.concat(addToColorsTriedThusFar);

    console.log(`------------------------------------------------ Round ${CURRENT_ROUND} ------------------------------------------------`);
    console.log('Next guess:', guess);

    let guessResults = getBlackAndWhitePegs(guess, SECRET_CODE);
    console.log('Guess Results:', guessResults);

    // check win condition
    if (guessResults[0] === CODE_SIZE) {
      console.log('YOU WIN!!!');
      return CURRENT_ROUND;
      // break;
    }

    // console.log('These are the templates being used to generate all permutations:', templates);
    let allPermutations = generateAllPermutations(templates, colorOrColorsUsedToFillTemplate); // previously was hard-coded ['r', 'b', 'x']
    console.log('All Permutations:', allPermutations);
    console.log('Number of all possible permutations:', allPermutations.length);

    // possibleSolutions and templates need to be consolidated
    let possibleSolutions = filterForPossibleSolutions(guess, guessResults, allPermutations);
    console.log('Possible Solutions:', possibleSolutions);
    console.log('Number of possible solutions (templates):', possibleSolutions.length);

    // set the global variable
    templates = [...possibleSolutions];

    // updateColorTracker
    COLOR_TRACKER = updateColorTracker(possibleSolutions, COLORS, COLORS_TRIED_THUS_FAR, COLOR_TRACKER);
    console.log(COLOR_TRACKER);
    CURRENT_ROUND++;
  }

  return CURRENT_ROUND;
};
