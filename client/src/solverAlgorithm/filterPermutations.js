const getBlackAndWhitePegs = (guess, possibleSecretCode) => {
  let guessCopy = [...guess];
  let secretCopy = [...possibleSecretCode];
  
  let blackPegs = 0;

  for (let i = 0; i < guessCopy.length; i++) {
    if (guessCopy[i] === secretCopy[i]) {
      blackPegs++;
      secretCopy[i] = null;
      guessCopy[i] = null;
    }
  }

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
    if (checkIfArraysMatch(result, guessResults)) {
      possibleSolutions.push(perm);
    }
  }

  return possibleSolutions;
};

export {
  getBlackAndWhitePegs,
  checkIfArraysMatch,
  filterForPossibleSolutions
};