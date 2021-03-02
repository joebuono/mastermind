import React from 'react';
import Color from './Color';
import styles from '../styles/colors.module.css';

type Props = {
  colors: string[],
  updateCurrentGuess?: any,
  removeColorFromGuess?: any
}

export default function Colors({colors, updateCurrentGuess = () => {}, removeColorFromGuess = () => {}}: Props) {
  return (
    <div className={styles.container}>
      {colors.map((color, index) => <Color key={index} color={color} updateCurrentGuess={updateCurrentGuess} removeColorFromGuess={removeColorFromGuess(index)} />)}
    </div>
  );
};