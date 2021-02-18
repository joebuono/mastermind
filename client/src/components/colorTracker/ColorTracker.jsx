import React, { useState } from 'react';
import styles from '../styles/colorTracker.module.css';
import RowsContainer from './RowsContainer.jsx';
import Colors from '../board/Colors.jsx';
import { useSpring, animated } from 'react-spring';

const ColorTracker = ({colorTrackerData, codeSize, bestNextGuess, humanPlayerTurn}) => {
  const globalTemplate = new Array(codeSize).fill('x');
  const [showBestNextGuess, setShowBestNextGuess] = useState(humanPlayerTurn ? false : true);
    
  // Fade in animation
  const spring = useSpring({opacity: 1, from: {opacity: 0}});

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
    // This first line is a front-end fix for an algorithmic problem
    bestNextGuess = globalTemplate;
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
    <animated.div style={spring}>
      <div className={styles.container}>
        <div className={styles.globalColorTracker}>
          <Colors colors={globalTemplate}/>
        </div>
        <div className={styles.rows}>
          <RowsContainer colorTrackerData={colorTrackerData} codeSize={codeSize} certainties={certainties} />
        </div>
        <div className={`${styles.bestNextGuess} ${showBestNextGuess && styles.show}`} onClick={() => setShowBestNextGuess(!showBestNextGuess)}>Best Next Guess:</div>
        {showBestNextGuess &&
        <div className={styles.suggestedGuess}>
          <Colors colors={bestNextGuess.length ? bestNextGuess : new Array(codeSize).fill('x')}/>
        </div>}
      </div>
    </animated.div>
  );
};

export default ColorTracker;