import React from 'react';
import styles from '../styles/turns.module.css';
import Turn from './Turn.jsx';

// Guesses will need to know how many rounds there are
// in order to fill the next rounds with empty spots
function Turns({turns, codeSize, turnIndex}) {
  // let emptyRounds = [];
  // let emptyRound = new Array(guessSize).fill('x');
  // let roundsLeft = totalRounds - guesses.length;
  // for (let i = 0; i < roundsLeft; i++) {
  //   // push empty Turn
  //   // emptyRounds.push(<Colors key={i} colors={emptyRound} />)
  // }

  return (
    <div className={styles.container}>
      {[...turns].reverse().map((turn, index) => <Turn key={index} turn={turn} codeSize={codeSize} turnIndex={turnIndex} currentTurn={turnIndex === index} />)}
    </div>
  );
}

export default Turns;