
/*

Pass forward the possible valid solutions/guesses to each next round
- Also update data structure 


*/

const colors = ['r', 'b', 'g', 'y', 'o', 'p'];

let colorTracker = {};

for (let color of colors) {
  colorTracker[color] = {
    number: [0, 1, 2, 3, 4],
    position: [1, 2, 3, 4]
  };
}


let secretCode = ['p', 'y', 'b', 'g'];
// generateSecretCode();
console.log('Secret Code:', secretCode);

let guess = ['r', 'r', 'r', 'b'];
console.log('Guess', guess);

let guessResults = checkGuess(guess, secretCode);
console.log('Guess Results:', guessResults);

let allPermutations = generateAllPermutations(['r', 'b', 'x']);
// console.log('All Permutations:', allPermutations);

let possibleSolutions = filterForPossibleSolutions(guess, guessResults, allPermutations);
console.log('Possible Solutions:', possibleSolutions);


// ---------- FUNCTIONS ---------- //

/*

- generateSecretCode
- checkGuess
- generateAllPermutations
- checkIfArraysMatch
- filterForPossibleSolutions

*/


function generateSecretCode() {
  let code = [];

  for (let i = 0; i < 4; i++) {
    code.push(colors[Math.floor(Math.random() * colors.length)]);
  }

  return code;
}


function checkGuess(guess, secret) {
  let guessCopy = [...guess];
  let secretCopy = [...secret];
  
  // check black (right color, right spot)
  let blackPegs = 0;

  for (let i = 0; i < guessCopy.length; i++) {
    if (guessCopy[i] === secretCopy[i]) {
      blackPegs++;
      secretCopy[i] = null;
      guessCopy[i] = null;
    }
  }

  // check white (right color, wrong spot)
  let whitePegs = 0;
  for (let i = 0; i < guessCopy.length; i++) {
    if (guessCopy[i]) {
      let index = secretCopy.indexOf(guessCopy[i]);
      if (index !== - 1) {
        whitePegs++;
        secretCopy[index] = null;
      }
    }
  }

  return [blackPegs, whitePegs];
}


function generateAllPermutations(arrOfColors) {
  let perms = [];

  function recurse(perm) {
    for (let i = 0; i < arrOfColors.length; i++) {
      let newPerm = [...perm, arrOfColors[i]]
      if (newPerm.length === 4) {
        perms.push(newPerm);
      } else {
        recurse(newPerm);
      }
    }
  }

  recurse([]);

  return perms;
}


function checkIfArraysMatch(arr1, arr2) {
  if (arr1 == null || arr2 == null) return false;
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}


function filterForPossibleSolutions(guess, guessResults, permutations) {
  let possibleSolutions = [];

  debugger;
  for (let perm of permutations) {
    let result = checkGuess(guess, perm);
    console.log('Perm, Result:', perm, result);
    // if result matches guess results, push perm to possibleSolutions array
    if (checkIfArraysMatch(result, guessResults)) {
      possibleSolutions.push(perm);
    }
  }

  return possibleSolutions;
}

