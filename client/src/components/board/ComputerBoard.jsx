import React, { Component } from 'react';
import styles from '../styles/board.module.css';
import Colors from './Colors.jsx';
import SecretCode from './SecretCode.jsx';
import Turns from './Turns.jsx';
const { initializeGame } = require('../../solverAlgorithm/globalLogic');
const { generateAllPermutations } = require('../../solverAlgorithm/generatePermutations');
const { getBlackAndWhitePegs, filterForPossibleSolutions } = require('../../solverAlgorithm/filterPermutations');
const { updateColorTracker } = require('../../solverAlgorithm/updateColorTracker');
const { generateNextGuess } = require('../../solverAlgorithm/generateNextGuess');


class ComputerBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorOptions: [], // 'n', 'w' for codeSize 5
      // hard-coded for now, later, implement modal for human player to select secretCode
      secretCode: ['b', 'p', 'p', 'r'],
      turns: [],
      totalRounds: 10, // later on, we'll have to make the board dynamically size according to the number of rounds
      currentRound: 1,
      codeSize: 4, // there has to be a better way to do this
      winCondition: null,
      templates: [],
      colorTracker: {},
      colorsTriedThusFar: [],
      previousGuesses: new Set(),
      currentGuess: [],
      priorRounds: {},
      colorOrColorsUsedToFillTemplate: []
    };
    this.getNextComputerGuess = this.getNextComputerGuess.bind(this);
  }

  getNextComputerGuess() {
    const { templates, colorTracker, colorsTriedThusFar, codeSize, previousGuesses, secretCode, priorRounds, currentRound, colorOptions, totalRounds } = this.state;
    // debugger;
    let [bestNextGuess, fillTempateColorOrColors, addToColorsTriedThusFar] = generateNextGuess(templates, colorTracker, colorsTriedThusFar, codeSize, previousGuesses);
    console.log('bestNextGuess:', bestNextGuess);
    console.log('fillTempateColorOrColors:', fillTempateColorOrColors);
    console.log('addToColorsTriedThusFar:', addToColorsTriedThusFar);
    let clonedPreviousGuess = new Set(previousGuesses);
    clonedPreviousGuess.add(`${bestNextGuess}`);
    let updatedColorsTriedThusFar = [...colorsTriedThusFar].concat(addToColorsTriedThusFar);
    

    let guessResults = getBlackAndWhitePegs(bestNextGuess, secretCode);
    console.log('guess results:', guessResults);

    // Later, check win condition
    let nextRound = currentRound + 1;

    let clonedPriorRounds = Object.assign({}, priorRounds);
    console.log('clonedPriorRounds:', clonedPriorRounds);
    clonedPriorRounds[currentRound] = {
      guess: [...bestNextGuess],
      results: [...guessResults]
    };

    // update turns for display
    // convert priorRounds to array
    const updatedTurns = [];
    for (let round in clonedPriorRounds) {
      updatedTurns.push({
        guess: clonedPriorRounds[round].guess,
        bwPegs: clonedPriorRounds[round].results
      });
    }

    while (updatedTurns.length < totalRounds) {
      updatedTurns.push({
        guess: ['x', 'x', 'x', 'x'],
        bwPegs: [0, 0]
      });
    }

    console.log('---------------UPDATED TURNS---------------:', updatedTurns);

    let allPermutations = generateAllPermutations(templates, fillTempateColorOrColors);
    console.log('all permutations:', allPermutations);

    // CRUCIAL STEP! Use information from prior rounds to filter viable templates. This solved the main problem!!!
    // Filter templates based on ALL PRIOR ROUNDS
    for (let round in clonedPriorRounds) {
      // console.log('previous round:', clonedPriorRounds[round]);
      // console.log('guess:', clonedPriorRounds[round].guess);
      // console.log('results:', clonedPriorRounds[round].results);
      allPermutations = filterForPossibleSolutions(clonedPriorRounds[round].guess, clonedPriorRounds[round].results, allPermutations);
    }

    // possibleSolutions and templates need to be consolidated. Just pick one!
    let possibleSolutions = allPermutations;
    console.log('possible solutions:', possibleSolutions);

    // FILTER OUT PREVIOUS GUESSES
    possibleSolutions = possibleSolutions.filter(solution => !previousGuesses.has(`${solution}`));

    // updateColorTracker
    console.log('----------arguments passed into updateColorTracker-----------');
    console.log('possibleSolutions:', possibleSolutions);
    console.log('colorOptions:', colorOptions);
    console.log('updatedColorsTriedThusFar:', updatedColorsTriedThusFar);
    console.log('colorTracker:', colorTracker);
    let updatedColorTracker = updateColorTracker(possibleSolutions, colorOptions, updatedColorsTriedThusFar, colorTracker);
    console.log(updateColorTracker);

    this.setState({
      currentGuess: bestNextGuess,
      colorOrColorsUsedToFillTemplate: fillTempateColorOrColors,
      colorsTriedThusFar: updatedColorsTriedThusFar,
      templates: [...possibleSolutions],
      colorTracker: updatedColorTracker,
      priorRounds: clonedPriorRounds,
      turns: updatedTurns,
      currentRound: nextRound
    });
  }

  componentDidMount() {
    // we don't need the secretCode to be automatically generated
    // that's only for testing purposes
    let [colorOptions, colorTracker] = initializeGame(this.state.codeSize);
 
    const initializedEmptyTurns = [];

    // initialize turns to empty
    for (let i = 0; i < 10; i++) {
      initializedEmptyTurns.push({
        guess: ['x', 'x', 'x', 'x'], // guess size will need to be dynamic
        bwPegs: [0, 0]
      });
    }

    const initialTemplate = [new Array(this.state.codeSize).fill('x')];

    this.setState({
      colorOptions,
      colorTracker,
      turns: initializedEmptyTurns,
      templates: initialTemplate
    });
  }

  render() {
    console.log(this.state);
    const { colorOptions, secretCode, turns, codeSize, winCondition } = this.state;
    // debugger;
    console.log('inside ComputerBoard rendering turns', turns);
    return (
      <div className={styles.boardContainer}>
        <div className={styles.secretCode}>
          <SecretCode secretCode={secretCode} />
        </div>
        <div className={styles.turns}>
          <Turns turns={turns} codeSize={codeSize} />
        </div>
        <div className={styles.colors}>
          <Colors colors={colorOptions} updateCurrentGuess={this.updateCurrentGuess} />
        </div>
        <button onClick={this.getNextComputerGuess}>Next Computer Guess</button>
        {winCondition && <h1>The computer wins!</h1>}
        {winCondition === false && <h1>The computer loses!</h1>}
      </div>
    );
  }
}

export default ComputerBoard;