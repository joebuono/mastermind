const { checkIfArraysMatch } = require('./filterPermutations');
const g = require('./guessHelperFunctions');


// ****************** Break this down further into even more helper functions ****************** //

// Required functions: checkIfArraysMatch, checkForKnownNumberOfAnyColor, pickNewColorToIntroduce, leastAmountKnown
// filterTemplatesForLeastNumberOfUniqueColors, filterTemplatesForLeastNumberOfWildcards
// Required data: templates, COLOR_TRACKER, COLORS_TRIED_THUS_FAR, CODE_SIZE
exports.generateNextGuess = (templates, COLOR_TRACKER, COLORS_TRIED_THUS_FAR, CODE_SIZE) => {
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
    
    // This is modifying the outside world *************************************
    // Return colorsForGuess at the end of this if condition, when the single template is ['x', 'x', 'x', 'x']
    // for (let color of colorsForGuess) {
    //   COLORS_TRIED_THUS_FAR.push(color);
    // }

    let colorsUsedToFillTemplate = [];
    for (let color of colorsForGuess) {
      colorsUsedToFillTemplate.push(color);
    }

    let bestNextGuess = new Array(3).fill(colorsForGuess[0]);
    // to account for both 4 and 5 code games
    while (bestNextGuess.length < CODE_SIZE) {
      bestNextGuess.push(colorsForGuess[1]);
    }

    // perhaps an unnecessary reassignment
    let addToColorsTriedThusFar = colorsForGuess;

    return [bestNextGuess, colorsUsedToFillTemplate, addToColorsTriedThusFar];
  }

  // GIGANTIC "ELSE" BLOCK (when the templates array isn't just ['x', 'x', 'x', 'x']) //

  // ------------------------------------- CRUCIAL POINT!!!! -------------------------------------
  // This is where we decide whether to introduce a new color, 
  // or to gain more information about the color we know the least about
 
  // If we know the exact number of any of the COLORS_TRIED_THUS_FAR, then introduce a new color
  // Else, use the color we know the least about

  let addToColorsTriedThusFar = [];

  let fillGuessTemplateWithThisColor;
  if (g.checkForKnownNumberOfAnyColor(COLOR_TRACKER)) {
    // introduce new color
    fillGuessTemplateWithThisColor = g.pickNewColorToIntroduce(COLOR_TRACKER, COLORS_TRIED_THUS_FAR) || g.leastAmountKnown(COLOR_TRACKER, COLORS_TRIED_THUS_FAR);
    
    // !!! WARNING !!! This function is modifying the outside world. Avoid side effects
    // COLORS_TRIED_THUS_FAR.push(fillGuessTemplateWithThisColor);
    addToColorsTriedThusFar.push(fillGuessTemplateWithThisColor);
  } else {
    // of the COLORS_TRIED_THUS_FAR, identify the one we know the least about
    // Edge case: What if there's a tie?
    fillGuessTemplateWithThisColor = g.leastAmountKnown(COLOR_TRACKER, COLORS_TRIED_THUS_FAR);
  }

  let colorUsedToFillTemplate = [fillGuessTemplateWithThisColor];
  
  // filter templates
//   console.log(colorWeKnowTheLeastAbout);

  // I'm not sure exactly which order we should do the next steps in
  // Filter for number of unique colors

  let templatesWithLeastNumberOfUniqueColors = g.filterTemplatesForLeastNumberOfUniqueColors(templates);
  // console.log('Least number of unique colors:', templatesWithLeastNumberOfUniqueColors);

  let templatesWithAtLeastOneWildcard = g.filterForTemplatesWithAtLeastOneWildcard(templatesWithLeastNumberOfUniqueColors);

  // Then filter for number of wildcards
  let templatesFilteredByLeastNumberOfUniqueColorsAndWilcards = g.filterTemplatesForLeastNumberOfWildcards(templatesWithAtLeastOneWildcard);

  // Shorten the variable name lol
  let bestTemplates = templatesFilteredByLeastNumberOfUniqueColorsAndWilcards;
  console.log('Best (viable) templates (least wildcards and unique colors)', bestTemplates);
  
  // Then arbitrarily select one of the remaining filtered templates
  let randomTemplate = bestTemplates[Math.floor(Math.random() * bestTemplates.length)];
  console.log('Best template (randomly selected):', randomTemplate);
  
  // Make copy to avoid passing by reference
  let bestNextGuess = [...randomTemplate];
  
  // and fill it with the fillGuessTemplateWithThisColor
  for (let i = 0; i < bestNextGuess.length; i++) {
    if (bestNextGuess[i] === 'x') {
      bestNextGuess[i] = fillGuessTemplateWithThisColor;
    }
  }

  console.log('Best next guess:', bestNextGuess);
  return [bestNextGuess, colorUsedToFillTemplate, addToColorsTriedThusFar];
};