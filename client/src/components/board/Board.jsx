import React, { Component } from 'react';
import styles from '../styles/board.module.css';
import Colors from './Colors.jsx';
import SecretCode from './SecretCode.jsx';
import Turns from './Turns.jsx';
import { initializeGame } from '../../solverAlgorithm/globalLogic';
import { getBlackAndWhitePegs } from '../../solverAlgorithm/filterPermutations';

const turns = [];

// initialize turns to empty
for (let i = 0; i < 10; i++) {
  turns.push({
    guess: ['x', 'x', 'x', 'x'],
    bwPegs: [0, 0]
  });
}

// TESTING
// const colorOptions = ['r', 'b', 'g', 'y', 'o', 'p']; // 'n', 'w'
// const secretCode = ['g', 'r', 'b', 'r'];
// const guesses = [['r', 'r', 'r', 'b'], ['b', 'b', 'b', 'b'], ['b', 'g', 'g', 'g'], ['g', 'b', 'y', 'y'], ['g', 'r', 'b', 'r']];
// const bwPegs = [[1, 2], [1, 0], [0, 2], [1, 1], [4, 0]];
// const totalRounds = 10; // later on, we'll have to make the board dynamically size according to the number of rounds
// const codeSize = secretCode.length;

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // default settings just for testing
      colorOptions: ['r', 'b', 'g', 'y', 'o', 'p'], // 'n', 'w'
      secretCode: ['g', 'r', 'b', 'r'],
      guesses: [['r', 'r', 'r', 'b'], ['b', 'b', 'b', 'b'], ['b', 'g', 'g', 'g'], ['g', 'b', 'y', 'y'], ['g', 'r', 'b', 'r']],
      bwPegs: [[1, 2], [1, 0], [0, 2], [1, 1], [4, 0]],
      totalRounds: 10, // later on, we'll have to make the board dynamically size according to the number of rounds
      currentRound: 1,
      codeSize: 4, // there has to be a better way to do this
      colorTracker: {},
      currentGuess: ['x', 'x', 'x', 'x']
    };
    this.updateCurrentGuess = this.updateCurrentGuess.bind(this);
    this.submitGuess = this.submitGuess.bind(this);
  }

  updateCurrentGuess(newColor) {
    let updatedCurrentGuess = this.state.currentGuess;
    for (let i = 0; i < updatedCurrentGuess.length; i++) {
      if (updatedCurrentGuess[i] === 'x') {
        updatedCurrentGuess[i] = newColor;
        break;
      }
      if (i === updatedCurrentGuess.length - 1) {
        console.log('too many colors in guess!');
        return;
      }
    }
    console.log('updated guess', updatedCurrentGuess);
    let updatedGuesses = [...this.state.guesses];
    updatedGuesses[this.state.currentRound - 1] = updatedCurrentGuess;

    this.setState({
      currentGuess: updatedCurrentGuess,
      guesses: updatedGuesses
    });
  }

  submitGuess() {
    console.log('clicked submit guess');
   let { currentGuess, secretCode, bwPegs, currentRound } = this.state;
   let newBWPegs = getBlackAndWhitePegs(currentGuess, secretCode);
   console.log(bwPegs);
   // check win condition here

   let updatedBWPegs = [...bwPegs];
   updatedBWPegs[currentRound - 1] = newBWPegs;
   this.setState({
    bwPegs: updatedBWPegs,
    currentGuess: ['x', 'x', 'x', 'x'],
    currentRound: this.state.currentRound + 1,
    // - setState colorTracker
   });
  }

  componentDidMount() {
    let [colorOptions, secretCode, colorTracker] = initializeGame(this.state.codeSize);
    let initializeEmptyGuesses = [];
    let emptyGuess = new Array(this.state.codeSize).fill('x');
    for (let i = 0; i < this.state.totalRounds; i++) {
      initializeEmptyGuesses.push(emptyGuess);
    }

    let initializeEmptyBWPegs = [];
    for (let i = 0; i < this.state.totalRounds; i++) {
      initializeEmptyBWPegs.push([0, 0]);
    }

    this.setState({
      colorOptions,
      secretCode,
      colorTracker,
      guesses: initializeEmptyGuesses,
      bwPegs: initializeEmptyBWPegs
    });
  }

  render() {
    let { colorOptions, secretCode, guesses, bwPegs, totalRounds, codeSize } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.secretCode}>
          <SecretCode secretCode={secretCode} />
        </div>
        <div className={styles.turns}>
          <Turns turns={turns} codeSize={codeSize} />
        </div>
        {/* <div className={styles.blackAndWhitePegs}>
          <BWPegsContainer bwPegs={bwPegs} roundsLeft={totalRounds - guesses.length} />
        </div> */}
        <div className={styles.colors}>
          <Colors colors={colorOptions} updateCurrentGuess={this.updateCurrentGuess} />
        </div>
        <button onClick={this.submitGuess}>Submit guess</button>
      </div>
    );
  }
}

export default Board;