import React from 'react';
import styles from '../styles/turn.module.css';
import Colors from './Colors.jsx';
import BlackAndWhitePegs from './BlackAndWhitePegs.jsx';

const Turn = () => {
  return (
  <div className={styles.rowContainer}>
    <div className={styles.guess}><Colors key={'?'} colors={['r', 'y', 'o', 'b']}/></div>
    <div className={styles.bwPegs}><BlackAndWhitePegs /></div>
  </div>
  );
};

export default Turn;