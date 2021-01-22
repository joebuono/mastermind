const { checkIfArraysMatch } = require('./filterPermutations');
const g = require('./guessHelperFunctions');


// ****************** Break this down further into even more helper functions ****************** //

// Required functions: checkIfArraysMatch, checkForKnownNumberOfAnyColor, pickNewColorToIntroduce, leastAmountKnown
// filterTemplatesForLeastNumberOfUniqueColors, filterTemplatesForLeastNumberOfWildcards
// Required data: templates, COLOR_TRACKER, COLORS_TRIED_THUS_FAR, CODE_SIZE
exports.generateNextGuess = (globalTemplates, COLOR_TRACKER, COLORS_TRIED_THUS_FAR, CODE_SIZE, previousGuesses) => {
   // Make local copy of templates
   let templates = [...globalTemplates];

  // check if template is all 'x's
  if (templates.length === 1 && checkIfArraysMatch(templates[0], new Array(CODE_SIZE).fill('x'))) {
    // fill it with the first two unused colors, 3 and 1 (or 3 and 2 if a 5-code game)
    // OPTIMIZE THROUGH RANDOMIZATION: Of the unused colors, randomly select two of them
    let colorsUsedToFillTemplate = g.pickNewColorToIntroduce(COLOR_TRACKER, COLORS_TRIED_THUS_FAR, 2);
    
    // Before randomization:
    // let colorsForGuess = [];
    // for (let color in COLOR_TRACKER) {
    //   if (!COLORS_TRIED_THUS_FAR.includes(color)) {
    //     colorsForGuess.push(color);
    //     if (colorsForGuess.length === 2) {
    //       break;
    //     }
    //   }
    // }
    
    
    // This is modifying the outside world *************************************
    // Return colorsForGuess at the end of this if condition, when the single template is ['x', 'x', 'x', 'x']
    // for (let color of colorsForGuess) {
    //   COLORS_TRIED_THUS_FAR.push(color);
    // }

    // let colorsUsedToFillTemplate = [];
    // for (let color of colorsForGuess) {
    //   colorsUsedToFillTemplate.push(color);
    // }

    let bestNextGuess = new Array(3).fill(colorsUsedToFillTemplate[0]);
    // to account for both 4 and 5 code games
    while (bestNextGuess.length < CODE_SIZE) {
      bestNextGuess.push(colorsUsedToFillTemplate[1]);
    }

    // perhaps an unnecessary reassignment, just for clarity
    let addToColorsTriedThusFar = colorsUsedToFillTemplate;

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
  // If TOTAL number of known colors is <==> to the number of colors tried thus far (if the difference is less than 1)
  if (COLORS_TRIED_THUS_FAR.length - g.checkForHowManyColorsWeKnowTheNumberOf(COLOR_TRACKER) <= 1) {
    // introduce new color
    // I think that this is the sticking point for Green
    // OPTIMIZE THROUGH RANDOMIZATION: Of the unused colors, randomly select one of them
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
  

  let bestNextGuess = []

  while (true) {

    // filter templates
  //   console.log(colorWeKnowTheLeastAbout);

    // I'm not sure exactly which order we should do the next steps in
    // Filter for number of unique colors


    // Let's experiment with first filtering for least number of wildcards
    // Then filter for unique colors? Try it. 
    // Initially, this appears to fix the problem!

    let templatesWithAtLeastOneWildcard = g.filterForTemplatesWithAtLeastOneWildcard(templates);
    // console.log('Templates with at least one wildcard, or all templates with ZERO wildcards:', templatesWithAtLeastOneWildcard);

    let templatesWithLeastNumberofWildcards = g.filterTemplatesForLeastNumberOfWildcards(templatesWithAtLeastOneWildcard);

    let bestTemplates = g.filterTemplatesForLeastNumberOfUniqueColors(templatesWithLeastNumberofWildcards);
    
    /*
    let templatesWithLeastNumberOfUniqueColors = g.filterTemplatesForLeastNumberOfUniqueColors(templates);
    console.log('Least number of unique colors:', templatesWithLeastNumberOfUniqueColors);

    let templatesWithAtLeastOneWildcard = g.filterForTemplatesWithAtLeastOneWildcard(templatesWithLeastNumberOfUniqueColors);
    console.log('Templates with at least one wildcard, or all templates with ZERO wildcards:', templatesWithAtLeastOneWildcard);

    // Then filter for number of wildcards
    let templatesFilteredByLeastNumberOfUniqueColorsAndWilcards = g.filterTemplatesForLeastNumberOfWildcards(templatesWithAtLeastOneWildcard);
    */
    
    // Shorten the variable name lol
    // let bestTemplates = templatesFilteredByLeastNumberOfUniqueColorsAndWilcards;
    // console.log('Best (viable) templates (least wildcards and unique colors)', bestTemplates);
    
    // Then arbitrarily select one of the remaining filtered templates
    let randomTemplate = bestTemplates.length === 1 ? bestTemplates[0] : bestTemplates[Math.floor(Math.random() * bestTemplates.length)];

    // let randomTemplate = bestTemplates[Math.floor(Math.random() * bestTemplates.length)];
    // console.log('Best template (randomly selected):', randomTemplate);
    
    // Make copy to avoid passing by reference
    bestNextGuess = [...randomTemplate];
    
    // and fill it with the fillGuessTemplateWithThisColor
    for (let i = 0; i < bestNextGuess.length; i++) {
      if (bestNextGuess[i] === 'x') {
        bestNextGuess[i] = fillGuessTemplateWithThisColor;
      }
    }

    // check if we've already used that guess before in a prior round
    if (previousGuesses.has(`${bestNextGuess}`)) {
      // remove that template from this round
      templates = templates.filter(template => !checkIfArraysMatch(template, randomTemplate));
      // loop back around and pick a different template
    } else {
      break;
    }
  }

  // console.log('Best next guess:', bestNextGuess);
  // addToColorsTriedThusFar may be an empty array, and that's okay
  return [bestNextGuess, colorUsedToFillTemplate, addToColorsTriedThusFar];
};
