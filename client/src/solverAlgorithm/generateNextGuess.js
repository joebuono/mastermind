const { checkIfArraysMatch } = require('./filterPermutations');
const g = require('./guessHelperFunctions');


// ****************** Break this down further into even more helper functions ****************** //

// Required functions: checkIfArraysMatch, checkForKnownNumberOfAnyColor, pickNewColorToIntroduce, leastAmountKnown
// filterTemplatesForLeastNumberOfUniqueColors, filterTemplatesForLeastNumberOfWildcards
// Required data: templates, COLOR_TRACKER, COLORS_TRIED_THUS_FAR, CODE_SIZE
exports.generateNextGuess = (globalTemplates, COLOR_TRACKER, COLORS_TRIED_THUS_FAR, CODE_SIZE, previousGuesses, difficulty = 'hard') => {
  //  debugger;
  
  // Make local copy of templates
  let templates = [...globalTemplates];
  // if (!templates || !templates.length) {
  //   console.log('weird template error');
  //   return;
  // }



  // This short-circuits a lot of pain and heartache lol
  // I'll have to refactor some of the helper functions that pick new colors to introduce
  // Those functions got pretty hairy as a result of trying to solve this bug

  // TEST THE DIFFICULLY LEVELS HERE
  // if (templates.length < X) /// X can be any number, or maybe we always check if any of the templates are completely filled
  // if (templates.length < 5 && difficulty !== 'easy') {

  // Considering adding this filter so that the algorithm doesn't suggest guesses that we've already made
  // && !previousGuesses.has(`${template}`)
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

      // let numOfEachColor = {};
      // for (let color of template) {
      //   numOfEachColor[color] = ++numOfEachColor[color] || 1;
      // }

      // let correctNumber = true;
      // for (let color of template) {
      //   if (numOfEachColor[color] > COLOR_TRACKER[color].number[0]) {
      //     correctNumber = false;
      //     break;
      //   }
      // }

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
  // }

  // console.log('Copy of global templates:', templates);

  // *********************** REVISE THIS PART ***********************
  // Basically, if you're playing a game of codeSize 5 and you have four x's in your template, 
  // shift your strategy as if you're playing a game of 4
  // For example, say your single template is ['x', 'x', 'x', 'x', 'y'];
  // Your next guess should be something like ['r', 'r', 'r', 'b', 'y'];
  // So basically you're counting the number of x's
  // If there are 4 x's, fill in the template (don't create a new template!) with two new colors

  // check if template is all 'x's
  // checkIfArraysMatch(templates[0], new Array(CODE_SIZE).fill('x'))


  
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
  // Removed this condition in pursuit of optimization!
  // && numberOfWildCards >= 3
  if (templates.length === 1 && fillCondition) {
    // fill it with the first two unused colors, 3 and 1 (or 3 and 2 if a 5-code game)
    // OPTIMIZE THROUGH RANDOMIZATION: Of the unused colors, randomly select two of them

    // if (!templates[0].includes('x')) {
    //   debugger;
    //   return [templates[0], [], []];
    // }

    // check if we already have complete knowledge about any of the colors
    // for (let color in COLOR_TRACKER) {
    //   if (COLOR_TRACKER[color].number.length === 1 && COLOR_TRACKER[color].number[0] > 0) {
    //     for (let position of COLOR_TRACKER[color].position) {
    //       bestNextGuess[position - 1] = color;
    //     }
    //   }
    // }

    // if (!bestNextGuess.includes('x')) {
    //   return [bestNextGuess, [], []];
    // }

    // let numberOfWildcards = 0;
    // for (let color of bestNextGuess) {
    //   if (color === 'x') {
    //     numberOfWildcards++;
    //   }
    // }

    // let numColorsToIntroduce = numberOfWildcards === 1 ? 1 : 2;

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

    // OPTIMIZATION
    // let bestNextGuess = numberOfWildCards === 1 ? new Array(CODE_SIZE).fill('x') : [...templates[0]];
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

    // let bestNextGuess = new Array(3).fill(colorsUsedToFillTemplate[0]);
    // // to account for both 4 and 5 code games
    // while (bestNextGuess.length < CODE_SIZE) {
    //   bestNextGuess.push(colorsUsedToFillTemplate[1]);
    // }

    // perhaps an unnecessary reassignment, just for clarity
    let addToColorsTriedThusFar = colorsUsedToFillTemplate;

    if (bestNextGuess.includes(undefined)) {
      debugger;
    }

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
    // introduce new color
    // I think that this is the sticking point for Green
    // OPTIMIZE THROUGH RANDOMIZATION: Of the unused colors, randomly select one of them
    fillGuessTemplateWithThisColor = g.pickNewColorToIntroduce(COLOR_TRACKER, COLORS_TRIED_THUS_FAR) || g.leastAmountKnown(COLOR_TRACKER, COLORS_TRIED_THUS_FAR);
    if (!fillGuessTemplateWithThisColor) debugger;
    // !!! WARNING !!! This function is modifying the outside world. Avoid side effects
    // COLORS_TRIED_THUS_FAR.push(fillGuessTemplateWithThisColor);
    addToColorsTriedThusFar.push(fillGuessTemplateWithThisColor);
  } else {
    // of the COLORS_TRIED_THUS_FAR, identify the one we know the least about
    // Edge case: What if there's a tie?
    fillGuessTemplateWithThisColor = g.leastAmountKnown(COLOR_TRACKER, COLORS_TRIED_THUS_FAR);
  }

  let colorUsedToFillTemplate = [fillGuessTemplateWithThisColor];

  let bestNextGuess = [];

  while (true) {

    // filter templates
  //   console.log(colorWeKnowTheLeastAbout);

    // I'm not sure exactly which order we should do the next steps in
    // Filter for number of unique colors


    // Let's experiment with first filtering for least number of wildcards
    // Then filter for unique colors? Try it. 
    // Initially, this appears to fix the problem!

    let bestTemplates = [...templates];

    // console.log('Copy of best templates:', bestTemplates);

    if (difficulty !== 'easy') {
      let templatesWithAtLeastOneWildcard = g.filterForTemplatesWithAtLeastOneWildcard(bestTemplates);
      // console.log('Templates with at least one wildcard, or all templates with ZERO wildcards:', templatesWithAtLeastOneWildcard);
  
      // console.log('Templates with at least one wildcard OR ZERO wildcards:', templatesWithAtLeastOneWildcard);
      let templatesWithLeastNumberofWildcards = g.filterTemplatesForLeastNumberOfWildcards(templatesWithAtLeastOneWildcard);
  
      // console.log('Templates with least number of wilcards:', templatesWithLeastNumberofWildcards);
      bestTemplates = g.filterTemplatesForLeastNumberOfUniqueColors(templatesWithLeastNumberofWildcards);
      // console.log('Best templates (filtered again by filterTemplatesForLeastNumberOfUniqueColors', bestTemplates);
    }
    
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
    if (!randomTemplate || !randomTemplate.length) {
      debugger;
    }
    // Make copy to avoid passing by reference
    bestNextGuess = [...randomTemplate];

    if (difficulty !== 'easy') {
      let numberOfWildCards = 0;
      for (let color of bestNextGuess) {
        if (color === 'x') numberOfWildCards++;
      }
      if (numberOfWildCards > 2) {
        return exports.generateNextGuess([bestNextGuess], COLOR_TRACKER, COLORS_TRIED_THUS_FAR, CODE_SIZE, previousGuesses)
      }
    }
    
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

  if (bestNextGuess.includes(undefined)) {
    debugger;
  }

  // console.log('Best next guess:', bestNextGuess);
  // addToColorsTriedThusFar may be an empty array, and that's okay
  return [bestNextGuess, colorUsedToFillTemplate, addToColorsTriedThusFar];
};
