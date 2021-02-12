const { generateAllPermutations } = require('../solverAlgorithm/generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('../solverAlgorithm/filterPermutations');
const { updateColorTracker } = require('../solverAlgorithm/updateColorTracker');

const submitComputerGuess = ({bestNextGuess, secretCode, priorRounds, currentRound, templates, previousGuesses, codeSize, totalRounds, colorOptions, colorTracker, colorsTriedThusFar, colorOrColorsUsedToFillTemplate}) => {
  let guessResults = getBlackAndWhitePegs(bestNextGuess, secretCode);

  let clonedPriorRounds = Object.assign({}, priorRounds);

  clonedPriorRounds[currentRound] = {
    guess: [...bestNextGuess],
    results: [...guessResults]
  };

  // update turns for display
  // convert priorRounds to array (this seems redundant, refactor to a better data structure)
  const updatedTurns = [];
  for (let round in clonedPriorRounds) {
    updatedTurns.push({
      guess: clonedPriorRounds[round].guess,
      bwPegs: clonedPriorRounds[round].results
    });
  }

  const emptyGuess = new Array(codeSize).fill('x');
  while (updatedTurns.length < totalRounds) {
    updatedTurns.push({
      guess: emptyGuess,
      bwPegs: [0, 0]
    });
  }

  // check if guess matches secretCode
  // check here if black pegs === 0, then return state early
  if (guessResults[0] === codeSize) {
    let updatedColorTracker = updateColorTracker([bestNextGuess], colorOptions, colorsTriedThusFar, colorTracker);
    return {
      turns: updatedTurns,
      priorRounds: clonedPriorRounds,
      templates: [bestNextGuess],
      colorTracker: updatedColorTracker
    };
  }

  // What if the number of black pegs (guessResults[0]) === codeSize?
  // Return state early
  /*

  let updatedColorTracker = updateColorTracker(possibleSolutions, colorOptions, colorsTriedThusFar, colorTracker);

  return {
    turns: updatedTurns,
    priorRounds: clonedPriorRounds,
    templates: [...possibleSolutions],
    colorTracker: updatedColorTracker
  }

  */
  // let updatedColorTracker = updateColorTracker(bestNextGuess, colorOptions, colorsTriedThusFar, colorTracker);

  let allPermutations = generateAllPermutations(templates, colorOrColorsUsedToFillTemplate);

  for (let round in clonedPriorRounds) {
    allPermutations = filterForPossibleSolutions(clonedPriorRounds[round].guess, clonedPriorRounds[round].results, allPermutations);
  }

  // possibleSolutions and templates need to be consolidated. Just pick one!
  let possibleSolutions = allPermutations;

  // FILTER OUT PREVIOUS GUESSES
  possibleSolutions = possibleSolutions.filter(solution => !previousGuesses.has(`${solution}`));

  let updatedColorTracker = updateColorTracker(possibleSolutions, colorOptions, colorsTriedThusFar, colorTracker);

  return {
    turns: updatedTurns,
    priorRounds: clonedPriorRounds,
    templates: [...possibleSolutions],
    colorTracker: updatedColorTracker
  }
};

export default submitComputerGuess;