import React from 'react';
import styles from '../styles/blackAndWhitePegs.module.css';

const convert = (pegs, codeSize) => {
  let converted = [...new Array(pegs[0]).fill('black'), ...new Array(pegs[1]).fill('white')];
  while (converted.length < codeSize) {
    converted.push('empty');
  }
  return converted;
};

function BlackAndWhitePegs({bwPegs, codeSize}) {
  // write a function that transformed bwPegs into an array
  // For example:
  // [1, 2] => ['black', 'white', 'white', 'empty', 'empty'];
  // Use that transformed array to fill the pegs
  const pegs = convert(bwPegs, codeSize);
  return (
    <div className={styles.container}>
      {/* Later, pass the pegs[index] data into a component responsible for displaying black, white, and empty pegs */}
      <div className={`${styles.upperLeft} ${styles.peg} ${styles[pegs[0]]}`}></div> 
      <div className={`${styles.upperRight} ${styles.peg} ${styles[pegs[1]]}`}></div>
      <div className={`${styles.bottomLeft} ${styles.peg} ${styles[pegs[2]]}`}></div>
      <div className={`${styles.bottomRight} ${styles.peg} ${styles[pegs[3]]}`}></div>
      <div className={`${styles.middle} ${styles.peg} ${codeSize === 5 ? styles[pegs[4]] : ''}`}></div>
    </div>
  );
}

export default BlackAndWhitePegs;