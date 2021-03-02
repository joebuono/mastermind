import React from 'react';
import styles from '../styles/rowsContainer.module.css';
import Row from './Row.jsx';

export default function RowsContainer ({colorTrackerData, codeSize, certainties}) {
  let colorData = [];
  for (let color in colorTrackerData) {
    colorData.push({
      color,
      number: colorTrackerData[color].number,
      position: colorTrackerData[color].position
    });
  }

  return (
    <div className={styles.rows}>
      {colorData.map((color, index) => <Row key={index} colorInfo={color} codeSize={codeSize} certainties={certainties}/>)}
    </div>
  );
};