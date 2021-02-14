import React from 'react';
import styles from '../styles/colorTracker.module.css';
import Title from './Title.jsx';
import Headers from './Headers.jsx';
import RowsContainer from './RowsContainer.jsx';
import Colors from '../board/Colors.jsx';

const ColorTracker = ({colorTrackerData, codeSize, bestNextGuess}) => {

  const globalTemplate = new Array(codeSize).fill('x');

  const certainties = {};

  for (let position = 1; position <= codeSize; position++) {
    let numberOfKnowns = 0;
    let knownColor;
    for (let color in colorTrackerData) {
      if (colorTrackerData[color].position.includes(position)) {
        numberOfKnowns++;
        knownColor = color;
      }
    }
    if (numberOfKnowns === 1) {
      globalTemplate[position - 1] = knownColor;
      if (certainties[knownColor]) {
        certainties[knownColor].push(position - 1);
      } else {
        certainties[knownColor] = [position - 1];
      }
    }
  }

  // If we know the secret code for certain, set all number values to a single digit
  if (!globalTemplate.includes('x')) {
    let occurrences = {};
    // count the number of times each color occurs in the globalTemplate
    for (let color of globalTemplate) {
      occurrences[color] = ++occurrences[color] || 1;
    }

    for (let color in colorTrackerData) {
      if (occurrences[color]) {
        colorTrackerData[color].number = [occurrences[color]];
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Title />
      </div>
      <div className={styles.headers}>
        <Headers globalTemplate={globalTemplate} />
      </div>
      <div className={styles.rows}>
        <RowsContainer colorTrackerData={colorTrackerData} codeSize={codeSize} certainties={certainties} />
      </div>
      <div className={styles.suggestedGuess}>
        <Colors colors={bestNextGuess.length ? bestNextGuess : new Array(codeSize).fill('x')}/>
      </div>
    </div>
  );
};

export default ColorTracker;