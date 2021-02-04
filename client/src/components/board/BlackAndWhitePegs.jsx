import React from 'react';
import styles from '../styles/blackAndWhitePegs.module.css';

const convert = (pegs, codeSize) => {
  let converted = [...new Array(pegs[0]).fill('B'), ...new Array(pegs[1]).fill('W')];
  while (converted.length < codeSize) {
    converted.push('E');
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
      <div className={`${styles.upperLeft} ${styles.peg}`}>{pegs[0]}</div> 
      <div className={`${styles.upperRight} ${styles.peg}`}>{pegs[1]}</div>
      <div className={`${styles.bottomLeft} ${styles.peg}`}>{pegs[2]}</div>
      <div className={`${styles.bottomRight} ${styles.peg}`}>{pegs[3]}</div>
      <div className={`${styles.middle} ${styles.peg}`}>{codeSize === 4 ? '' : pegs[4]}</div>
    </div>
  );
}

export default BlackAndWhitePegs;