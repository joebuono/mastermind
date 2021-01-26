import React from 'react';
import Color from './Color.jsx';
import styles from './colorOptions.module.css';

function ColorOptions({colorOptions}) {
  return (
    <div className={styles.container}>
      {colorOptions.map((color, index) => <Color key={index} color={color}/>)}
    </div>
  );
}

export default ColorOptions;