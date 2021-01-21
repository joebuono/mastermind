const { gameLogic } = require('./gameLogic');

let result = gameLogic(['r', 'b', 'b', 'g', 'o']);
console.log('Rounds to solve:', result);

/*

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
