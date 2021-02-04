import React, { Component } from 'react';
import styles from '../styles/board.module.css';
import Colors from './Colors.jsx';
import SecretCode from './SecretCode.jsx';
import Turns from './Turns.jsx';
import ColorTracker from '../colorTracker/ColorTracker.jsx';
const { initializeGame } = require('../../solverAlgorithm/globalLogic');
const { generateAllPermutations } = require('../../solverAlgorithm/generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('../../solverAlgorithm/filterPermutations');
const { updateColorTracker } = require('../../solverAlgorithm/updateColorTracker');
const { generateNextGuess } = require('../../solverAlgorithm/generateNextGuess');

/*

This will essentially become a class component of gameLogic.js
- Without the while loop, so the user can click through to the next computer guess
- (Later, we can implement autoplay for the computer moves with setTimeout)


I think it's better to have ColorTracker be a child component of Board


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
    console.log('clicked get next computer guess');
    let currentGuess = this.getCurrentGuess();
    // check if the guess is completely filled (no x's)
    if (!currentGuess.includes('x')) {
      console.log('checking the guess!');
      const updatedBWPegs = getBlackAndWhitePegs(currentGuess, this.state.secretCode);
      console.log(updatedBWPegs);

      // update current guess with updatedBWPegs
      const copyOfTurns = [...this.state.turns];
      copyOfTurns[this.state.currentRound - 1].bwPegs = updatedBWPegs;

      // check win and lose condition
      const nextRound = this.state.currentRound + 1;

      const updatedWinCondition = this.checkWinCondition(nextRound, updatedBWPegs);

      this.setState({
        turns: copyOfTurns,
        currentRound: nextRound,
        winCondition: updatedWinCondition,
        // colorTracker
      });

    }
  }

  checkWinCondition(nextRound, bwPegs) {
    let updatedWinCondition = null;

    // check lose condition
    if (nextRound > this.state.totalRounds) {
      console.log('You lose. Play again?');
      updatedWinCondition = false;
    } else {
      // check win condition
      if (bwPegs[0] === this.state.codeSize) {
        console.log('YOU WIN!');
        updatedWinCondition = true;
      }
    }
    return updatedWinCondition;
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