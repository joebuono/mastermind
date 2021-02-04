import React, { Component } from 'react';
import styles from '../styles/board.module.css';
import Colors from './Colors.jsx';
import SecretCode from './SecretCode.jsx';
import Turns from './Turns.jsx';
const { initializeGame } = require('../../solverAlgorithm/globalLogic');
const { generateAllPermutations } = require('../../solverAlgorithm/generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('../../solverAlgorithm/filterPermutations');
const { updateColorTracker } = require('../../solverAlgorithm/updateColorTracker');
const { generateNextGuess } = require('../../solverAlgorithm/generateNextGuess');

/*

This will essentially become a class component of gameLogic.js
- Without the while loop, so the user can click through to the next computer guess
- (Later, we can implement autoplay for the computer moves with setTimeout)


**** GLOBAL VARIABLES ****
- To be held in state

  const CODE_SIZE = secretTestCode ? secretTestCode.length : 4;

  let [COLORS, SECRET_CODE, COLOR_TRACKER] = initializeGame(CODE_SIZE);

  // *** TESTING *** //
  SECRET_CODE = secretTestCode || SECRET_CODE;
  // *** TESTING *** //

  let COLORS_TRIED_THUS_FAR = [];

  // To start, our first template is ['x', 'x', 'x', 'x'] or ['x', 'x', 'x', 'x', 'x'], depending on the size of the code
  let templates = [new Array(CODE_SIZE).fill('x')];

  // This stores our current guess
  let guess = [];

  let previousGuesses = new Set();

  let priorRounds = {};

  let colorOrColorsUsedToFillTemplate = [];

  let CURRENT_ROUND = 1;
  const ROUND_LIMIT = 12;

  while (CURRENT_ROUND <= ROUND_LIMIT) {
    // these variable names are still a bit verbose and confusing. Run them by Ethan, Andrew, Dillon, Alex
    let [bestNextGuess, fillTempateColorOrColors, addToColorsTriedThusFar] = generateNextGuess(templates, COLOR_TRACKER, COLORS_TRIED_THUS_FAR, CODE_SIZE, previousGuesses);
    guess = bestNextGuess;
    previousGuesses.add(`${bestNextGuess}`);
    colorOrColorsUsedToFillTemplate = fillTempateColorOrColors;
    // addToColorsTriedThusFar could be an empty array, which is totally fine
    COLORS_TRIED_THUS_FAR = COLORS_TRIED_THUS_FAR.concat(addToColorsTriedThusFar);

    // console.log(`------------------------------------------------ Round ${CURRENT_ROUND} ------------------------------------------------`);
    // console.log('Next guess:', guess);

    let guessResults = getBlackAndWhitePegs(guess, SECRET_CODE);
    // console.log('Guess Results:', guessResults);

    // check win condition
    if (guessResults[0] === CODE_SIZE) {
      // console.log('YOU WIN!!!');
      return CURRENT_ROUND;
    }

    priorRounds[CURRENT_ROUND] = {
      guess: [...bestNextGuess], // not sure if copying the arrays is necessary, just playing it safe
      results: [...guessResults]
    }

    // console.log('These are the templates being used to generate all permutations:', templates);
    let allPermutations = generateAllPermutations(templates, colorOrColorsUsedToFillTemplate); // previously was hard-coded ['r', 'b', 'x']
    // console.log('All Permutations:', allPermutations);
    // console.log('Number of all possible permutations:', allPermutations.length);


    // CRUCIAL STEP! Use information from prior rounds to filter viable templates. This solved the main problem!!!
    // Filter templates based on ALL PRIOR ROUNDS
    for (let round in priorRounds) {
      // console.log('previous round:', priorRounds[round]);
      // console.log('guess:', priorRounds[round].guess);
      // console.log('results:', priorRounds[round].results);
      allPermutations = filterForPossibleSolutions(priorRounds[round].guess, priorRounds[round].results, allPermutations);
    }

    // possibleSolutions and templates need to be consolidated. Just pick one!
    let possibleSolutions = allPermutations;
    // console.log('Possible Solutions:', possibleSolutions);
    // console.log('Number of possible solutions (templates):', possibleSolutions.length);
  
    // FILTER OUT PREVIOUS GUESSES
    possibleSolutions = possibleSolutions.filter(solution => !previousGuesses.has(`${solution}`));

    // set the global variable
    templates = [...possibleSolutions];

    // updateColorTracker
    COLOR_TRACKER = updateColorTracker(possibleSolutions, COLORS, COLORS_TRIED_THUS_FAR, COLOR_TRACKER);
    // console.log(COLOR_TRACKER);
    CURRENT_ROUND++;
  }

  // If the algorithm could not guess the secret code in under ROUND_LIMIT guesses
  return CURRENT_ROUND;
};
*/

class ComputerBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorOptions: [], // 'n', 'w' for codeSize 5
      // hard-coded for now, later, implement modal for human player to select secretCode
      secretCode: ['b', 'p', 'p', 'r'],
      turns: [],
      totalRounds: 10, // later on, we'll have to make the board dynamically size according to the number of rounds
      currentRound: 1,
      codeSize: 4, // there has to be a better way to do this
      colorTracker: {},
      winCondition: null
    };
    this.updateCurrentGuess = this.updateCurrentGuess.bind(this);
    this.getNextComputerGuess = this.getNextComputerGuess.bind(this);
  }

  getCurrentGuess() {
    return [...this.state.turns][this.state.currentRound - 1].guess;
  }

  updateCurrentGuess(colorToAddToGuess) {
    console.log('clicked color:', colorToAddToGuess);
    let currentGuess = this.getCurrentGuess();

    // add color to guess
    for (let i = 0; i < currentGuess.length; i++) {
      if (currentGuess[i] === 'x') {
        currentGuess[i] = colorToAddToGuess;
        break;
      }
    }

    // update turns with current guess
    let copyOfTurns = [...this.state.turns];
    copyOfTurns[this.state.currentRound - 1].guess = currentGuess;
    this.setState({
      turns: copyOfTurns
    });
  }

  getNextComputerGuess() {

  }

  checkWinCondition(nextRound, bwPegs) {

  }

  componentDidMount() {
    // we don't need the secretCode to be automatically generated
    // that's only for testing purposes
    let [colorOptions, colorTracker] = initializeGame(this.state.codeSize);
 
    const initializedEmptyTurns = [];

    // initialize turns to empty
    for (let i = 0; i < 10; i++) {
      initializedEmptyTurns.push({
        guess: ['x', 'x', 'x', 'x'],
        bwPegs: [0, 0]
      });
    }

    this.setState({
      colorOptions,
      colorTracker,
      turns: initializedEmptyTurns
    });
  }

  render() {
    const { colorOptions, secretCode, turns, codeSize, winCondition } = this.state;

    return (
      <div className={styles.boardContainer}>
        <div className={styles.secretCode}>
          <SecretCode secretCode={secretCode} />
        </div>
        <div className={styles.turns}>
          <Turns turns={turns} codeSize={codeSize} />
        </div>
        <div className={styles.colors}>
          <Colors colors={colorOptions} updateCurrentGuess={this.updateCurrentGuess} />
        </div>
        <button onClick={this.getNextComputerGuess}>Next Computer Guess</button>
        {winCondition && <h1>The computer wins!</h1>}
        {winCondition === false && <h1>The computer loses!</h1>}
      </div>
    );
  }
}

export default ComputerBoard;