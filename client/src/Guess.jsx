import React from 'react';
import ColorOptions from './ColorOptions.jsx';

function Guess({guess}) {
  return (
    <ColorOptions colorOptions={guess} />
  );
}

export default Guess;