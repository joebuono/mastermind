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
const pickNewColorToIntroduce = (COLOR_TRACKER, COLORS_TRIED_THUS_FAR) => {
  for (let color in COLOR_TRACKER) {
    if (!COLORS_TRIED_THUS_FAR.includes(color)) {
      return color;
    }
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
    info += COLOR_TRACKER[usedColor].number.length;
    info += COLOR_TRACKER[usedColor].position.length;
    if (info > amountKnown) {
      color = usedColor;
      amountKnown = info;
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
  // Unless ALL the templates have no wildcards!
  let templatesWithAtLeastOneWildcard = [];
  let templatesWithNoWildcards = [];

  for (let template of templates) {
    let numWildcards = 0;
    for (let color of template) {
      if (color === 'x') {
        numWildcards++;
        break;
      }
    }
    if (numWildcards) {
      templatesWithAtLeastOneWildcard.push(template);
    } else {
      templatesWithNoWildcards.push(template);
    }
  }

  return templatesWithAtLeastOneWildcard.length ? templatesWithAtLeastOneWildcard : templatesWithNoWildcards;
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