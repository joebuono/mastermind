import React from 'react';
import styles from '../styles/rowsContainer.module.css';
import Row from './Row.jsx';

// const colorData = [
//   {
//     color: 'r',
//     number: [0, 1, 2, 3, 4],
//     position: [1, 2, 3, 4]
//   },
//   {
//     color: 'b',
//     number: [0, 1, 2, 3, 4],
//     position: [1, 2, 3, 4]
//   },
//   ... etc
// ];

const RowsContainer = ({colorTrackerData, codeSize, certainties}) => {
  // modifying input for component use
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

export default RowsContainer;