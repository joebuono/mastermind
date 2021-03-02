import React from 'react';
import Colors from '../board/Colors';

type Props = {
  color: string,
  numberData: number[],
  positionData: number[],
  codeSize: number,
  certainties: any
}

export default function PositionTracker ({color, numberData, positionData, codeSize, certainties}: Props) {
  let positions = new Array(codeSize).fill('impossible');
  if (numberData.length === 1 && numberData[0] !== 0 && positionData.length === numberData[0]) {
    for (let position of positionData) {
      positions[position - 1] = 'certain';
    }
  } else {
    for (let position of positionData) {
      positions[position - 1] = 'maybe';
    }
  }

  if (certainties[color]) {
    for (let index of certainties[color]) {
      positions[index] = 'certain';
    }
  }

  return (
    <div style={{width: '100%'}}>
      <Colors colors={positions} />
    </div>
  );
};