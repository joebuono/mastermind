import React from 'react';
import styles from '../styles/turns.module.css';
import Turn from './Turn.jsx';

function Turns({turns, codeSize, turnIndex, submitPlayerGuess, removeColorFromGuess = () => {}}) {
  return (
    <div className={styles.container}>
      {[...turns].reverse().map((turn, index) => <Turn key={index} turn={turn} codeSize={codeSize} turnIndex={turnIndex} currentTurn={turnIndex === index} submitPlayerGuess={submitPlayerGuess} removeColorFromGuess={removeColorFromGuess} />)}
    </div>
  );
}

export default Turns;