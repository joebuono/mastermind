import React from 'react';
import styles from '../styles/turn.module.css';
import Colors from './Colors.jsx';
import BlackAndWhitePegs from './BlackAndWhitePegs.jsx';

const Turn = ({turn, codeSize, currentTurn, submitPlayerGuess, removeColorFromGuess}) => {

  return (
  <div className={styles.rowContainer}>
    <div className={styles.guess}><Colors colors={turn.guess} removeColorFromGuess={currentTurn ? removeColorFromGuess : () => {}} /></div>
    {currentTurn && !turn.guess.includes('x') ? <div className={styles.submitGuessButton} onClick={submitPlayerGuess}>?</div> : 
    <div className={styles.bwPegs}><BlackAndWhitePegs bwPegs={turn.bwPegs} codeSize={codeSize}/></div>}
  </div>
  );
};

export default Turn;