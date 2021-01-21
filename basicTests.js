const { gameLogic } = require('./gameLogic');

let result = gameLogic(['r', 'b', 'b', 'g', 'g']);
console.log(result);

/*

There's something funky going on with Green...

// These all take over 11 rounds on average to solve:
[ 'y', 'p', 'g', 'p' ] // seemed to fix by switching the order of filtering viable templates (first filter by wildcards, THEN filter by unique colors)
[ 'g', 'y', 'p', 'p' ] // same as above
[ 'p', 'g', 'y', 'p' ] // same as above
[ 'y', 'g', 'p', 'p' ] // same as above


['r', 'b', 'b', 'g', 'g'] // this is sometimes getting stuck on the template ['r', 'b', 'b', 'r', 'r']. Why?!
['r', 'b', 'b', 'g', 'y']
['r', 'b', 'b', 'g', 'o']

*/
