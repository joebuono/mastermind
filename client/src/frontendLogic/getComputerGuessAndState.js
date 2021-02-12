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

*/

const getComputerGuessAndState = ({templates, colorTracker, colorsTriedThusFar, codeSize, previousGuesses, difficulty = 'hard'}) => {
  let [bestNextGuess, fillTempateColorOrColors, addToColorsTriedThusFar] = generateNextGuess(templates, colorTracker, colorsTriedThusFar, codeSize, previousGuesses, difficulty);

  let clonedPreviousGuesses = new Set(previousGuesses);
  clonedPreviousGuesses.add(`${bestNextGuess}`);
  let updatedColorsTriedThusFar = [...colorsTriedThusFar].concat(addToColorsTriedThusFar);

  return {
    bestNextGuess,
    previousGuesses: clonedPreviousGuesses,
    colorOrColorsUsedToFillTemplate: fillTempateColorOrColors,
    colorsTriedThusFar: updatedColorsTriedThusFar
  }
};

export default getComputerGuessAndState;
