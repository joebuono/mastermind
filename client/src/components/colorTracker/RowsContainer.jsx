import React from 'react';
import styles from '../styles/rowsContainer.module.css';
import Row from './Row.jsx';

const colorData = [
  {
    color: 'r',
    number: [0, 1, 2, 3, 4],
    position: [1, 2, 3, 4]
  },
  {
    color: 'g',
    number: [0, 1, 2, 3, 4],
    position: [1, 2, 3, 4]
  },
  {
    color: 'b',
    number: [0, 1, 2, 3, 4],
    position: [1, 2, 3, 4]
  },
  {
    color: 'y',
    number: [0, 1, 2, 3, 4],
    position: [1, 2, 3, 4]
  },
  {
    color: 'o',
    number: [0, 1, 2, 3, 4],
    position: [1, 2, 3, 4]
  },
  {
    color: 'p',
    number: [0, 1, 2, 3, 4],
    position: [1, 2, 3, 4]
  },
];

const RowsContainer = () => {
  return (
    <div className={styles.rows}>
      {colorData.map((color, index) => <Row key={index} colorInfo={color} />)}
    </div>
  );
};

export default RowsContainer;