import React, { MouseEventHandler } from 'react';
import styles from '../styles/turn.module.css';
import Colors from './Colors.jsx';
import BlackAndWhitePegs from './BlackAndWhitePegs.jsx';

interface TurnArrays {
  guess: Array<string>,
  bwPegs: Array<number>
}

type Props = {
  turn: TurnArrays,
  codeSize: number,
  currentTurn: boolean,
  submitPlayerGuess: MouseEventHandler,
  removeColorFromGuess: any
}



const Turn = ({turn, codeSize, currentTurn, submitPlayerGuess, removeColorFromGuess}: Props) => {
  return (
    <div className={`${styles.rowContainer} ${currentTurn && styles.currentTurn}`}>
      <div className={styles.guess}><Colors colors={turn.guess} removeColorFromGuess={currentTurn ? removeColorFromGuess : () => {}} /></div>
      {currentTurn && !turn.guess.includes('x') ? <div className={styles.submitGuessButton} onClick={submitPlayerGuess}>?</div> : 
      <div className={styles.bwPegs}><BlackAndWhitePegs bwPegs={turn.bwPegs} codeSize={codeSize}/></div>}
    </div>
  );
};

export default Turn;