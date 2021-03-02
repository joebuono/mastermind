import React from 'react';
import Color from './Color';
import styles from '../styles/secretCode.module.css';

type Props = {
  secretCode: string[],
  currentTurn: boolean,
  showSecretCode: boolean
}

export default function SecretCode({secretCode, currentTurn, showSecretCode}: Props) {
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