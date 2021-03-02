const { generateAllPermutations } = require('../solverAlgorithm/generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('../solverAlgorithm/filterPermutations');
const { updateColorTracker } = require('../solverAlgorithm/updateColorTracker');

export default function submitGuess({bestNextGuess, secretCode, priorRounds, currentRound, templates, previousGuesses, codeSize, totalRounds, colorOptions, colorTracker, colorsTriedThusFar, colorOrColorsUsedToFillTemplate}) {
  let guessResults = getBlackAndWhitePegs(bestNextGuess, secretCode);

  let clonedPriorRounds = Object.assign({}, priorRounds);

  clonedPriorRounds[currentRound] = {
    guess: [...bestNextGuess],
    results: [...guessResults]
  };

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

  if (guessResults[0] === codeSize) {
    let updatedColorTracker = updateColorTracker([bestNextGuess], colorOptions, colorsTriedThusFar, colorTracker);
    return {
      turns: updatedTurns,
      priorRounds: clonedPriorRounds,
      templates: [bestNextGuess],
      colorTracker: updatedColorTracker
    };
  }

  let allPermutations = generateAllPermutations(templates, colorOrColorsUsedToFillTemplate);

  for (let round in clonedPriorRounds) {
    allPermutations = filterForPossibleSolutions(clonedPriorRounds[round].guess, clonedPriorRounds[round].results, allPermutations);
  }

  let possibleSolutions = allPermutations;

  possibleSolutions = possibleSolutions.filter(solution => !previousGuesses.has(`${solution}`));

  let updatedColorTracker = updateColorTracker(possibleSolutions, colorOptions, colorsTriedThusFar, colorTracker);

  return {
    turns: updatedTurns,
    priorRounds: clonedPriorRounds,
    templates: [...possibleSolutions],
    colorTracker: updatedColorTracker
  }
};