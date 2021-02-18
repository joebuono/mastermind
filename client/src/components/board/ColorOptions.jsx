import React from 'react';
import Colors from './Colors.jsx';

const ColorOptions = ({colors, updateCurrentGuess}) => {
  return (
    <div>
      <Colors colors={colors} updateCurrentGuess={updateCurrentGuess} />
    </div>
  );
};

export default ColorOptions;