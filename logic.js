const { initializeGame } = require('./globalLogic');
const { generateAllPermutations } = require('./generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('./filterPermutations');
const { updateColorTracker } = require('./updateColorTracker');
const { generateNextGuess } = require('./generateNextGuess');

// ******* GLOBAL VARIABLES ******* //

const CODE_SIZE = 4; // or 5 (eventually)

let [COLORS, SECRET_CODE, COLOR_TRACKER] = initializeGame(CODE_SIZE);

let COLORS_TRIED_THUS_FAR = [];
// we only add to this when we have complete information, or when the template is still ['x', 'x', 'x', 'x']

console.log('COLORS', COLORS);
console.log('SECRET_CODE', SECRET_CODE);
console.log('COLOR_TRACKER', COLOR_TRACKER);

let templates = [['x', 'x', 'x', 'x']];

let guess = [];

let colorOrColorsUsedToFillTemplate = [];

let CURRENT_ROUND = 1;
const ROUND_LIMIT = 10;

while (CURRENT_ROUND <= ROUND_LIMIT) {
  // these variable names are still a bit verbose and confusing. Run them by Ethan and Andrew
  let [bestNextGuess, fillTempateColorOrColors, addToColorsTriedThusFar] = generateNextGuess(templates, COLOR_TRACKER, COLORS_TRIED_THUS_FAR, CODE_SIZE);
  guess = bestNextGuess;
  colorOrColorsUsedToFillTemplate = fillTempateColorOrColors;
  // addToColorsTriedThusFar could be an empty array, which is totally fine
  COLORS_TRIED_THUS_FAR = COLORS_TRIED_THUS_FAR.concat(addToColorsTriedThusFar);

  console.log(`------------------------------------------------ Round ${CURRENT_ROUND} ------------------------------------------------`);
  console.log('Next guess:', guess);

  let guessResults = getBlackAndWhitePegs(guess, SECRET_CODE);
  console.log('Guess Results:', guessResults);

  // check win condition
  // if 4 (or later 5) black pegs
  if (guessResults[0] === CODE_SIZE) {
    console.log('YOU WIN!!!');
    break;
  }

  // What exactly are we passing in here?
  // Don't we also need to pass possible templates? Starts with [['x', 'x', 'x', 'x']],
  // then becomes an array of templates to fill for each subsequent round
  // New colors(s) introduced, plus the wildcard 'x'

  // for the sake of debugging
  // templates = [['x', 'x', 'x']];
  // newColorsIntroduced = ['r', 'b'];

  console.log('These are the templates being used to generate all permutations:', templates);
  let allPermutations = generateAllPermutations(templates, colorOrColorsUsedToFillTemplate); // previously was hard-coded ['r', 'b', 'x']
  console.log('All Permutations:', allPermutations);
  console.log('Number of all possible permutations:', allPermutations.length);

  // possibleSolutions and templates need to be consolidated
  let possibleSolutions = filterForPossibleSolutions(guess, guessResults, allPermutations);
  console.log('Possible Solutions:', possibleSolutions);
  console.log('Number of possible solutions (templates):', possibleSolutions.length);

  // set the global variable
  templates = [...possibleSolutions];

  // updateColorTracker
  COLOR_TRACKER = updateColorTracker(possibleSolutions, COLORS, COLORS_TRIED_THUS_FAR, COLOR_TRACKER);
  console.log(COLOR_TRACKER);
  CURRENT_ROUND++;
}

// ---------- FUNCTIONS ---------- //

/*

- getBlackAndWhitePegs
- generateAllPermutations
- fillInTemplate
- checkIfArraysMatch
- filterForPossibleSolutions
- updateColorTracker
- trackPossibleSolution
- leastAmountKnown
- filterTemplatesForLeastNumberOfUniqueColors
- filterTemplatesForLeastNumberOfWildcards
- checkForKnownNumberOfAnyColor
- pickNewColorToIntroduce
- generateNextGuess

*/

// function leastAmountKnown() {
//   let color;
//   let amountKnown = 0;
//   for (let usedColor of COLORS_TRIED_THUS_FAR) {
//     let info = 0;
//     // this is a pretty rough way of approximating how much we know thus far about each color
//     // a more rigorous way would be to first check if the length of the number array is 1
//     // if so, does the length of the position array match the single value in the number array?
//     // if so, we have complete information for that color
//     info += COLOR_TRACKER[usedColor].number.length;
//     info += COLOR_TRACKER[usedColor].position.length;
//     if (info > amountKnown) {
//       color = usedColor;
//       amountKnown = info;
//     }
//   }
//   return color;
// }


// function filterTemplatesForLeastNumberOfUniqueColors(templates) {
//   let numUniqueColors = Infinity;
//   let filteredTemplates = [];

//   for (let template of templates) {
//     let set = new Set(template);
//     set.delete('x');
//     if (set.size < numUniqueColors) {
//       numUniqueColors = set.size;
//       filteredTemplates = [];
//       filteredTemplates.push(template);
//     } else if (set.size === numUniqueColors) {
//       filteredTemplates.push(template);      
//     }
//   }

//   return filteredTemplates;
// }


// function filterTemplatesForLeastNumberOfWildcards(templates) {
//   let leastNumberOfWildcards = Infinity;
//   let filteredTemplates = [];

//   for (let template of templates) {
//     let numberOfWildcards = 0;
//     for (let color of template) {
//       if (color === 'x') {
//         numberOfWildcards++;
//       }
//     }
//     if (numberOfWildcards < leastNumberOfWildcards) {
//       leastNumberOfWildcards = numberOfWildcards;
//       filteredTemplates = [];
//       filteredTemplates.push(template);
//     } else if (numberOfWildcards === leastNumberOfWildcards) {
//       filteredTemplates.push(template);
//     }
//   }

//   return filteredTemplates;
// }


// function checkForKnownNumberOfAnyColor() {
//   for (let color in COLOR_TRACKER) {
//     if (COLOR_TRACKER[color].number.length === 1) {
//       return true;
//     }
//   }
//   return false;;
// }


// function pickNewColorToIntroduce() {
//   for (let color in COLOR_TRACKER) {
//     if (!COLORS_TRIED_THUS_FAR.includes(color)) {
//       return color;
//     }
//   }
// }


// function generateNextGuess(templates) {
//   // check if template is all 'x's
//   if (templates.length === 1 && checkIfArraysMatch(templates[0], ['x', 'x', 'x', 'x'])) {
//     // fill it with the first two unused colors, 3 and 1 (or 3 and 2 if a 5-code game)
//     let colorsForGuess = [];
//     for (let color in COLOR_TRACKER) {
//       if (!COLORS_TRIED_THUS_FAR.includes(color)) {
//         colorsForGuess.push(color);
//         if (colorsForGuess.length === 2) {
//           break;
//         }
//       }
//     }
    
//     for (let color of colorsForGuess) {
//       COLORS_TRIED_THUS_FAR.push(color);
//     }

//     newColorsIntroduced = [];
//     for (let color of colorsForGuess) {
//       newColorsIntroduced.push(color);
//     }

//     let guess = new Array(3).fill(colorsForGuess[0]);
//     // to account for both 4 and 5 code games
//     while (guess.length < SECRET_CODE.length) {
//       guess.push(colorsForGuess[1]);
//     }
//     return guess;
//   }

//   // ------------------------------------- CRUCIAL POINT!!!! -------------------------------------
//   // This is where we decide whether to introduce a new color, 
//   // or to gain more information about the color we know the least about
 
//   // If we know the exact number of any of the COLORS_TRIED_THUS_FAR, then introduce a new color
//   // Else, use the color we know the least about

//   let fillGuessTemplateWithThisColor;
//   if (checkForKnownNumberOfAnyColor()) {
//     // introduce new color
//     fillGuessTemplateWithThisColor = pickNewColorToIntroduce() || leastAmountKnown();
//     COLORS_TRIED_THUS_FAR.push(fillGuessTemplateWithThisColor);
//   } else {
//     // of the COLORS_TRIED_THUS_FAR, identify the one we know the least about
//     // Edge case: What if there's a tie?
//     fillGuessTemplateWithThisColor = leastAmountKnown();
//   }

//   newColorsIntroduced = [];
//   newColorsIntroduced.push(fillGuessTemplateWithThisColor);
  
//   // filter templates
// //   console.log(colorWeKnowTheLeastAbout);

//   // I'm not sure exactly which order we should do the next steps in
//   // Filter for number of unique colors

//   let templatesWithLeastNumberOfUniqueColors = filterTemplatesForLeastNumberOfUniqueColors(templates);
//   // console.log('Least number of unique colors:', templatesWithLeastNumberOfUniqueColors);

//   // Then filter for number of wildcards
//   let templatesFilteredByLeastNumberOfUniqueColorsAndWilcards = filterTemplatesForLeastNumberOfWildcards(templatesWithLeastNumberOfUniqueColors);

//   // Shorten the variable name lol
//   let bestTemplates = templatesFilteredByLeastNumberOfUniqueColorsAndWilcards;
//   console.log('Best (viable) templates (least wildcards and unique colors)', bestTemplates);
  
//   // Then arbitrarily select one of the remaining filtered templates
//   let randomTemplate = bestTemplates[Math.floor(Math.random() * bestTemplates.length)];
//   console.log('Best template (randomly selected):', randomTemplate);
  
//   // Make copy to avoid passing by reference
//   let bestNextGuess = [...randomTemplate];
  
//   // and fill it with the fillGuessTemplateWithThisColor
//   for (let i = 0; i < bestNextGuess.length; i++) {
//     if (bestNextGuess[i] === 'x') {
//       bestNextGuess[i] = fillGuessTemplateWithThisColor;
//     }
//   }

//   console.log('Best next guess:', bestNextGuess);
//   return bestNextGuess;
// }


