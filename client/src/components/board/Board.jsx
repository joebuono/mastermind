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

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // default settings just for testing
      colorOptions: [], // 'n', 'w'
      secretCode: [],
      turns: [],
      totalRounds: 10, // later on, we'll have to make the board dynamically size according to the number of rounds
      currentRound: 1,
      codeSize: 4, // there has to be a better way to do this
      colorTracker: {},
    };
    this.updateCurrentGuess = this.updateCurrentGuess.bind(this);
    this.submitGuess = this.submitGuess.bind(this);
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

  submitGuess() {
  console.log('clicked submit guess');
  let currentGuess = this.getCurrentGuess();
  // check if the guess is completely filled (no x's)
  if (!currentGuess.includes('x')) {
    console.log('good to go!');
    let updatedBWPegs = getBlackAndWhitePegs(currentGuess, this.state.secretCode);
    console.log(updatedBWPegs);
  } else {
    console.log('hey get outta here with that incomplete guess!')
  }
  //  let { currentGuess, secretCode, bwPegs, currentRound } = this.state;
  //  let newBWPegs = getBlackAndWhitePegs(currentGuess, secretCode);
  //  console.log(bwPegs);
  //  // check win condition here

  //  let updatedBWPegs = [...bwPegs];
  //  updatedBWPegs[currentRound - 1] = newBWPegs;
  //  this.setState({
  //   bwPegs: updatedBWPegs,
  //   currentGuess: ['x', 'x', 'x', 'x'],
  //   currentRound: this.state.currentRound + 1,
    // - setState colorTracker
  //  });
  }

  componentDidMount() {
    let [colorOptions, secretCode, colorTracker] = initializeGame(this.state.codeSize);
 
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
      secretCode,
      colorTracker,
      turns: initializedEmptyTurns
    });
  }

  render() {
    let { colorOptions, secretCode, turns, codeSize } = this.state;
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
        <button onClick={this.submitGuess}>Submit guess</button>
      </div>
    );
  }
}

export default Board;