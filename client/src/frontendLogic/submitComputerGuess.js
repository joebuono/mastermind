
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

const submitComputerGuess = () => {

};

export default submitComputerGuess;