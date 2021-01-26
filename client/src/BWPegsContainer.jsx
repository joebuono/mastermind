import React from 'react';
import BlackAndWhitePegs from './BlackAndWhitePegs.jsx';
import styles from './bwPegsContainer.module.css';

function BWPegsContainer({bwPegs}) {
  return (
    <div className={styles.container}>
      {[...bwPegs].reverse().map((pegs, index) => <BlackAndWhitePegs key={index} pegs={pegs} />)}
    </div>
  );
}

export default BWPegsContainer;