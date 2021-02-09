import React from 'react';
import styles from '../styles/colorTracker.module.css';
import Title from './Title.jsx';
import Headers from './Headers.jsx';
import RowsContainer from './RowsContainer.jsx';

const ColorTracker = ({colorTrackerData, codeSize}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Title />
      </div>
      <div className={styles.headers}>
        <Headers />
      </div>
      <div className={styles.rows}>
        <RowsContainer colorTrackerData={colorTrackerData} codeSize={codeSize} />
      </div>
    </div>
  );
};

export default ColorTracker;