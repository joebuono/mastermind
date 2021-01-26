import React from 'react';
import Color from './Color.jsx';
import styles from './secretCode.module.css';

function SecretCode({secretCode}) {
  return (
    <div className={styles.container}>
      {secretCode.map((color, index) => <Color key={index} color={color} />)}
    </div>
  );
};

export default SecretCode;