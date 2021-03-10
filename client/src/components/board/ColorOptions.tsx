import React from 'react';
import Colors from './Colors';

type Props = {
  colors: string[],
  updateCurrentGuess: any
}

export default function ColorOptions({colors, updateCurrentGuess}: Props) {
  return <Colors colors={colors} updateCurrentGuess={updateCurrentGuess} />
};