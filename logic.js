
/*

Pass forward the possible valid solutions/guesses to each next round
- Also update data structure 

*/

// ******* GLOBAL VARIABLE ******* //
let COLORS = ['r', 'b', 'g', 'y', 'o', 'p'];

let COLOR_TRACKER = generateColorTracker();

let secretCode = ['r', 'b', 'r', 'y'];
// generateSecretCode();
console.log('Secret Code:', secretCode);

let guess = ['r', 'r', 'r', 'b'];
console.log('Guess', guess);

let COLORS_TRIED_THUS_FAR = ['r', 'b'];
// later, this will become a SET (instead of an array) that we add to every time we introduce a new color (previously unused) in a guess

let guessResults = getBlackAndWhitePegs(guess, secretCode);
console.log('Guess Results:', guessResults);

let allPermutations = generateAllPermutations(['r', 'b', 'x']);
// console.log('All Permutations:', allPermutations);

let possibleSolutions = filterForPossibleSolutions(guess, guessResults, allPermutations);
console.log('Possible Solutions:', possibleSolutions);

// updateColorTracker
debugger;
updateColorTracker(possibleSolutions);
console.log(COLOR_TRACKER);


// ---------- FUNCTIONS ---------- //

/*

- generateColorTracker
- generateSecretCode
- getBlackAndWhitePegs
- generateAllPermutations
- checkIfArraysMatch
- filterForPossibleSolutions
- updateColorTracker
- trackPossibleSolution

*/

function generateColorTracker() {
  let colorTracker = {};

  for (let color of COLORS) {
    colorTracker[color] = {
      number: [0, 1, 2, 3, 4], 
      // yeah, we probably want to update each color every time
      // in other words, we want to track wildcard information as we go (x's do matter)
      position: [1, 2, 3, 4]
    };
  }

  return colorTracker;
}


function generateSecretCode() {
  let code = [];

  for (let i = 0; i < 4; i++) {
    code.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }

  return code;
}


function getBlackAndWhitePegs(guess, secret) {
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

  for (let perm of permutations) {
    let result = getBlackAndWhitePegs(guess, perm);
    console.log('Perm, Result:', perm, result);
    // if result matches guess results, push perm to possibleSolutions array
    if (checkIfArraysMatch(result, guessResults)) {
      possibleSolutions.push(perm);
    }
  }

  return possibleSolutions;
}



// This function is too big. Break it down into sub-functions
function updateColorTracker(possibleSolutions) {
  let setColorTracker = {};
  for (let color of COLORS) {
    if (COLORS_TRIED_THUS_FAR.includes(color)) {
      setColorTracker[color] = {
        number: [],
        position: []
      } 
    } else {
      setColorTracker[color] = {
        number: [0],
        position: []
      } 
    }
  }

  // for each possibleSolution, 
  for (let possibleSolution of possibleSolutions) {
    // track (get number and position data) for each possible solution
    let colorData = trackPossibleSolution(possibleSolution);
    // use info to update color tracker
    for (let color in colorData) {
      if (color === 'x') {
        for (let setColor in setColorTracker) {
          if (!COLORS_TRIED_THUS_FAR.includes(setColor)) {
            // update number
            if (!setColorTracker[setColor].number.includes(colorData[color].number)) {
              setColorTracker[setColor].number.push(colorData[color].number);
            }
            // update position
            for (let position of colorData[color].position) {
              if (!setColorTracker[setColor].position.length || !setColorTracker[setColor].position.includes(position)) {
                setColorTracker[setColor].position.push(position);
              }
            }
          }
        }
      } else {
        // update number
        if (!setColorTracker[color].number.includes(colorData[color].number)) {
          setColorTracker[color].number.push(colorData[color].number);
        }
        // update position
        for (let position of colorData[color].position) {
          if (!setColorTracker[color].position.includes(position)) {
            setColorTracker[color].position.push(position);
          }
        }        
      }
    }
  }

  // update global color tracker
  for (let color in setColorTracker) {
    // sort (not really necessary)
    setColorTracker[color].number.sort((a, b) => a - b);
    setColorTracker[color].position.sort((a, b) => a - b);
    COLOR_TRACKER[color] = setColorTracker[color];
  }
}


// This is getting the possible colors (numbers and positions) for just ONE possible solution
function trackPossibleSolution(possibleSolution) {
  let colorData = {};
  for (let usedColor of COLORS_TRIED_THUS_FAR) {
    colorData[usedColor] = {
      number: 0,
      position: []     
    };
  }

  colorData['x'] = {
    number: 0,
    position: []  
  }

  for (let i = 0; i < possibleSolution.length; i++) {
    let color = possibleSolution[i];
    colorData[color].number++;
    colorData[color].position.push(i + 1); // one-indexed     
  }
  return colorData;
}

