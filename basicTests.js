const { gameLogic } = require('./gameLogic');

let result = gameLogic(['r', 'b', 'b', 'g', 'g']);
console.log(result);

/*

['r', 'b', 'b', 'g', 'b'] // this solves in about 5-6 turns
['r', 'b', 'b', 'g', 'g'] // this is sometimes getting stuck on the template ['r', 'b', 'b', 'r', 'r']. Why?!
['r', 'b', 'b', 'g', 'y']
['r', 'b', 'b', 'g', 'o']

*/