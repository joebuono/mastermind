import React from 'react';
import styles from '../styles/blackAndWhitePegs.module.css';

function BlackAndWhitePegs({bwPegs}) {
  // write a function that transformed bwPegs into an array
  // For example:
  // [1, 2] => ['black', 'white', 'white', 'empty', 'empty'];
  // Use that transformed array to fill the pegs
  let pegs = ['black', 'white', 'white', 'empty', 'empty'];
  return (
    <div className={styles.container}>
      {/* Later, pass the pegs[index] data into a component responsible for displaying black, white, and empty pegs */}
      <div className={styles.upperLeft}>{pegs[0]}</div> 
      <div className={styles.upperRight}>{pegs[1]}</div>
      <div className={styles.bottomLeft}>{pegs[2]}</div>
      <div className={styles.bottomRight}>{pegs[3]}</div>
      <div className={styles.middle}>{pegs[4]}</div>
    </div>
  );
}

export default BlackAndWhitePegs;