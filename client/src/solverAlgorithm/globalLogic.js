// Global Logic

const COLORS = ['r', 'b', 'g', 'y', 'o', 'p', 'n', 'w', 'd', 'k'];
// Red, Blue, Green, Yellow, Orange, Purple, Brown, White, Donald, Knuth

const generateSecretCode = (CODE_SIZE) => {
  let secretCode = [];

  for (let i = 0; i < CODE_SIZE; i++) {
    secretCode.push(COLORS[Math.floor(Math.random() * (CODE_SIZE * 2 - 2))]);
  }

  return secretCode;
};

const generateColorTracker = (colors, CODE_SIZE) => {
  let colorTracker = {};

  for (let color of colors) {
    colorTracker[color] = {
      number: [...Array(CODE_SIZE + 1).keys()],
      // yeah, we probably want to update each color every time
      // in other words, we want to track wildcard information as we go (x's do matter)
      position: [...Array(CODE_SIZE).keys()].map(x => x + 1)
    };
  }

  return colorTracker;
};

const initializeGame = (CODE_SIZE = 4) => {
  const colorOptions = COLORS.slice(0, CODE_SIZE * 2 - 2);
  const colorTracker = generateColorTracker(colorOptions, CODE_SIZE);
  const secretCode = generateSecretCode(CODE_SIZE);
  return [colorOptions, colorTracker, secretCode];
};

export {
  generateSecretCode,
  initializeGame
};
