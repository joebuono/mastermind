import React from 'react';
import styles from '../styles/turn.module.css';
import Colors from './Colors.jsx';
import BlackAndWhitePegs from './BlackAndWhitePegs.jsx';

const Turn = ({turn, codeSize, key}) => {
  return (
  <div className={styles.rowContainer}>
    <div className={styles.guess}><Colors key={key} colors={turn.guess}/></div>
    <div className={styles.bwPegs}><BlackAndWhitePegs bwPegs={turn.bwPegs} codeSize={codeSize} /></div>
  </div>
  );
};

export default Turn;