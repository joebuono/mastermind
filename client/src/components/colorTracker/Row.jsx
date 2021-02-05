import React from 'react';
import styles from '../styles/row.module.css';

// const formatNumberData = (numberArray) => {
//   if (numberArray.length === 1) return numberArray[0];
//   if (numberArray.length === 2) return `${numberArray[0]} or ${numberArray[1]}`;

//   // determine if the numbers are increasing in numerical order
//   let sequence = true;
//   for (let i = 1; i < colorInfo.number.length; i++) {
//     if (colorInfo.number[i] !== colorInfo.number[i - 1] + 1) {
//       sequence = false;
//       break;
//     }
//   }

//   if (sequence) {
//     return `${colorInfo.number[0]}-${colorInfo.number[colorInfo.number.length - 1]}`;
//   }

//   return numberArray;
// };


const Row = ({colorInfo}) => {
  console.log('inside ROW component', colorInfo);

  return (
    <div className={styles.container}>
      <div className={styles.color}>{colorInfo.color}</div>
      <div className={styles.number}>{colorInfo.number}</div>
      <div className={styles.position}>{colorInfo.position}</div>
    </div>
  );
};

export default Row;