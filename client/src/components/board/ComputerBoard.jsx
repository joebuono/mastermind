import React, { Component } from 'react';
import styles from '../styles/board.module.css';
import Colors from './Colors.jsx';
import SecretCode from './SecretCode.jsx';
import Turns from './Turns.jsx';
import { initializeGame } from '../../solverAlgorithm/globalLogic';
import { getBlackAndWhitePegs } from '../../solverAlgorithm/filterPermutations';

// TESTING
// const colorOptions = ['r', 'b', 'g', 'y', 'o', 'p']; // 'n', 'w'
// const secretCode = ['g', 'r', 'b', 'r'];
// const guesses = [['r', 'r', 'r', 'b'], ['b', 'b', 'b', 'b'], ['b', 'g', 'g', 'g'], ['g', 'b', 'y', 'y'], ['g', 'r', 'b', 'r']];
// const bwPegs = [[1, 2], [1, 0], [0, 2], [1, 1], [4, 0]];
// const totalRounds = 10; // later on, we'll have to make the board dynamically size according to the number of rounds
// const codeSize = secretCode.length;

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
      <div className={styles.container}>
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