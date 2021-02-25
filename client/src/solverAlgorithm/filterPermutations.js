
const getBlackAndWhitePegs = (guess, possibleSecretCode) => {
  let guessCopy = [...guess];
  let secretCopy = [...possibleSecretCode];
  
  // check for black pegs (right color, right spot)
  let blackPegs = 0;

  for (let i = 0; i < guessCopy.length; i++) {
    if (guessCopy[i] === secretCopy[i]) {
      blackPegs++;
      secretCopy[i] = null;
      guessCopy[i] = null;
    }
  }

  // check for white pegs (right color, wrong spot)
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
};

const checkIfArraysMatch = (arr1, arr2) => {
  if (arr1 == null || arr2 == null) return false;
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

const filterForPossibleSolutions = (guess, guessResults, permutations) => {
  let possibleSolutions = [];

  for (let perm of permutations) {
    let result = getBlackAndWhitePegs(guess, perm);
    // console.log('Perm, Result:', perm, result);
    // if result matches guess results, push perm to possibleSolutions array
    if (checkIfArraysMatch(result, guessResults)) {
      possibleSolutions.push(perm);
    }
  }

  return possibleSolutions;
};

module.exports = {
  getBlackAndWhitePegs,
  checkIfArraysMatch,
  filterForPossibleSolutions
};