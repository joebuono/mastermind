const { generateNextGuess } = require('../solverAlgorithm/generateNextGuess');

export default function getComputerGuessAndState({templates, colorTracker, colorsTriedThusFar, codeSize, previousGuesses, difficulty = 'hard'}) {
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