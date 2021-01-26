import React from 'react';
import styles from './board.module.css';
import Colors from './Colors.jsx';
import SecretCode from './SecretCode.jsx';
import Guesses from './Guesses.jsx';

// TESTING
const colorOptions = ['r', 'b', 'g', 'y', 'o', 'p']; // 'n', 'w'
const secretCode = ['g', 'r', 'b', 'r'];
const guesses = [['r', 'r', 'r', 'b'], ['b', 'b', 'b', 'b'], ['b', 'g', 'g', 'g'], ['g', 'b', 'y', 'y'], ['g', 'r', 'b', 'r']];
const totalRounds = 10; // later on, we'll have to make the board dynamically size according to the number of rounds
const guessSize = secretCode.length;

function Board() {
  return (
    <div className={styles.container}>
      <div className={styles.secretCode}>
        <SecretCode secretCode={secretCode} />
      </div>
      <div className={styles.guesses}>
        <Guesses guesses={guesses} totalRounds={totalRounds} guessSize={guessSize} />
      </div>
      <div className={styles.blackAndWhitePegs}></div>
      <div className={styles.colors}>
        <Colors colors={colorOptions} />
      </div>
    </div>
  );
}

export default Board;