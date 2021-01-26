import React from 'react';
import Guess from './Guess.jsx';

// Guesses will need to know how many rounds there are
// in order to fill the next rounds with empty spots
function Guesses({guesses, totalRounds, guessSize}) {
  let emptyRounds = [];
  let emptyRound = new Array(guessSize).fill('empty');
  let roundsLeft = totalRounds - guesses.length;
  for (let i = 0; i < roundsLeft; i++) {
    emptyRounds.push(<Guess key={i} guess={emptyRound} />)
  }

  return (
    <div>
      {emptyRounds}
      {[...guesses].reverse().map((guess, index) => <Guess key={index} guess={guess} />)}
    </div>
  );
}

export default Guesses;