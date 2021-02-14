import React from 'react';
import styles from '../styles/row.module.css';
import Color from '../board/Color.jsx';
import PositionTracker from './PositionTracker.jsx';

const formatNumberData = (numArr) => {
  if (numArr.length === 1) return numArr[0];
  // This is compensating for a possible bug in the algorithm
  if (numArr.length === 2) {
    if (numArr[1] - numArr[0] === 1) {
      return `${numArr[0]} or ${numArr[1]}`;
    }
    return `${numArr[0]}-${numArr[1]}`;
  }
  

  // determine if the numbers are increasing in numerical order
  let sequence = true;
  for (let i = 1; i < numArr.length; i++) {
    if (numArr[i] !== numArr[i - 1] + 1) {
      sequence = false;
      break;
    }
  }

  if (sequence) {
    return `${numArr[0]}-${numArr[numArr.length - 1]}`;
  }

  return numArr;
};

const Row = ({colorInfo, codeSize, certainties}) => {

  return (
    <div className={styles.container}>
      <div className={`${styles.color} ${styles.column}`}><Color color={colorInfo.color} /></div>
      <div className={`${styles.number} ${styles.column}`}>{formatNumberData(colorInfo.number)}</div>
      <div className={`${styles.position} ${styles.column}`}><PositionTracker color={colorInfo.color} numberData={colorInfo.number} positionData={colorInfo.position} codeSize={codeSize} certainties={certainties} /></div>
    </div>
  );
};

export default Row;