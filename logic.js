
/*

Pass forward the possible valid solutions/guesses to each next round
- Also update data structure 


*/

// ******* GLOBAL VARIABLE ******* //
let COLORS = ['r', 'b', 'g', 'y', 'o', 'p'];

let COLOR_TRACKER = generateColorTracker();

let secretCode = ['r', 'b', 'r', 'y'];
// generateSecretCode();
console.log('Secret Code:', secretCode);

let templates = [['x', 'x', 'x', 'x']];

let guess = [];

let COLORS_TRIED_THUS_FAR = [];
// we only add to this when we have complete information, or when the template is still ['x', 'x', 'x', 'x']

let newColorsIntroduced = [];

let rounds = 10;

while (rounds) {
  let nextGuess = generateNextGuess(templates);
  console.log('Next Guess:', nextGuess);
  guess = nextGuess;

  let guessResults = getBlackAndWhitePegs(guess, secretCode);
  console.log('Guess Results:', guessResults);

  // check win condition
  // if 4 (or later 5) black pegs
  if (guessResults[0] === guess.length) {
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

  let allPermutations = generateAllPermutations(templates, newColorsIntroduced); // previously was hard-coded ['r', 'b', 'x']
  console.log('All Permutations:', allPermutations, 'Number of perms:', allPermutations.length);

  let possibleSolutions = filterForPossibleSolutions(guess, guessResults, allPermutations);
  console.log('Possible Solutions:', possibleSolutions);

  // set the global variable
  templates = possibleSolutions;

  // updateColorTracker
  updateColorTracker(possibleSolutions);
  console.log(COLOR_TRACKER);
  rounds--;
}

// ---------- FUNCTIONS ---------- //

/*

- generateColorTracker
- generateSecretCode
- getBlackAndWhitePegs
- generateAllPermutations
- checkIfArraysMatch
- filterForPossibleSolutions
- updateColorTracker
- trackPossibleSolution
- generateNextGuess

*/

function generateColorTracker() {
  let colorTracker = {};

  for (let color of COLORS) {
    colorTracker[color] = {
      number: [0, 1, 2, 3, 4], 
      // yeah, we probably want to update each color every time
      // in other words, we want to track wildcard information as we go (x's do matter)
      position: [1, 2, 3, 4]
    };
  }

  return colorTracker;
}


function generateSecretCode() {
  let code = [];

  for (let i = 0; i < 4; i++) {
    code.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }

  return code;
}


function getBlackAndWhitePegs(guess, secret) {
  let guessCopy = [...guess];
  let secretCopy = [...secret];
  
  // check black (right color, right spot)
  let blackPegs = 0;

  for (let i = 0; i < guessCopy.length; i++) {
    if (guessCopy[i] === secretCopy[i]) {
      blackPegs++;
      secretCopy[i] = null;
      guessCopy[i] = null;
    }
  }

  // check white (right color, wrong spot)
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
}


function generateAllPermutations(templates, newColorsIntroduced) {
  // add wildcard variable 
  let newColors = [...newColorsIntroduced, 'x'];

  let perms = [];

  // fill the templates with the newColor(s) introduced in the previous guess
  for (let template of templates) {
    // (there was some funky stuff going on with x, so I changed it to ? and then replaced it later)
    // (not super efficient, but beware of premature optimization!)
    for (let i = 0; i < template.length; i++) {
      if (template[i] === 'x') {
        template[i] = '?';
      }
    }
    fillInTemplate(template);
  }

  // it's not "re-winding" back to the very first index
  // there's some funky stuff happening with the x's...
  function fillInTemplate(template, index = 0) {
    for (let i = index; i < template.length; i++) {
      if (template[i] === '?') {
        for (let j = 0; j < newColors.length; j++) {
          let templateCopy = [...template];
          templateCopy[i] = newColors[j];
          if (index === templateCopy.length - 1) {
            perms.push(templateCopy);
          } else {
            fillInTemplate(templateCopy, index + 1);
          }
        }        
      }
    }
  }

  return perms;
}


function checkIfArraysMatch(arr1, arr2) {
  if (arr1 == null || arr2 == null) return false;
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}


function filterForPossibleSolutions(guess, guessResults, permutations) {
  let possibleSolutions = [];

  for (let perm of permutations) {
    let result = getBlackAndWhitePegs(guess, perm);
    // console.log('Perm, Result:', perm, result);
    // if result matches guess results, push perm to possibleSolutions array
    if (checkIfArraysMatch(result, guessResults)) {
      possibleSolutions.push(perm);
    }
  }

  return possibleSolutions;
}



// This function is too big. Break it down into sub-functions
function updateColorTracker(possibleSolutions) {
  let setColorTracker = {};
  for (let color of COLORS) {
    if (COLORS_TRIED_THUS_FAR.includes(color)) {
      setColorTracker[color] = {
        number: [],
        position: []
      } 
    } else {
      setColorTracker[color] = {
        number: [0],
        position: []
      } 
    }
  }

  // for each possibleSolution, 
  for (let possibleSolution of possibleSolutions) {
    // track (get number and position data) for each possible solution
    let colorData = trackPossibleSolution(possibleSolution);
    // use info to update color tracker
    for (let color in colorData) {
      if (color === 'x') {
        for (let setColor in setColorTracker) {
          if (!COLORS_TRIED_THUS_FAR.includes(setColor)) {
            // update number
            if (!setColorTracker[setColor].number.includes(colorData[color].number)) {
              setColorTracker[setColor].number.push(colorData[color].number);
            }
            // update position
            for (let position of colorData[color].position) {
              if (!setColorTracker[setColor].position.length || !setColorTracker[setColor].position.includes(position)) {
                setColorTracker[setColor].position.push(position);
              }
            }
          }
        }
      } else {
        // update number
        console.log(setColorTracker[color].number);
        console.log(colorData[color].number);
        if (!setColorTracker[color].number.includes(colorData[color].number)) {
          setColorTracker[color].number.push(colorData[color].number);
        }
        // update position
        for (let position of colorData[color].position) {
          if (!setColorTracker[color].position.includes(position)) {
            setColorTracker[color].position.push(position);
          }
        }        
      }
    }
  }

  // update global color tracker
  for (let color in setColorTracker) {
    // sort (not really necessary)
    setColorTracker[color].number.sort((a, b) => a - b);
    setColorTracker[color].position.sort((a, b) => a - b);
    COLOR_TRACKER[color] = setColorTracker[color];
  }
}


// This is getting the possible colors (numbers and positions) for just ONE possible solution
function trackPossibleSolution(possibleSolution) {
  let colorData = {};
  for (let usedColor of COLORS_TRIED_THUS_FAR) {
    colorData[usedColor] = {
      number: 0,
      position: []     
    };
  }

  colorData['x'] = {
    number: 0,
    position: []  
  }

  for (let i = 0; i < possibleSolution.length; i++) {
    let color = possibleSolution[i];
    colorData[color].number++;
    colorData[color].position.push(i + 1); // one-indexed     
  }
  return colorData;
}


function leastAmountKnown() {
  let color;
  let amountKnown = 0;
  for (let usedColor of COLORS_TRIED_THUS_FAR) {
    let info = 0;
    // this is a pretty rough way of approximating how much we know thus far about each color
    // a more rigorous way would be to first check if the length of the number array is 1
    // if so, does the length of the position array match the single value in the number array?
    // if so, we have complete information for that color
    info += COLOR_TRACKER[usedColor].number.length;
    info += COLOR_TRACKER[usedColor].position.length;
    if (info > amountKnown) {
      color = usedColor;
      amountKnown = info;
    }
  }
  return color;
}


function filterTemplatesForLeastNumberOfUniqueColors(templates) {
  let numUniqueColors = Infinity;
  let filteredTemplates = [];

  for (let template of templates) {
    let set = new Set(template);
    set.delete('x');
    if (set.size < numUniqueColors) {
      numUniqueColors = set.size;
      filteredTemplates = [];
      filteredTemplates.push(template);
    } else if (set.size === numUniqueColors) {
      filteredTemplates.push(template);      
    }
  }

  return filteredTemplates;
}


function filterTemplatesForLeastNumberOfWildcards(templates) {
  let leastNumberOfWildcards = Infinity;
  let filteredTemplates = [];

  for (let template of templates) {
    let numberOfWildcards = 0;
    for (let color of template) {
      if (color === 'x') {
        numberOfWildcards++;
      }
    }
    if (numberOfWildcards < leastNumberOfWildcards) {
      leastNumberOfWildcards = numberOfWildcards;
      filteredTemplates = [];
      filteredTemplates.push(template);
    } else if (numberOfWildcards === leastNumberOfWildcards) {
      filteredTemplates.push(template);
    }
  }

  return filteredTemplates;
}


function generateNextGuess(templates) {
  // check if template is all 'x's
  if (templates.length === 1 && checkIfArraysMatch(templates[0], ['x', 'x', 'x', 'x'])) {
    // fill it with the first two unused colors, 3 and 1 (or 3 and 2 if a 5-code game)
    let colorsForGuess = [];
    for (let color in COLOR_TRACKER) {
      if (!COLORS_TRIED_THUS_FAR.includes(color)) {
        colorsForGuess.push(color);
        if (colorsForGuess.length === 2) {
          break;
        }
      }
    }
    
    for (let color of colorsForGuess) {
      COLORS_TRIED_THUS_FAR.push(color);
    }

    newColorsIntroduced = [];
    for (let color of colorsForGuess) {
      newColorsIntroduced.push(color);
    }

    let guess = new Array(3).fill(colorsForGuess[0]);
    // to account for both 4 and 5 code games
    while (guess.length < secretCode.length) {
      guess.push(colorsForGuess[1]);
    }
    return guess;
  }

  // of the COLORS_TRIED_THUS_FAR, identify the one we know the least about
  // Edge case: What if there's a tie?
  let colorWeKnowTheLeastAbout = leastAmountKnown();

  newColorsIntroduced = [];
  newColorsIntroduced.push(colorWeKnowTheLeastAbout);
  
  // filter templates
//   console.log(colorWeKnowTheLeastAbout);

  // I'm not sure exactly which order we should do the next steps in
  // Filter for number of unique colors

  let templatesWithLeastNumberOfUniqueColors = filterTemplatesForLeastNumberOfUniqueColors(templates);
//   console.log(templatesWithLeastNumberOfUniqueColors);

  // Then filter for number of wildcards
  let templatesFilteredByLeastNumberOfUniqueColorsAndWilcards = filterTemplatesForLeastNumberOfWildcards(templatesWithLeastNumberOfUniqueColors);
//   console.log(templatesFilteredByLeastNumberOfUniqueColorsAndWilcards);

  // Shorten the variable name lol
  let bestTemplates = templatesFilteredByLeastNumberOfUniqueColorsAndWilcards;
  // Then arbitrarily select one of the remaining filtered templates

  let randomTemplate = bestTemplates[Math.floor(Math.random() * bestTemplates.length)];
//   console.log(randomTemplate);
  
  // and fill it with the colorWeKnowTheLeastAbout
  for (let i = 0; i < randomTemplate.length; i++) {
    if (randomTemplate[i] === 'x') {
      randomTemplate[i] = colorWeKnowTheLeastAbout;
    }
  }
  
  // unnecessary renaming, just for clarity
  let bestNextGuess = randomTemplate;
  return bestNextGuess;
}

