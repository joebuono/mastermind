import React, { MouseEventHandler } from 'react';
import styles from '../styles/turns.module.css';
import Turn from './Turn';

type Props = {
  turns: any,
  codeSize: number,
  turnIndex: number,
  submitPlayerGuess: MouseEventHandler,
  removeColorFromGuess: any
}

export default function Turns({turns, codeSize, turnIndex, submitPlayerGuess, removeColorFromGuess = () => {}}: Props) {
  return (
    <div className={styles.container}>
      {[...turns].reverse().map((turn, index) => <Turn key={index} turn={turn} codeSize={codeSize} currentTurn={turnIndex === index} submitPlayerGuess={submitPlayerGuess} removeColorFromGuess={removeColorFromGuess} />)}
    </div>
  );
};