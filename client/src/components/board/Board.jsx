import React, { Component } from 'react';
import styles from '../styles/board.module.css';
import Colors from './Colors.jsx';
import SecretCode from './SecretCode.jsx';
import Turns from './Turns.jsx';
import MakeCode from './MakeCode.jsx';

// Solver algorithm functions (do we need to use require, or can we use import syntax?)
const { initializeGame } = require('../../solverAlgorithm/globalLogic');
const { getNextComputerGuess } = require('../../frontendLogic/getNextComputerGuess');

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // game state (shared by player and computer)
      humanPlayerTurn: true,
      displayColorTracker: true, // toggle-able
      secretCode: [],
      colorOptions: [], // 'n', 'w' for codeSize 5
      turns: [],
      currentRound: 1, // change to currentTurn
      totalRounds: 10, // change to totalTurns
      codeSize: this.props.codeSize, 
      winCondition: null,

      // computer state needed for calculating bestNextGuess and updating colorTracker
      bestNextGuess,
      colorTracker: {},
      templates: [],
      colorsTriedThusFar: [],
      previousGuesses: new Set(),
      priorRounds: {}, // is this really necessary, or can we write a function that converts this.state.turns into the object we need?
      colorOrColorsUsedToFillTemplate: []
    };
  }

  submitGuess = () => {
    // if humanPlayerTurn === true

    // else (if computer's turn)

  }

  submitPlayerGuess = () => {

  }

  submitComputerGuess = () => {

  }
  

  // this method is too big
  // separate it out into smaller functions
  getNextComputerGuess = () => {
    if (this.state.winCondition !== null) return;
    const { templates, colorTracker, colorsTriedThusFar, codeSize, previousGuesses, secretCode, priorRounds, currentRound } = this.state;



    this.setState({
      currentGuess: bestNextGuess,
      colorOrColorsUsedToFillTemplate: fillTempateColorOrColors,
      colorsTriedThusFar: updatedColorsTriedThusFar,
      templates: [...possibleSolutions],
      colorTracker: updatedColorTracker,
      priorRounds: clonedPriorRounds,
      turns: updatedTurns,
      currentRound: nextRound,
      winCondition: updatedWinCondition
    });
  }

  checkWinCondition(blackPegs, nextRound) {
    let updatedWinCondition = null;
    if (blackPegs === this.state.codeSize) {
      updatedWinCondition = true;
      this.props.updateScore('computer', this.state.currentRound);
    }
    if (nextRound > this.state.totalRounds) {
      updatedWinCondition = false;
      this.props.updateScore('computer', this.state.currentRound + 1); // plus one for the bonus
    }
    return updatedWinCondition;
  }

  setSecretCode = (playerSelectedSecretCode) => {
    this.setState({
      secretCode: playerSelectedSecretCode
    });
  }

  nextRound = () => {
    this.props.goToNextRound();
  }

  componentDidMount() {
    // we don't need the secretCode to be automatically generated
    // that's only for testing purposes
    let [colorOptions, colorTracker] = initializeGame(this.state.codeSize);
 
    const initializedEmptyTurns = [];

    const emptyGuess = new Array(this.state.codeSize).fill('x');
    // initialize turns to empty
    for (let i = 0; i < 10; i++) {
      initializedEmptyTurns.push({
        guess: [...emptyGuess],
        bwPegs: [0, 0]
      });
    }

    const initialTemplate = [emptyGuess];

    this.props.modifyDisplayedColorTracker(colorTracker);

    this.setState({
      colorOptions,
      colorTracker,
      turns: initializedEmptyTurns,
      templates: initialTemplate
    });
  }

  render() {
    const { colorOptions, secretCode, turns, codeSize, winCondition, currentRound } = this.state;

    return (
      <div>
        {!secretCode.length ? <MakeCode setSecretCode={this.setSecretCode} codeSize={codeSize} colorOptions={colorOptions} /> 
        :         
        <div className={styles.boardContainer}>
          <div className={styles.secretCode}>
            <SecretCode secretCode={secretCode} currentTurn={winCondition === null ? currentRound : currentRound - 1} />
          </div>
          <div className={styles.turns}>
            <Turns turns={turns} codeSize={codeSize} />
          </div>
          <div className={styles.colors}>
            <Colors colors={colorOptions} updateCurrentGuess={this.updateCurrentGuess} />
          </div>
          {winCondition === null && <button onClick={this.getNextComputerGuess}>Next Computer Guess</button>}
          {winCondition && <h1>The computer wins!</h1>}
          {winCondition === false && <h1>The computer loses!</h1>}
          {winCondition !== null && <button onClick={this.nextRound}>Click for next round</button>}
        </div>}
      </div>
    );
  }
}

export default Board;