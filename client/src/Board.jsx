import React from 'react';
import styles from './board.module.css';

function Board() {
  return (
    <div className={styles.container}>
      <div className={styles.guesses}></div>
      <div className={styles.blackAndWhitePegs}></div>
      <div className={styles.colors}></div>
    </div>
  );
}

export default Board;