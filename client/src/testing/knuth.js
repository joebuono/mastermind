/*

In 1977, Donald Knuth demonstrated that the codebreaker can solve the pattern in five moves or fewer, using an algorithm that progressively reduces the number of possible patterns.[11] The algorithm works as follows:

1. Create the set S of 1296 possible codes (1111, 1112 ... 6665, 6666)
2. Start with initial guess 1122 (Knuth gives examples showing that other 
   first guesses such as 1123, 1234 do not win in five tries on every code)
3. Play the guess to get a response of coloured and white pegs.
4. If the response is four colored pegs, the game is won, the algorithm terminates.
5. Otherwise, remove from S any code that would not give the same response if it (the guess) were the code.
6. Apply minimax technique to find a next guess as follows: For each possible guess, that is, 
   any unused code of the 1296 not just those in S, calculate how many possibilities in S 
   would be eliminated for each possible colored/white peg score. The score of a guess is the 
   minimum number of possibilities it might eliminate from S. A single pass through S for each 
   unused code of the 1296 will provide a hit count for each coloured/white peg score found; 
   the coloured/white peg score with the highest hit count will eliminate the fewest possibilities; 
   calculate the score of a guess by using 
   "minimum eliminated" = "count of elements in S" - (minus) "highest hit count". 
   From the set of guesses with the maximum score, select one as the next guess, choosing a 
   member of S whenever possible. (Knuth follows the convention of choosing the guess with the 
   least numeric value e.g. 2345 is lower than 3456. Knuth also gives an example showing that in 
   some cases no member of S will be among the highest scoring guesses and thus the guess cannot win 
   on the next turn, yet will be necessary to assure a win in five.)
7. Repeat from step 3.

*/

exports.knuth = function(secretCode) {
// 1. Create the set S of 1296 possible codes (1111, 1112 ... 6665, 6666)
  let ALL_COLORS = ['r', 'b', 'g', 'y', 'o', 'p', 'n', 'w', 'd', 'k'];

  // let secretCode = 'rgby';
  let codeSize = secretCode.length;
  let colors = ALL_COLORS.slice(0, (codeSize * 2) - 2);

  let allPossibilities = new Set();
  let S = new Set();
  generatePossibleCodes();

  let allPegs = ['0,0'];

  // add all black/white pegs combinations to allPegs
  for (let black = 0; black < codeSize - 1; black++) {
    for (let white = 1; white <= codeSize - black; white++) {
      if (!black) allPegs.push(`${white},${black}`);
      allPegs.push(`${black},${white}`);
    }
  }

  // console.log('possible pegs', allPegs);
  // debugger;

  // 2. Start with initial guess 1122
  // let currentGuess = codeSize === 4 ? 'rrbb' : 'rrrbb';
  let currentGuess = ['r', 'r', 'b', 'b'];
  // let currentGuess = [...new Array(Math.ceil(codeSize / 2)).fill('r'), ...new Array(Math.floor(codeSize / 2)).fill('b')];

  let attempts = 1;

  while (true) {
    // console.log(currentGuess);
    // console.time('firstGuess');
    // if (attempts >= 2) {
    //   console.timeEnd('firstGuess');
    //   debugger;
    // }

    allPossibilities.delete(currentGuess);
    let pegs = getPegs(currentGuess, secretCode);
    // console.log(pegs);
    if (pegs === `${codeSize},0`) {
      return attempts;
      // console.log(`You won in ${attempts} attempts!`);
      // break;
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
      // console.log('unused', unused);
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

    // console.log('number of bestNextGuesses', bestNextGuesses.length);
    return bestNextGuesses;
  }
};
// *** FUNCTIONS *** //