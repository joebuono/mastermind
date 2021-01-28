import React from 'react';
import styles from '../styles/colorTracker.module.css';
import Title from './Title.jsx';
import Headers from './Headers.jsx';
import RowsContainer from './RowsContainer.jsx';

const ColorTracker = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Title />
      </div>
      <div className={styles.headers}>
        <Headers />
      </div>
      <div className={styles.rows}>
        <RowsContainer />
      </div>
    </div>
  );
};

export default ColorTracker;