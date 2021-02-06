import React from 'react';
import styles from '../styles/row.module.css';

const formatNumberData = (numArr) => {
  if (numArr.length === 1) return numArr[0];
  if (numArr.length === 2) return `${numArr[0]} or ${numArr[1]}`;

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


const Row = ({colorInfo}) => {

  return (
    <div className={styles.container}>
      <div className={styles.color}>{colorInfo.color}</div>
      <div className={styles.number}>{formatNumberData(colorInfo.number)}</div>
      <div className={styles.position}>{colorInfo.position}</div>
    </div>
  );
};

export default Row;