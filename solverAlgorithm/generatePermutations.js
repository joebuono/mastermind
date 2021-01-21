
const fillInTemplate = (template, newColors, index = 0) => {
  let permutationsOfTemplate = [];
  for (let i = index; i < template.length; i++) {
    if (i === template.length - 1 && template[i] !== '?') {
      permutationsOfTemplate.push(template);
      break;
    } else if (template[i] === '?') {
        for (let j = 0; j < newColors.length; j++) {
          let templateCopy = [...template];
          templateCopy[i] = newColors[j];
          if (i === templateCopy.length - 1) {
            permutationsOfTemplate.push(templateCopy);
          } else {
            // use .concat() here
            permutationsOfTemplate = [...permutationsOfTemplate, ...fillInTemplate(templateCopy, newColors, i + 1)];
          }
        }
      break; // to omit templates using '?'      
    }
  }
  
  return permutationsOfTemplate;
};

// Separate concerns
const generateAllPermutations = (templates, newColorsIntroduced) => {
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
    // use .concat() instead? could be cleaner
    perms = perms.concat(fillInTemplate(template, newColors));
  }

  return perms;
};

module.exports = {
  fillInTemplate,
  generateAllPermutations
};