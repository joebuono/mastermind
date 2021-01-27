import React, { Component } from 'react';
import styles from './board.module.css';
import Colors from './Colors.jsx';
import SecretCode from './SecretCode.jsx';
import Guesses from './Guesses.jsx';
import BWPegsContainer from './BWPegsContainer.jsx';
import { initializeGame } from './solverAlgorithm/globalLogic';

// TESTING
// const colorOptions = ['r', 'b', 'g', 'y', 'o', 'p']; // 'n', 'w'
// const secretCode = ['g', 'r', 'b', 'r'];
// const guesses = [['r', 'r', 'r', 'b'], ['b', 'b', 'b', 'b'], ['b', 'g', 'g', 'g'], ['g', 'b', 'y', 'y'], ['g', 'r', 'b', 'r']];
// const bwPegs = [[1, 2], [1, 0], [0, 2], [1, 1], [4, 0]];
// const totalRounds = 10; // later on, we'll have to make the board dynamically size according to the number of rounds
// const guessSize = secretCode.length;

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
      guessSize: 4, // there has to be a better way to do this
      colorTracker: {},
      currentGuess: ['x', 'x', 'x', 'x']
    };
    this.updateCurrentGuess = this.updateCurrentGuess.bind(this);
  }

  updateCurrentGuess(newColor) {
    let updatedCurrentGuess = this.state.currentGuess;
    console.log('current guess', updatedCurrentGuess);
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
    if (!updatedGuesses.length) {
      updatedGuesses.push(updatedCurrentGuess);
    } else {
      updatedGuesses[updatedGuesses.length - 1] = updatedCurrentGuess;
    }

    this.setState({
      currentGuess: updatedCurrentGuess,
      guesses: updatedGuesses
    });
  }

  componentDidMount() {
    let [colorOptions, secretCode, colorTracker] = initializeGame(this.state.guessSize);
    this.setState({
      colorOptions,
      secretCode,
      colorTracker,
      guesses: [],
      bwPegs: []
    });
  }

  render() {
    let { colorOptions, secretCode, guesses, bwPegs, totalRounds, guessSize } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.secretCode}>
          <SecretCode secretCode={secretCode} />
        </div>
        <div className={styles.guesses}>
          <Guesses guesses={guesses} totalRounds={totalRounds} guessSize={guessSize} />
        </div>
        <div className={styles.blackAndWhitePegs}>
          <BWPegsContainer bwPegs={bwPegs} roundsLeft={totalRounds - guesses.length} />
        </div>
        <div className={styles.colors}>
          <Colors colors={colorOptions} updateCurrentGuess={this.updateCurrentGuess} />
        </div>
      </div>
    );
  }
}

export default Board;