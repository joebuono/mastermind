

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
const trackPossibleSolution = (possibleSolution) => {
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