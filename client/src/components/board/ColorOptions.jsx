import React from 'react';
import Colors from './Colors.jsx';

export default function ColorOptions({colors, updateCurrentGuess}) {
  return <Colors colors={colors} updateCurrentGuess={updateCurrentGuess} />
};