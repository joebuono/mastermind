import React from 'react';
import styles from '../styles/row.module.css';

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