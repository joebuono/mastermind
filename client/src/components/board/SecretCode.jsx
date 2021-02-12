import React from 'react';
import Color from './Color.jsx';
import styles from '../styles/secretCode.module.css';

function SecretCode({secretCode, currentTurn, showSecretCode}) {

  return (
    <div className={styles.container}>
      <div className={styles.secretCode}>
        {showSecretCode && secretCode.map((color, index) => <Color key={index} color={color} />)}
      </div>
      <div className={styles.currentTurn}>
        {currentTurn}
      </div>
    </div>
  );
};

export default SecretCode;