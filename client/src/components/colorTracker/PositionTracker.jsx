import React from 'react';
import Colors from '../board/Colors.jsx';

const PositionTracker = ({numberData, positionData, codeSize}) => {
  let positions = new Array(codeSize).fill('impossible');
  if (numberData.length === 1 && numberData[0] !== 0 && positionData.length === numberData[0]) {
    // certain knowledge
    for (let position of positionData) {
      positions[position - 1] = 'certain';
    }
  } else {
    for (let position of positionData) {
      positions[position - 1] = 'maybe';
    }
  }

  return (
    <div style={{width: '100%'}}>
      <Colors colors={positions} />
    </div>
  );
};

export default PositionTracker;