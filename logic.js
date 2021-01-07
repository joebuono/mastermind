function generateSecretCode() {
  const colors = ['R', 'B', 'G', 'Y', 'O', 'P'];
  let code = [];

  let i = 0;
  while (i++ < length) {
    code.push(colors[Math.floor(Math.random() * colors.length)]);
  }

  return code;
}

function checkGuess(guess, secret) {
  let copy = [...secret];
  
  // check black (right color, right spot)
  let blackPegs = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === copy[i]) {
      blackPegs++;
      copy[i] = null;
      guess[i] = null;
    }
  }

  // check white (right color, wrong spot)
  let whitePegs = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i]) {
      let index = copy.indexOf(guess[i]);
      if (index !== - 1) {
        whitePegs++;
        copy[index] = null;
      }
    }
  }

  return [blackPegs, whitePegs];
}

// checkGuess(['P', 'B', 'B', 'R'], secret);



let secret = generateSecretCode();

for (let i = 0; i < 8; i++) {
  let guess = prompt('Take a guess!');
  guess = [...guess];
  console.log('Your guess:', guess);
  let [blackPegs, whitePegs] = checkGuess(guess, secret);
  console.log(`${blackPegs} blackPegs, ${whitePegs} whitePegs`);
  if (blackPegs === secret.length) {
    console.log('You win!')
    break;
  } else if (i === 7) {
    console.log('You lose!')
    console.log('The secret code was', secret);
  }
}



/*

color
possible spots
total number

*/