/*

Generate all possible permutations given Red and Blue

*/

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


function possibleValidPermutations(permutations, guessResults) {
  // for each permutation, check 
}

let permutations = generateAllPermutations(['r', 'b']);

// [number of black pegs, number of white pegs]
let guessResults = [0, 0];

let pvp = possibleValidPermutations(permutations, guessResults);

console.log(pvp);

