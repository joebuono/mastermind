const { generateAllPermutations } = require('../solverAlgorithm/generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('../solverAlgorithm/filterPermutations');
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

const getComputerGuessAndState = ({templates, colorTracker, colorsTriedThusFar, codeSize, previousGuesses, secretCode, priorRounds, currentRound}) => {
  
  let [bestNextGuess, fillTempateColorOrColors, addToColorsTriedThusFar] = generateNextGuess(templates, colorTracker, colorsTriedThusFar, codeSize, previousGuesses);

  let clonedPreviousGuess = new Set(previousGuesses);
  clonedPreviousGuess.add(`${bestNextGuess}`);
  let updatedColorsTriedThusFar = [...colorsTriedThusFar].concat(addToColorsTriedThusFar);

  let guessResults = getBlackAndWhitePegs(bestNextGuess, secretCode);

  let clonedPriorRounds = Object.assign({}, priorRounds);

  clonedPriorRounds[currentRound] = {
    guess: [...bestNextGuess],
    results: [...guessResults]
  };

  let allPermutations = generateAllPermutations(templates, fillTempateColorOrColors);

  for (let round in clonedPriorRounds) {
    allPermutations = filterForPossibleSolutions(clonedPriorRounds[round].guess, clonedPriorRounds[round].results, allPermutations);
  }

  // possibleSolutions and templates need to be consolidated. Just pick one!
  let possibleSolutions = allPermutations;

  // FILTER OUT PREVIOUS GUESSES
  possibleSolutions = possibleSolutions.filter(solution => !previousGuesses.has(`${solution}`));

  return {
    bestNextGuess,
    colorOrColorsUsedToFillTemplate: fillTempateColorOrColors,
    colorsTriedThusFar: updatedColorsTriedThusFar,
    templates: [...possibleSolutions],
    priorRounds: clonedPriorRounds
  };
};

export default getComputerGuessAndState;
