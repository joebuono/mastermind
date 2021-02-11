const { generateAllPermutations } = require('../solverAlgorithm/generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('../solverAlgorithm/filterPermutations');
const { updateColorTracker } = require('../solverAlgorithm/updateColorTracker');
const { generateNextGuess } = require('../solverAlgorithm/generateNextGuess');

const checkWinCondition = (blackPegs, nextRound, codeSize, totalRounds) => {
  let updatedWinCondition = null;
  if (blackPegs === codeSize) {
    updatedWinCondition = true;
    this.props.updateScore('computer', this.state.currentRound);
  }
  if (nextRound > this.state.totalRounds) {
    updatedWinCondition = false;
    this.props.updateScore('computer', this.state.currentRound + 1); // plus one for the bonus
  }
  return updatedWinCondition;
};


const getNextComputerGuess = ({templates, colorTracker, colorsTriedThusFar, codeSize, previousGuesses, secretCode, priorRounds, currentRound, colorOptions, totalRounds}) => {
  
  let [bestNextGuess, fillTempateColorOrColors, addToColorsTriedThusFar] = generateNextGuess(templates, colorTracker, colorsTriedThusFar, codeSize, previousGuesses);

  let clonedPreviousGuess = new Set(previousGuesses);
  clonedPreviousGuess.add(`${bestNextGuess}`);
  let updatedColorsTriedThusFar = [...colorsTriedThusFar].concat(addToColorsTriedThusFar);

  let guessResults = getBlackAndWhitePegs(bestNextGuess, secretCode);

  // Check win condition, put this in a separate function?
  let nextRound = this.state.currentRound + 1;
  let updatedWinCondition = this.checkWinCondition(guessResults[0], nextRound, codeSize, totalRounds);

  let clonedPriorRounds = Object.assign({}, priorRounds);

  clonedPriorRounds[currentRound] = {
    guess: [...bestNextGuess],
    results: [...guessResults]
  };

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

  // console.log('---------------UPDATED TURNS---------------:', updatedTurns);

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

  // updateColorTracker
  // console.log('----------arguments passed into updateColorTracker-----------');
  // console.log('possibleSolutions:', possibleSolutions);
  // console.log('colorOptions:', colorOptions);
  // console.log('updatedColorsTriedThusFar:', updatedColorsTriedThusFar);
  // console.log('colorTracker:', colorTracker);
  let updatedColorTracker = updateColorTracker(possibleSolutions, colorOptions, updatedColorsTriedThusFar, colorTracker);
  // console.log(updatedColorTracker);

  this.props.modifyDisplayedColorTracker(updatedColorTracker);


  return {
    currentGuess: bestNextGuess,
    colorOrColorsUsedToFillTemplate: fillTempateColorOrColors,
    colorsTriedThusFar: updatedColorsTriedThusFar,
    templates: [...possibleSolutions],
    colorTracker: updatedColorTracker,
    priorRounds: clonedPriorRounds,
    turns: updatedTurns,
    currentRound: nextRound,
    winCondition: updatedWinCondition
  };
};

export default getNextComputerGuess;
