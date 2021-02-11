const { generateAllPermutations } = require('../solverAlgorithm/generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('../solverAlgorithm/filterPermutations');

/*
Params:
currentRound (should be currentTurn)

*/

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
//  - update the currentRound (should be currentTurn)
//  - checkWinCondition

const submitComputerGuess = (priorRounds, currentRound, bestNextGuess) => {
  // check guess
  // let guessResults = getBlackAndWhitePegs(bestNextGuess, secretCode);

  // let clonedPriorRounds = Object.assign({}, priorRounds);

  // clonedPriorRounds[currentRound] = {
  //   guess: [...bestNextGuess],
  //   results: [...guessResults]
  // };

  // let allPermutations = generateAllPermutations(templates, fillTempateColorOrColors);

  // for (let round in clonedPriorRounds) {
  //   allPermutations = filterForPossibleSolutions(clonedPriorRounds[round].guess, clonedPriorRounds[round].results, allPermutations);
  // }

  // // possibleSolutions and templates need to be consolidated. Just pick one!
  // let possibleSolutions = allPermutations;

  // // FILTER OUT PREVIOUS GUESSES
  // possibleSolutions = possibleSolutions.filter(solution => !previousGuesses.has(`${solution}`));

  // let clonedPriorRounds = Object.assign({}, priorRounds);
  // // console.log('clonedPriorRounds:', clonedPriorRounds);
  // clonedPriorRounds[currentRound] = {
  //   guess: [...bestNextGuess],
  //   results: [...guessResults]
  // };

  // // update turns for display
  // // convert priorRounds to array
  // const updatedTurns = [];
  // for (let round in clonedPriorRounds) {
  //   updatedTurns.push({
  //     guess: clonedPriorRounds[round].guess,
  //     bwPegs: clonedPriorRounds[round].results
  //   });
  // }

  // const emptyGuess = new Array(this.state.codeSize).fill('x');
  // while (updatedTurns.length < totalRounds) {
  //   updatedTurns.push({
  //     guess: emptyGuess,
  //     bwPegs: [0, 0]
  //   });
  // }
};

export default submitComputerGuess;