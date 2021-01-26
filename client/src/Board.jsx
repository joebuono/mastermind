import React from 'react';
import styles from './board.module.css';
import ColorOptions from './ColorOptions.jsx';
import SecretCode from './SecretCode.jsx';

// TESTING
const colorOptions = ['r', 'b', 'g', 'y', 'o', 'p']; // 'n', 'w'
const secretCode = ['p', 'g', 'b', 'y'];

function Board() {
  return (
    <div className={styles.container}>
      <div className={styles.secretCode}>
        <SecretCode secretCode={secretCode} />
      </div>
      <div className={styles.guesses}></div>
      <div className={styles.blackAndWhitePegs}></div>
      <div className={styles.colors}>
        <ColorOptions colorOptions={colorOptions} />
      </div>
    </div>
  );
}

export default Board;