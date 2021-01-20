// Global Logic

const COLORS = ['r', 'b', 'g', 'y', 'o', 'p', 'n', 'w'];
// Red, Blue, Green, Yellow, Orange, Purple, Brown, White

const generateSecretCode = (codeSize) => {
  let secretCode = [];

  for (let i = 0; i < codeSize; i++) {
    secretCode.push(COLORS[Math.floor(Math.random() * codeSize)]);
  }

  return secretCode;
};

const generateColorTracker = (colors) => {
  let colorTracker = {};

  for (let color of colors) {
    colorTracker[color] = {
      number: [0, 1, 2, 3, 4], 
      // yeah, we probably want to update each color every time
      // in other words, we want to track wildcard information as we go (x's do matter)
      position: [1, 2, 3, 4]
    };
  }

  return colorTracker;
};

exports.initializeGame = (codeSize) => {
  const colors = COLORS.slice(0, codeSize * 2 - 2);
  const secretCode = generateSecretCode(codeSize);
  const colorTracker = generateColorTracker(colors);
  return [colors, secretCode, colorTracker];
};

