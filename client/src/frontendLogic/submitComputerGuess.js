const { generateAllPermutations } = require('../solverAlgorithm/generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('../solverAlgorithm/filterPermutations');
const { updateColorTracker } = require('../solverAlgorithm/updateColorTracker');


  /* ------- This logic is for submitGuess -------

  // Check win condition
  // let nextRound = this.state.currentRound + 1;
  // let updatedWinCondition = this.checkWinCondition(guessResults[0], nextRound, codeSize, totalRounds);

  // update turns for display
  // convert priorRounds to array
  const updatedTurns = [];
  for (let round in clonedPriorRounds) {
    updatedTurns.push({
      guess: clonedPriorRounds[round].guess,
      bwPegs: clonedPriorRounds[round].results
    });
  }

  const emptyGuess = new Array(this.state.codeSize).fill('x');
  while (updatedTurns.length < totalRounds) {
    updatedTurns.push({
      guess: emptyGuess,
      bwPegs: [0, 0]
    });
  }

  ----- updateColorTracker (need to import function)
  let updatedColorTracker = updateColorTracker(possibleSolutions, colorOptions, updatedColorsTriedThusFar, colorTracker);

  this.props.modifyDisplayedColorTracker(updatedColorTracker);

  */

//  submitGuess will move the computerState into the game state
//  for example, submitGuess will:
//  - update turns
//  - update colorTracker

const submitComputerGuess = ({bestNextGuess, secretCode, priorRounds, currentRound, templates, previousGuesses, codeSize, totalRounds, colorOptions, colorTracker, colorsTriedThusFar, colorOrColorsUsedToFillTemplate}) => {
  let guessResults = getBlackAndWhitePegs(bestNextGuess, secretCode);

  let clonedPriorRounds = Object.assign({}, priorRounds);

  clonedPriorRounds[currentRound] = {
    guess: [...bestNextGuess],
    results: [...guessResults]
  };

  let allPermutations = generateAllPermutations(templates, colorOrColorsUsedToFillTemplate);

  for (let round in clonedPriorRounds) {
    allPermutations = filterForPossibleSolutions(clonedPriorRounds[round].guess, clonedPriorRounds[round].results, allPermutations);
  }

  // possibleSolutions and templates need to be consolidated. Just pick one!
  let possibleSolutions = allPermutations;

  // FILTER OUT PREVIOUS GUESSES
  possibleSolutions = possibleSolutions.filter(solution => !previousGuesses.has(`${solution}`));

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

  let updatedColorTracker = updateColorTracker(possibleSolutions, colorOptions, colorsTriedThusFar, colorTracker);

  return {
    turns: updatedTurns,
    priorRounds: clonedPriorRounds,
    templates: [...possibleSolutions],
    colorTracker: updatedColorTracker
  }
};

export default submitComputerGuess;