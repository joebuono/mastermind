

// 1. Create the set S of 1296 possible codes (1111, 1112 ... 6665, 6666)

let colors = ['r', 'b', 'g', 'y', 'o', 'p']; // add n and w for codeSize 5
let secretCode = 'rrbb';
let codeSize = secretCode.length;
if (codeSize === 5) {
  colors = colors.concat(['n', 'w']);
}

let allPossibilities = new Set();
let S = new Set();
generatePossibleCodes();

let sampleOutcomes4 = ['gggg', 'rggg', 'rrgg', 'rrbg', 'rrbb', 'gggr', 'ggrr', 'gbrr', 'bbrr', 'rbgg', 'rbrg', 'rbbg', 'rbrb']; // No [1,3] combo, impossible


// for each guess, generate 


/*
debugger;

let attempts = 1;

[]

// let allPegs = [
//   '0,0', '1,0', '2,0', '3,0', '4,0', 
//   '0,1', '0,2', '0,3', '0,4', 
//   '1,1', '1,2', '1,3', '2,1', '2,2']; // [1,3] is IMPOSSIBLE with a first guess of 'rrbb'

let allPegs = ['0,0'];

// add all black/white pegs combinations to allPegs
for (let black = 0; black < codeSize - 1; black++) {
  for (let white = 1; white <= codeSize - black; white++) {
    if (!black) allPegs.push(`${white},${black}`);
    allPegs.push(`${black},${white}`);
  }
}

// 2. Start with initial guess 1122
let currentGuess = codeSize === 4 ? 'rrbb' : 'rrrbb';

while (true) {
  console.log(currentGuess);
  debugger;
  allPossibilities.delete(currentGuess);
  let pegs = getPegs(currentGuess, secretCode);
  // console.log(pegs);
  if (pegs === `${codeSize},0`) {
    console.log(`You won in ${attempts} attempts!`);
    break;
  }


  S.forEach(possibility => removePossibilities(possibility, pegs));
  // console.log('remaining possibilities', S);
  if (S.size <= 2) {
    // debugger;
    currentGuess = [...S][0];
    // console.log('----------------------small case current guess', currentGuess);
  } else {
    let bestNextGuesses = minimax();

    let bestNextGuessesInS = [];
    for (let guess of bestNextGuesses) {
      if (S.has(guess)) {
        bestNextGuessesInS.push(guess);
      }
    }
    if (bestNextGuessesInS.length) {
      currentGuess = bestNextGuessesInS[Math.floor(Math.random() * bestNextGuessesInS.length)];
    } else {
      currentGuess = bestNextGuesses[Math.floor(Math.random() * bestNextGuesses.length)];
    }
  }

  attempts++;
}



// *** FUNCTIONS *** //

function generatePossibleCodes(code = '') {
  if (code.length === codeSize) {
    allPossibilities.add(code);
    S.add(code); 
    return;
  }

  for (let i = 0; i < colors.length; i++) {
    generatePossibleCodes(code + colors[i]);
  }
}


function getPegs(guess, code) {
  let guessCopy = [...guess];
  let codeCopy = [...code];

  // check for black pegs (right color, right spot)
  let blackPegs = 0;
  for (let i = 0; i < codeSize; i++) {
    if (guessCopy[i] === codeCopy[i]) {
      blackPegs++;
      guessCopy[i] = null;
      codeCopy[i] = null;
    }
  }

  // check for white pegs (right color, wrong spot)
  let whitePegs = 0;
  for (let i = 0; i < codeSize; i++) {
    if (guessCopy[i]) {
      let index = codeCopy.indexOf(guessCopy[i]);
      if (index !== - 1) {
        whitePegs++;
        codeCopy[index] = null;
      }
    }
  }

  return `${blackPegs},${whitePegs}`;
}


function removePossibilities(possibility, pegs) {
  if (getPegs(currentGuess, possibility) !== pegs) {
    S.delete(possibility);
  }
}


function minimax() {
  let bestNextGuesses = [];
  let globalMinEliminated = Number.MIN_SAFE_INTEGER;

  for (let unused of allPossibilities) {
    console.log('unused', unused);
    let miniMaxEliminated = Number.MAX_SAFE_INTEGER;
    for (let pegs of allPegs) {
      // console.log('pegs', pegs);
      let hitCount = 0;
      for (let possibility of S) {
        // console.log('possibility', possibility);
        if (getPegs(unused, possibility) === pegs) hitCount++;
      }
      let minimumEliminated = S.size - hitCount;
      miniMaxEliminated = Math.min(miniMaxEliminated, minimumEliminated);
    }

    if (miniMaxEliminated > globalMinEliminated) {
      bestNextGuesses = [unused];
      globalMinEliminated = miniMaxEliminated;
    } else if (miniMaxEliminated === globalMinEliminated) {
      bestNextGuesses.push(unused);
    }
  }

  console.log('bestNextGuesses', bestNextGuesses);
  return bestNextGuesses;
}

// *** FUNCTIONS *** //
*/