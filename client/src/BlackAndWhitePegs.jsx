import React from 'react';
import styles from './blackAndWhitePegs.module.css';

function BlackAndWhitePegs({pegs}) {
  return (
    <div className={styles.container}>
      {pegs}
    </div>
  );
}

export default BlackAndWhitePegs;