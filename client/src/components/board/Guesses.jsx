import React from 'react';
import Colors from './Colors.jsx';

// Guesses will need to know how many rounds there are
// in order to fill the next rounds with empty spots
function Guesses({guesses, totalRounds, guessSize}) {
  let emptyRounds = [];
  let emptyRound = new Array(guessSize).fill('x');
  let roundsLeft = totalRounds - guesses.length;
  for (let i = 0; i < roundsLeft; i++) {
    emptyRounds.push(<Colors key={i} colors={emptyRound} />)
  }

  return (
    <div>
      {emptyRounds}
      {[...guesses].reverse().map((guess, index) => <Colors key={index} colors={guess} />)}
    </div>
  );
}

export default Guesses;