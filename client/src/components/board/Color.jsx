import React from 'react';
import styles from '../styles/color.module.css';

// className={`${styles.circle} ${color}`}
// Will likely need to take color and size as props
function Color({color, updateCurrentGuess = () => {}, size}) {
  const classes = `${styles.circle} ${styles[color]}`;

  return (
    <div className={classes} onClick={() => updateCurrentGuess(color)} onDoubleClick={() => console.log('Double click!')}></div>
  );
};

export default Color;