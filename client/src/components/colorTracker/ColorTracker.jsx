import React from 'react';
import styles from '../styles/colorTracker.module.css';
import Title from './Title.jsx';
import Headers from './Headers.jsx';
import RowsContainer from './RowsContainer.jsx';
import Colors from '../board/Colors.jsx';

const ColorTracker = ({colorTrackerData, codeSize, bestNextGuess}) => {
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
      <div className={styles.suggestedGuess}>
        Suggested next guess:
        <Colors colors={bestNextGuess}/>
      </div>
    </div>
  );
};

export default ColorTracker;