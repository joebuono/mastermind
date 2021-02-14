// Helper functions used in generating the best next guess

// Requires COLOR_TRACKER
const checkForHowManyColorsWeKnowTheNumberOf = (COLOR_TRACKER) => {
  let numberOfKnownColors = 0;
  for (let color in COLOR_TRACKER) {
    if (COLOR_TRACKER[color].number.length === 1) {
      numberOfKnownColors++;
    }
  }
  return numberOfKnownColors;
};

// Requires COLOR_TRACKER and COLORS_TRIED_THUS_FAR
const pickNewColorToIntroduce = (COLOR_TRACKER, COLORS_TRIED_THUS_FAR, numberOfNewColors = 1) => {

  // Before randomization:
  // for (let color in COLOR_TRACKER) {
  //   if (!COLORS_TRIED_THUS_FAR.includes(color)) {
  //     return color;
  //   }
  // }

  // OPTIMIZE THROUGH RANDOMIZATION: Of the unused colors, randomly select two of them
  let unusedColors = [];
  for (let color in COLOR_TRACKER) {
    if (!COLORS_TRIED_THUS_FAR.includes(color)) {
      unusedColors.push(color);
    }
  }

  if (numberOfNewColors === 1) {
    // check if there are no new colors
    // if so, select a color we've already tried that we don't yet have complete data for
    if (!unusedColors.length) {
      for (let color in COLOR_TRACKER) {
        if (COLOR_TRACKER[color].number[0] !== COLOR_TRACKER[color].position.length) {
          unusedColors.push(color);
        }
      }
    }

    // if it's still empty, just pick a random color
    if (!unusedColors.length) {
      let possibleColors = [];
      for (let color in COLOR_TRACKER) {
        if (COLOR_TRACKER[color].number[0] !== 0) {
          possibleColors.push(color);
        }
      }
      unusedColors.push(Math.floor(Math.random() * possibleColors.length));
    }
    if (unusedColors.includes(undefined)) debugger;
    return unusedColors[Math.floor(Math.random() * unusedColors.length)];
  } else {
    // correct undefined error
    if (unusedColors.length < 2 || unusedColors.includes(undefined)) {
      for (let color in COLOR_TRACKER) {
        if (COLOR_TRACKER[color].number.length > 1 || COLOR_TRACKER[color].number[0] !== COLOR_TRACKER[color].position.length) {
          unusedColors.push(color);
        }
      }
    }

    // if it's still empty, just pick a random color
    if (unusedColors.length < 2) {
      for (let color in COLOR_TRACKER) {
        if (COLOR_TRACKER[color].number[0] !== 0 && COLOR_TRACKER[color].number[0] > 1) {
          unusedColors.push(color);
        }
      }
    }

    let twoNewColors = [];
    let randomColor1 = unusedColors[Math.floor(Math.random() * unusedColors.length)];
    twoNewColors.push(randomColor1);
    unusedColors = unusedColors.filter(color => color !== randomColor1);
    let randomColor2 = unusedColors[Math.floor(Math.random() * unusedColors.length)];
    twoNewColors.push(randomColor2);

    if (twoNewColors.includes(undefined)) {
      twoNewColors[1] = twoNewColors[0];
    };
    return twoNewColors;
  }
};

// Requires COLORS_TRIED_THUS_FAR and COLOR_TRACKER
const leastAmountKnown = (COLOR_TRACKER, COLORS_TRIED_THUS_FAR) => {
  let color;
  let amountKnown = 0;
  for (let usedColor of COLORS_TRIED_THUS_FAR) {
    let info = 0;
    // this is a pretty rough way of approximating how much we know thus far about each color
    // a more rigorous way would be to first check if the length of the number array is 1
    // if so, does the length of the position array match the single value in the number array?
    // if so, we have complete information for that color
    // ^^^ YES!!!
    if (COLOR_TRACKER[usedColor]) {
      // check for INCOMPLETE knowledge
      if (COLOR_TRACKER[usedColor].number.length > 1 || COLOR_TRACKER[usedColor].number[0] !== COLOR_TRACKER[usedColor].position.length) {
        info += COLOR_TRACKER[usedColor].number.length;
        info += COLOR_TRACKER[usedColor].position.length;
      }
    }
    if (info > amountKnown) {
      color = usedColor;
      amountKnown = info;
    }
  }

  if (color === undefined) debugger;

  // kludge way around returning undefined
  if (!color) {
    for (let color in COLOR_TRACKER) {
      if (COLOR_TRACKER[color].number[0] > 1) {
        return color;
      }
    }
  }

  return color;
};

// Requires templates
const filterTemplatesForLeastNumberOfUniqueColors = (templates) => {
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
};

// Requires templates
const filterForTemplatesWithAtLeastOneWildcard = (templates) => {
  // I know this is inefficient, but I'm just trying to patch a bug right now

  // check if none of the templates have wildcards
  let noWildcards = true;
  for (let template of templates) {
    for (let color of template) {
      if (color === 'x') {
        noWildcards = false;
        break;
      }
    }
  }

  if (noWildcards) return templates;

  let templatesWithAtLeastOneWildcard = [];
  for (let template of templates) {
    if (template.includes('x')) {
      templatesWithAtLeastOneWildcard.push(template);
    }
  }

  return templatesWithAtLeastOneWildcard;

  
  // Unless ALL the templates have no wildcards!
  // let templatesWithAtLeastOneWildcard = [];
  // let templatesWithNoWildcards = [];

  // for (let template of templates) {
  //   if (template.includes('x')) {
  //     templatesWithAtLeastOneWildcard.push(template);
  //   } else {
  //     templatesWithNoWildcards.push(template);
  //   }
  // }

  // return templatesWithAtLeastOneWildcard.length ? templatesWithAtLeastOneWildcard : templatesWithNoWildcards;
};

// Requires templates
const filterTemplatesForLeastNumberOfWildcards = (templates) => {
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
};

module.exports = {
  checkForHowManyColorsWeKnowTheNumberOf,
  pickNewColorToIntroduce,
  leastAmountKnown,
  filterTemplatesForLeastNumberOfUniqueColors,
  filterForTemplatesWithAtLeastOneWildcard,
  filterTemplatesForLeastNumberOfWildcards
};