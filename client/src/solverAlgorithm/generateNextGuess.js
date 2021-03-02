const { checkIfArraysMatch } = require('./filterPermutations');
const g = require('./guessHelperFunctions');

const generateNextGuess = (globalTemplates, COLOR_TRACKER, COLORS_TRIED_THUS_FAR, CODE_SIZE, previousGuesses, difficulty = 'hard') => {
  // Make local copy of templates
  let templates = [...globalTemplates];

  for (let template of templates) {
    if (!template.includes('x')) {
      // check that the guess have the right number of each color (preventing stupid guesses)
      let badGuess = false;
      for (let color of template) {
        if (!COLOR_TRACKER[color].position.length) {
          badGuess = true;
          break;
        }
      }

      if (!badGuess) {
        // check that we don't already know the secretCode for certain (this is a raw solution just to get the MVP working)
        let certainGuess = [];
        for (let i = 0; i < CODE_SIZE; i++) {
          let numberInPosition = 0;
          let knownColor;
          for (let color in COLOR_TRACKER) {
            if (COLOR_TRACKER[color].position.includes(i + 1)) {
              numberInPosition++;
              if (numberInPosition > 1) break;
              knownColor = color;
            }
          }
          if (numberInPosition !== 1) {
            break;
          } else {
            certainGuess.push(knownColor);
          }
        }
        if (certainGuess.length === CODE_SIZE) return [certainGuess, [], []];
        return [template, [], []];
      }
    }
  }
  
  let fillCondition;
  if (difficulty === 'easy') {
    fillCondition = false;
  } else if (difficulty === 'medium') {
    fillCondition = true;
    let numberOfWildCards = 0;
    for (let color of templates[0]) {
      if (color === 'x') numberOfWildCards++;
    }
    fillCondition = numberOfWildCards >= 4;
  } else if (difficulty === 'hard') {
    fillCondition = true;
  }

  if (templates.length === 1 && fillCondition) {

    let colorsUsedToFillTemplate = g.pickNewColorToIntroduce(COLOR_TRACKER, COLORS_TRIED_THUS_FAR, 2);
    let bestNextGuess = [...templates[0]];
    let numberOfFirstColor = 2; // testing 2 or 3 as an ideal split

    for (let i = 0; i < bestNextGuess.length; i++) {
      if (bestNextGuess[i] === 'x') {
        bestNextGuess[i] = colorsUsedToFillTemplate[0];
        numberOfFirstColor--;
        if (!numberOfFirstColor) break;
      }
    }

    for (let i = 0; i < bestNextGuess.length; i++) {
      if (bestNextGuess[i] === 'x') {
        bestNextGuess[i] = colorsUsedToFillTemplate[1];
      }
    }

    // perhaps an unnecessary reassignment, just for clarity
    let addToColorsTriedThusFar = colorsUsedToFillTemplate;

    // if (bestNextGuess.includes(undefined)) debugger;

    return [bestNextGuess, colorsUsedToFillTemplate, addToColorsTriedThusFar];
  }
 
  // If we know the exact number of any of the COLORS_TRIED_THUS_FAR, then introduce a new color
  // Else, use the color we know the least about

  let addToColorsTriedThusFar = [];

  let fillGuessTemplateWithThisColor;
  let howStringent; // How conservative are we about introducing new colors? 
  // 1 is very stringent (we only introduce new colors once we have knowledge of the colors we've tried thus far)
  // 3 is liberal (we are ready to introduce new colors (variables) at the same time, which happens to be to our benefit)
  if (difficulty === 'easy') {
    howStringent = 0;
  } else if (difficulty === 'medium') {
    howStringent = 1;
  } else if (difficulty === 'hard') {
    howStringent = 3;
  }

  if (COLORS_TRIED_THUS_FAR.length - g.checkForHowManyColorsWeKnowTheNumberOf(COLOR_TRACKER) <= howStringent) {
    fillGuessTemplateWithThisColor = g.pickNewColorToIntroduce(COLOR_TRACKER, COLORS_TRIED_THUS_FAR) || g.leastAmountKnown(COLOR_TRACKER, COLORS_TRIED_THUS_FAR);
    if (!fillGuessTemplateWithThisColor) debugger;
    addToColorsTriedThusFar.push(fillGuessTemplateWithThisColor);
  } else {
    fillGuessTemplateWithThisColor = g.leastAmountKnown(COLOR_TRACKER, COLORS_TRIED_THUS_FAR);
  }

  let colorUsedToFillTemplate = [fillGuessTemplateWithThisColor];

  let bestNextGuess = [];

  while (true) {
    let bestTemplates = [...templates];

    if (difficulty !== 'easy') {
      let templatesWithAtLeastOneWildcard = g.filterForTemplatesWithAtLeastOneWildcard(bestTemplates);
  
      let templatesWithLeastNumberofWildcards = g.filterTemplatesForLeastNumberOfWildcards(templatesWithAtLeastOneWildcard);
  
      bestTemplates = g.filterTemplatesForLeastNumberOfUniqueColors(templatesWithLeastNumberofWildcards);
    }

    // Then arbitrarily select one of the remaining filtered templates
    let randomTemplate = bestTemplates.length === 1 ? bestTemplates[0] : bestTemplates[Math.floor(Math.random() * bestTemplates.length)];

    // if (!randomTemplate || !randomTemplate.length) debugger;

    // Make copy to avoid passing by reference
    bestNextGuess = [...randomTemplate];

    if (difficulty !== 'easy') {
      let numberOfWildCards = 0;
      for (let color of bestNextGuess) {
        if (color === 'x') numberOfWildCards++;
      }
      if (numberOfWildCards > 2) {
        return generateNextGuess([bestNextGuess], COLOR_TRACKER, COLORS_TRIED_THUS_FAR, CODE_SIZE, previousGuesses)
      }
    }

    for (let i = 0; i < bestNextGuess.length; i++) {
      if (bestNextGuess[i] === 'x') {
        bestNextGuess[i] = fillGuessTemplateWithThisColor;
      }
    }

    // check if we've already used that guess before in a prior round
    if (previousGuesses.has(`${bestNextGuess}`)) {
      templates = templates.filter(template => !checkIfArraysMatch(template, randomTemplate));
    } else {
      break;
    }
  }

  return [bestNextGuess, colorUsedToFillTemplate, addToColorsTriedThusFar];
};

export {
  generateNextGuess
};