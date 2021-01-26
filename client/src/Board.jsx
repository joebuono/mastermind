import React from 'react';
import styles from './board.module.css';
import ColorOptions from './ColorOptions.jsx';

// TESTING
const colorOptions = ['r', 'b', 'g', 'y', 'o', 'p', 'n', 'w'];

function Board() {
  return (
    <div className={styles.container}>
      <div className={styles.secretCode}></div>
      <div className={styles.guesses}></div>
      <div className={styles.blackAndWhitePegs}></div>
      <div className={styles.colors}>
        <ColorOptions colorOptions={colorOptions} />
      </div>
    </div>
  );
}

export default Board;