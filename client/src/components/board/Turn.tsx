import React, { MouseEventHandler } from 'react';
import styles from '../styles/turn.module.css';
import Colors from './Colors';
import BlackAndWhitePegs from './BlackAndWhitePegs';

interface TurnType {
  guess: string[],
  bwPegs: number[]
}

type Props = {
  turn: TurnType,
  codeSize: number,
  currentTurn: boolean,
  submitPlayerGuess: MouseEventHandler,
  removeColorFromGuess: any
}

export default function Turn({turn, codeSize, currentTurn, submitPlayerGuess, removeColorFromGuess}: Props) {
  return (
    <div className={`${styles.rowContainer} ${currentTurn && styles.currentTurn}`}>
      <div className={styles.guess}><Colors colors={turn.guess} removeColorFromGuess={currentTurn ? removeColorFromGuess : () => {}} /></div>
      {currentTurn && !turn.guess.includes('x') ? <div className={styles.submitGuessButton} onClick={submitPlayerGuess}>?</div> : 
      <div className={styles.bwPegs}><BlackAndWhitePegs bwPegs={turn.bwPegs} codeSize={codeSize}/></div>}
    </div>
  );
};