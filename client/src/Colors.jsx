import React from 'react';
import Color from './Color.jsx';
import styles from './colorOptions.module.css';

function Colors({colors, updateCurrentGuess = () => {}}) {
  return (
    <div className={styles.container}>
      {colors.map((color, index) => <Color key={index} color={color} updateCurrentGuess={updateCurrentGuess} />)}
    </div>
  );
}

export default Colors;