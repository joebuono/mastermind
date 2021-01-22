const { gameLogic } = require('../gameLogic');


let secretCode = ['b', 'g', 'o', 'g', 'w'];
let roundsToSolve = gameLogic(secretCode);
console.log(`Rounds to solve [${secretCode}]`, roundsToSolve);


// For basic iterative tests:
// let iterations = 10;
// for (let i = 0; i < iterations; i++) {
//   let roundsToSolve = gameLogic(secretCode);
//   console.log(`Rounds to solve ${secretCode}`, roundsToSolve);
// }

/*

[ 'g', 'y', 'y', 'b' ]
Waiting for the debugger to disconnect...
/Users/joebuono/Desktop/Coding/mastermind/mastermind/solverAlgorithm/generateNextGuess.js:121
    bestNextGuess = [...randomTemplate];
    ^

SECRET_CODE: [ 'g', 'y', 'y', 'b' ]

------------------------------------------------ Round 1 ------------------------------------------------
Next guess: [ 'r', 'r', 'r', 'b' ]
{
  r: { number: [ 0, 1 ], position: [ 1, 2, 3 ] },
  b: { number: [ 0, 1, 2, 3, 4 ], position: [ 1, 2, 3, 4 ] },
  g: { number: [ 0, 1, 2, 3 ], position: [ 1, 2, 3, 4 ] },
  y: { number: [ 0, 1, 2, 3 ], position: [ 1, 2, 3, 4 ] },
  o: { number: [ 0, 1, 2, 3 ], position: [ 1, 2, 3, 4 ] },
  p: { number: [ 0, 1, 2, 3 ], position: [ 1, 2, 3, 4 ] }
}
------------------------------------------------ Round 2 ------------------------------------------------
Next guess: [ 'b', 'b', 'b', 'b' ]
{
  r: { number: [ 0, 1 ], position: [ 1, 2, 3 ] },
  b: { number: [ 1 ], position: [ 1, 2, 3, 4 ] }, // This is a problem with updateColorTracker. We KNOW for a fact that Blue goes in the fourth spot. But how?
  g: { number: [ 0, 2, 3 ], position: [ 1, 2, 3, 4 ] },
  y: { number: [ 0, 2, 3 ], position: [ 1, 2, 3, 4 ] },
  o: { number: [ 0, 2, 3 ], position: [ 1, 2, 3, 4 ] },
  p: { number: [ 0, 2, 3 ], position: [ 1, 2, 3, 4 ] }
}


All of these codes failed at least once in testing (exceeded 20 rounds): [
  [ 'r', 'g', 'g', 'b' ], [ 'r', 'g', 'y', 'b' ], [ 'r', 'g', 'o', 'r' ],
  [ 'r', 'g', 'o', 'b' ], [ 'r', 'g', 'p', 'b' ], [ 'r', 'y', 'g', 'r' ],
  [ 'r', 'y', 'g', 'b' ], [ 'r', 'o', 'g', 'r' ], [ 'r', 'o', 'g', 'b' ],
  [ 'r', 'p', 'g', 'b' ], [ 'b', 'g', 'g', 'b' ], [ 'b', 'g', 'y', 'b' ],
  [ 'b', 'g', 'o', 'b' ], [ 'b', 'g', 'p', 'b' ], [ 'b', 'y', 'g', 'b' ],
  [ 'b', 'o', 'g', 'b' ], [ 'b', 'p', 'g', 'b' ], [ 'g', 'r', 'g', 'b' ],
  [ 'g', 'r', 'y', 'r' ], [ 'g', 'r', 'y', 'b' ], [ 'g', 'r', 'o', 'r' ],
  [ 'g', 'r', 'o', 'b' ], [ 'g', 'r', 'p', 'r' ], [ 'g', 'r', 'p', 'b' ],
  [ 'g', 'b', 'y', 'b' ], [ 'g', 'b', 'o', 'b' ], [ 'g', 'g', 'r', 'b' ],
  [ 'g', 'g', 'y', 'b' ], [ 'g', 'g', 'o', 'b' ], [ 'g', 'g', 'p', 'b' ],
  [ 'g', 'y', 'r', 'r' ], [ 'g', 'y', 'r', 'b' ], [ 'g', 'y', 'b', 'b' ],
  [ 'g', 'y', 'g', 'b' ], [ 'g', 'o', 'r', 'r' ], [ 'g', 'o', 'r', 'b' ],
  [ 'g', 'o', 'g', 'b' ], [ 'g', 'o', 'o', 'y' ], [ 'g', 'o', 'p', 'g' ],
  [ 'g', 'o', 'p', 'y' ], [ 'g', 'p', 'r', 'b' ], [ 'g', 'p', 'b', 'b' ],
  [ 'g', 'p', 'g', 'b' ], [ 'g', 'p', 'o', 'y' ], [ 'y', 'r', 'g', 'b' ],
  [ 'y', 'b', 'g', 'b' ], [ 'y', 'g', 'r', 'b' ], [ 'y', 'g', 'b', 'b' ],
  [ 'y', 'g', 'g', 'b' ], [ 'y', 'o', 'p', 'y' ], [ 'o', 'r', 'g', 'r' ],
  [ 'o', 'r', 'g', 'b' ], [ 'o', 'b', 'g', 'b' ], [ 'o', 'g', 'r', 'r' ],
  [ 'o', 'g', 'r', 'b' ], [ 'o', 'g', 'b', 'b' ], [ 'o', 'g', 'g', 'b' ],
  [ 'o', 'g', 'o', 'y' ], [ 'o', 'g', 'p', 'g' ], [ 'o', 'g', 'p', 'y' ],
  [ 'o', 'y', 'o', 'y' ], [ 'o', 'o', 'g', 'y' ], [ 'o', 'o', 'y', 'y' ],
  [ 'o', 'o', 'p', 'y' ], [ 'o', 'p', 'g', 'g' ], [ 'o', 'p', 'g', 'y' ],
  [ 'o', 'p', 'o', 'y' ], [ 'o', 'p', 'p', 'o' ], [ 'p', 'r', 'g', 'r' ],
  [ 'p', 'r', 'g', 'b' ], [ 'p', 'g', 'r', 'r' ], [ 'p', 'g', 'r', 'b' ],
  [ 'p', 'g', 'g', 'b' ], [ 'p', 'g', 'o', 'g' ], [ 'p', 'g', 'o', 'y' ],
  [ 'p', 'y', 'o', 'y' ], [ 'p', 'o', 'g', 'y' ], [ 'p', 'o', 'o', 'y' ],
  [ 'p', 'o', 'p', 'o' ], [ 'p', 'p', 'o', 'o' ]
]


  [ 21, [ 'r', 'r', 'r', 'g' ] ],
  [ 21, [ 'r', 'r', 'r', 'y' ] ],
  [ 21, [ 'r', 'r', 'r', 'o' ] ],
  [ 21, [ 'r', 'r', 'r', 'p' ] ],
  [ 21, [ 'r', 'r', 'g', 'r' ] ],
  [ 21, [ 'r', 'r', 'y', 'r' ] ],
  [ 21, [ 'r', 'r', 'o', 'r' ] ],
  [ 21, [ 'r', 'r', 'p', 'r' ] ],
  [ 21, [ 'r', 'g', 'r', 'r' ] ],
  [ 21, [ 'r', 'y', 'r', 'r' ] ],
  [ 21, [ 'r', 'o', 'r', 'r' ] ],
  [ 21, [ 'r', 'p', 'r', 'r' ] ],
  [ 21, [ 'b', 'b', 'b', 'g' ] ],
  [ 21, [ 'b', 'b', 'b', 'y' ] ],
  [ 21, [ 'b', 'b', 'b', 'o' ] ],
  [ 21, [ 'b', 'b', 'b', 'p' ] ],
  [ 21, [ 'g', 'r', 'r', 'r' ] ],
  [ 21, [ 'g', 'g', 'g', 'o' ] ],
  [ 21, [ 'g', 'g', 'g', 'p' ] ],
  [ 21, [ 'g', 'g', 'o', 'g' ] ],
  [ 21, [ 'g', 'g', 'p', 'g' ] ],
  [ 21, [ 'g', 'o', 'g', 'g' ] ],
  [ 21, [ 'g', 'p', 'g', 'g' ] ],
  [ 21, [ 'y', 'r', 'r', 'r' ] ],
  [ 21, [ 'y', 'y', 'y', 'o' ] ],
  [ 21, [ 'y', 'y', 'y', 'p' ] ],
  [ 21, [ 'o', 'r', 'r', 'r' ] ],
  [ 21, [ 'o', 'g', 'g', 'g' ] ],
  [ 21, [ 'p', 'r', 'r', 'r' ] ],
  [ 21, [ 'p', 'g', 'g', 'g' ] ],






Fixed:

[ 'r', 'o', 'o', 'p' ]
// solverAlgorithm/updateColorTracker.js:67
// if (!setColorTracker[color].number.includes(colorData[color].number)) {
// TypeError: Cannot read property 'number' of undefined


There's something funky going on with Green...

// These all take over 11 rounds on average to solve:
[ 'y', 'p', 'g', 'p' ] // seemed to fix by switching the order of filtering viable templates (first filter by wildcards, THEN filter by unique colors)
[ 'g', 'y', 'p', 'p' ] // same as above
[ 'p', 'g', 'y', 'p' ] // same as above
[ 'y', 'g', 'p', 'p' ] // same as above


['r', 'b', 'b', 'g', 'g'] // this is sometimes getting stuck on the template ['r', 'b', 'b', 'r', 'r']. Why?!
- Solved, but still somewhat inefficient (avg 8 rounds to solve)
- I optimized it to 5 rounds! Here's how:
- Approx line 60 in generateNextGuess:
  - If TOTAL number of known colors is <==> to the number of colors tried thus far (if the difference is less than 1)
  if (COLORS_TRIED_THUS_FAR.length - g.checkForHowManyColorsWeKnowTheNumberOf(COLOR_TRACKER) < 1)
// Effectively, this makes the algorithm cautious of introducing new colors. 
- It wants to figure out the exact NUMBER of each of the colors its used thus far BEFORE introducing a new color

['r', 'b', 'b', 'g', 'y']
['r', 'b', 'b', 'g', 'o']

*/
