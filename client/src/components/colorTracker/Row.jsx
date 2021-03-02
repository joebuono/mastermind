import React from 'react';
import styles from '../styles/row.module.css';
import Color from '../board/Color.jsx';
import PositionTracker from './PositionTracker.jsx';

const formatNumberData = (numArr) => {
  if (numArr.length === 1) return numArr[0];
  if (numArr.length > 1) {
    if (numArr[numArr.length - 1] - numArr[0] === 1) {
      return `${numArr[0]} or ${numArr[numArr.length - 1]}`;
    }
    return `${numArr[0]}-${numArr[numArr.length - 1]}`;
  }
};

export default function Row({colorInfo, codeSize, certainties}) {
  return (
    <div className={styles.container}>
      <div className={`${styles.color} ${styles.column}`}><Color color={colorInfo.color} /></div>
      <div className={`${styles.number} ${styles.column}`}>{formatNumberData(colorInfo.number)}</div>
      <div className={`${styles.position} ${styles.column}`}><PositionTracker color={colorInfo.color} numberData={colorInfo.number} positionData={colorInfo.position} codeSize={codeSize} certainties={certainties} /></div>
    </div>
  );
};