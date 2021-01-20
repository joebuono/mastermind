// Global Logic

const COLORS = ['r', 'b', 'g', 'y', 'o', 'p'];

const generateColorTracker = () => {
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
};

const generateSecretCode = () => {
  let code = [];

  for (let i = 0; i < 4; i++) {
    code.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }

  return code;
};

module.exports = {
  COLORS,
  generateColorTracker,
  generateSecretCode
};
