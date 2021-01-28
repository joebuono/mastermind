import React from 'react';
import BlackAndWhitePegs from './BlackAndWhitePegs.jsx';
import styles from '../styles/bwPegsContainer.module.css';

function BWPegsContainer({bwPegs, roundsLeft}) {
  let emptyRounds = [];
  for (let i = 0; i < roundsLeft; i++) {
    emptyRounds.push(<BlackAndWhitePegs key={i} pegs={[0,0]} />)
  }

  return (
    <div className={styles.container}>
      {emptyRounds}
      {[...bwPegs].reverse().map((pegs, index) => <BlackAndWhitePegs key={index} pegs={pegs} />)}
    </div>
  );
}

export default BWPegsContainer;