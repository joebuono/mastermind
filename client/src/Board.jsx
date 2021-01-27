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
      colorOptions: ['r', 'b', 'g', 'y', 'o', 'p'], // 'n', 'w'
      secretCode: ['g', 'r', 'b', 'r'],
      guesses: [['r', 'r', 'r', 'b'], ['b', 'b', 'b', 'b'], ['b', 'g', 'g', 'g'], ['g', 'b', 'y', 'y'], ['g', 'r', 'b', 'r']],
      bwPegs: [[1, 2], [1, 0], [0, 2], [1, 1], [4, 0]],
      totalRounds: 10, // later on, we'll have to make the board dynamically size according to the number of rounds
      guessSize: 4 // there has to be a better way to do this
    }
  }

  componentDidMount() {
    initializeGame(this.state.guessSize);
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
          <Colors colors={colorOptions} />
        </div>
      </div>
    );
  }
}

export default Board;