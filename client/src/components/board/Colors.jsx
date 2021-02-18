import React from 'react';
import Color from './Color.jsx';
import styles from '../styles/colors.module.css';

// Not sure if it's really necessary to have default anonymous functions in the parameters
function Colors({colors, updateCurrentGuess = () => {}, removeColorFromGuess = () => {}}) {
  return (
    <div className={styles.container}>
      {colors.map((color, index) => <Color key={index} id={`${index + 1}`} index={index + 1} color={color} updateCurrentGuess={updateCurrentGuess} removeColorFromGuess={removeColorFromGuess(index)} />)}
    </div>
  );
}

export default Colors;