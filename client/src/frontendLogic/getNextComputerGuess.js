const { generateAllPermutations } = require('../solverAlgorithm/generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('../solverAlgorithm/filterPermutations');
const { updateColorTracker } = require('../solverAlgorithm/updateColorTracker');
const { generateNextGuess } = require('../solverAlgorithm/generateNextGuess');

/* getNextComputerGuess needs to return this information to update state:
  - bestNextGuess
    colorOrColorsUsedToFillTemplate
    colorsTriedThusFar
    templates
    colorTracker
    priorRounds

It will run at the beginning of each round 
- In componentDidMount
- Whenever submitGuess gets executed

submitGuess will move the computerState into the game state
for example, submitGuess will:
- update turns
- update colorTracker
- update the currentRound (should be currentTurn)
- checkWinCondition

*/



const getNextComputerGuess = ({templates, colorTracker, colorsTriedThusFar, codeSize, previousGuesses, secretCode, priorRounds, currentRound}) => {
  
  let [bestNextGuess, fillTempateColorOrColors, addToColorsTriedThusFar] = generateNextGuess(templates, colorTracker, colorsTriedThusFar, codeSize, previousGuesses);

  let clonedPreviousGuess = new Set(previousGuesses);
  clonedPreviousGuess.add(`${bestNextGuess}`);
  let updatedColorsTriedThusFar = [...colorsTriedThusFar].concat(addToColorsTriedThusFar);

  let guessResults = getBlackAndWhitePegs(bestNextGuess, secretCode);

  // Check win condition, put this in a separate function?
  // let nextRound = this.state.currentRound + 1;
  // let updatedWinCondition = this.checkWinCondition(guessResults[0], nextRound, codeSize, totalRounds);

  let clonedPriorRounds = Object.assign({}, priorRounds);

  clonedPriorRounds[currentRound] = {
    guess: [...bestNextGuess],
    results: [...guessResults]
  };


  /* ------- This logic is for submitGuess -------

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

  */

  let allPermutations = generateAllPermutations(templates, fillTempateColorOrColors);
  // console.log('all permutations:', allPermutations);

  // CRUCIAL STEP! Use information from prior rounds to filter viable templates. This solved the main problem!!!
  // Filter templates based on ALL PRIOR ROUNDS
  for (let round in clonedPriorRounds) {
    // console.log('previous round:', clonedPriorRounds[round]);
    // console.log('guess:', clonedPriorRounds[round].guess);
    // console.log('results:', clonedPriorRounds[round].results);
    allPermutations = filterForPossibleSolutions(clonedPriorRounds[round].guess, clonedPriorRounds[round].results, allPermutations);
  }

  // possibleSolutions and templates need to be consolidated. Just pick one!
  let possibleSolutions = allPermutations;
  // console.log('possible solutions:', possibleSolutions);

  // FILTER OUT PREVIOUS GUESSES
  possibleSolutions = possibleSolutions.filter(solution => !previousGuesses.has(`${solution}`));


  /* ----- This functionality will get executed in submitGuess
  let updatedColorTracker = updateColorTracker(possibleSolutions, colorOptions, updatedColorsTriedThusFar, colorTracker);

  this.props.modifyDisplayedColorTracker(updatedColorTracker);
  */

  return {
    bestNextGuess: bestNextGuess,
    colorOrColorsUsedToFillTemplate: fillTempateColorOrColors,
    colorsTriedThusFar: updatedColorsTriedThusFar,
    templates: [...possibleSolutions],
    priorRounds: clonedPriorRounds
  };
};

export default getNextComputerGuess;
