
// This is getting the possible colors (numbers and positions) for just ONE possible solution
const trackPossibleSolution = (possibleSolution, COLORS_TRIED_THUS_FAR) => {
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
};


// This function is too big. Break it down into sub-functions
export const updateColorTracker = (possibleSolutions, COLORS, COLORS_TRIED_THUS_FAR, COLOR_TRACKER) => {
  // console.log('Inside updateColorTracker function', COLORS);
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
    let colorData = trackPossibleSolution(possibleSolution, COLORS_TRIED_THUS_FAR);
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
        if (setColorTracker[color] && !setColorTracker[color].number.includes(colorData[color].number)) {
          setColorTracker[color].number.push(colorData[color].number);
        }
        // update position
        for (let position of colorData[color].position) {
          if (setColorTracker[color] && !setColorTracker[color].position.includes(position)) {
            setColorTracker[color].position.push(position);
          }
        }        
      }
    }
  }

  // clone COLOR_TRACKER
  const updatedColorTracker = JSON.parse(JSON.stringify(COLOR_TRACKER));

  // update global color tracker
  for (let color in setColorTracker) {
    // sorting (not really necessary)
    setColorTracker[color].number.sort((a, b) => a - b);
    setColorTracker[color].position.sort((a, b) => a - b);
    updatedColorTracker[color] = setColorTracker[color];
  }

  // should we return the updated color tracker? I don't want the function to have side effects (affect the outside world)
  return updatedColorTracker;
};
