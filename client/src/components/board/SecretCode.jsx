import React from 'react';
import Color from './Color.jsx';
import styles from '../styles/secretCode.module.css';

export default function SecretCode({secretCode, currentTurn, showSecretCode}) {
  return (
    <div className={styles.container}>
      <div className={styles.secretCode}>
        {showSecretCode ? secretCode.map((color, index) => <Color key={index} color={color} />) : <div className={styles.text}>Secret Code</div>}
      </div>
      <div className={styles.currentTurn}>
        {currentTurn}
      </div>
    </div>
  );
};