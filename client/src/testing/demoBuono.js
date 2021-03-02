/*

Joe Buono's Algorithm

It's worth noting that I discovered Knuth's algorithm after I had finished implementing my own. 

It's also worth noting that

I consider precomputing and storing the results, but that would take a long time and it's not a scalable solution. 

Solving NP-complete problems: https://en.wikipedia.org/wiki/NP-completeness
- Approximation: Instead of searching for an optimal solution, search for a solution that is at most a factor from an optimal one.
- Randomization: Use randomness to get a faster average running time, and allow the algorithm to fail with some small probability.
- Heuristic: An algorithm that works "reasonably well" in many cases, but for which there is no proof that it is both always fast and always produces a good result.



*/

// 1. Create the set S of 1296 possible codes (rrrr, rrrb, ...pppo, pppp)
let S = setOfPossibleCodes();

/* 2. Start with initial guess xxyy

Through testing, I confirmed that splitting the first guess. My original assumption was that an asymmetric guess would provide more information, but that turned out to be false. 

I also found the randomizing the colors selected improved the average case performance of my algorithm. 

*/
let guess = ['rrbb'];
let numberOfAttempts = 1;

// 2.5 Declare color tracker data structure, and array of templates
let colorTracker = initColorTracker();
// Go into some detail about this
let templates = [];

while (gameNotOver) {
  // generate next guess

  // 3. Play the guess to get a response of black and white pegs.
  let [blackPegs, whitePegs] = checkGuess();

  // 4. If the response is four black pegs, the game is won, the algorithm terminates.
  if (blackPegs === 4) {
    console.log(`Game won in ${numberOfAttempts} attempts.`);
    return;
  }

  // 5. Otherwise, remove from S any code that would not give the same response if it (the guess) were the code.

  // This should actuall be filterTemplates
  S.forEach(possibility => remove(possibility, [blackPegs, whitePegs]));

  /* Buono algo 

  Update colorTracker and templates based on removed possibilities


  */

  numberOfAttempts++;
}

/*

Time/Space Complexity Analysis:


Test Results:


Tradeoffs:

*/