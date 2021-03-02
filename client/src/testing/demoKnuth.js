/*

Donald Knuth's Algorithm

In 1977, Donald Knuth demonstrated that the codebreaker can solve the pattern in five moves or fewer, using an algorithm that progressively reduces the number of possible patterns. The algorithm works as follows:


// 1. Create the set S of 1296 possible codes ('rrrr', 'rrrb', ...'pppo', 'pppp')
let S = setOfPossibleCodes();

/* 2. Start with initial guess 'rrbb'

Knuth gives examples showing that other first guesses such as rrbg, rbgy do not win in five tries on every code)

*/
let guess = ['rrbb'];
let numberOfAttempts = 1;

while (gameNotOver) {
  // 3. Play the guess to get a response of black and white pegs.
  let [blackPegs, whitePegs] = checkGuess(guess, secretCode);

  // 4. If the response is four black pegs, the game is won, the algorithm terminates.
  if (blackPegs === 4) {
    console.log(`Game won in ${numberOfAttempts} attempts.`);
    return;
  }

  // 5. Otherwise, remove from S any code that would not give the same response if it (the guess) were the code.
  S.forEach(possibility => remove(possibility, [blackPegs, whitePegs]));

  /* 6. Apply minimax technique to find a best next guess as follows: 

  For each possible guess - that is, any unused code of the 1296 not just those in S - calculate how many possibilities in S would be eliminated for each possible black/white peg score. The score of a guess is the minimum number of possibilities it might eliminate from S. A single pass through S for each unused code of the 1296 will provide a hit count for each black/white peg score found; the black/white peg score with the highest hit count will eliminate the fewest possibilities; 

  calculate the score of a guess by using "minimum eliminated" = "count of elements in S" - (minus) "highest hit count". 

  From the set of guesses with the maximum score, select one as the next guess, choosing a member of S whenever possible.

  */

  guess = minimax(allPossibleCodes, allPossiblePegs, S);

  numberOfAttempts++;
}

function minimax(allPossibleCodes, allPossiblePegs, S) {
  let bestNextGuesses = [];
  let globalMinEliminated = Number.MIN_SAFE_INTEGER;

  for (let unused of allPossibleCodes) {
    let miniMaxEliminated = Number.MAX_SAFE_INTEGER;
    for (let pegs of allPossiblePegs) {
      let hitCount = 0;
      for (let possibility of S) {
        if (checkGuess(unused, possibility) === pegs) {
          hitCount++;
        }
      }
      let minEliminated = S.size - hitCount;
      miniMaxEliminated = Math.min(miniMaxEliminated, minEliminated);
    }

    if (miniMaxEliminated > globalMinEliminated) {
      bestNextGuesses = [unused];
      globalMinEliminated = miniMaxEliminated;
    } else if (miniMaxEliminated === globalMinEliminated) {
      bestNextGuesses.push(unused);
    }
  }

  // select random guess, preferably from set S
  return selectRandomGuessFrom(bestNextGuesses);
};


/*

Time/Space Complexity Analysis:
O(n^3) - Roughly cubic time


Test Results:


Tradeoffs:

*/