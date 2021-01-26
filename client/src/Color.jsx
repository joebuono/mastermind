import React from 'react';
import styles from './color.module.css';

// className={`${styles.circle} ${color}`}
// Will likely need to take color and size as props
function Color({color, size}) {
  const classes = `${styles.circle} ${styles[color]}`
  return (
    <div className={classes}></div>
  );
};

export default Color;