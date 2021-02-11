import React, { Component } from 'react';
import styles from '../styles/board.module.css';
import Colors from './Colors.jsx';
import SecretCode from './SecretCode.jsx';
import Turns from './Turns.jsx';
import MakeCode from './MakeCode.jsx';
import ColorTracker from '../colorTracker/ColorTracker.jsx';
import getComputerGuessAndState from '../../frontendLogic/getComputerGuessAndState.js';
import submitComputerGuess from '../../frontendLogic/submitComputerGuess.js';

// Solver algorithm functions (do we need to use require, or can we use import syntax?)
const { initializeGame } = require('../../solverAlgorithm/globalLogic');

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // game state (shared by player and computer)
      humanPlayerTurn: false,
      displayColorTracker: true, // toggle-able
      secretCode: [],
      colorOptions: [], // 'n', 'w' for codeSize 5
      turns: [],
      currentRound: 1, // change to currentTurn
      totalRounds: 10, // change to totalTurns
      codeSize: this.props.codeSize, 
      winCondition: null,

      // computer state needed for calculating bestNextGuess and updating colorTracker
      bestNextGuess: [],
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

    // this function will be responsible for:
    // - checking the win condition
    // - incrementing to the next round
    // - updating the score
  }

  submitPlayerGuess = () => {

  }

  submitComputerGuess = () => {
    const { priorRounds } = this.state;
    submitComputerGuess(priorRounds);

    console.log('clicked submit computer guess');

    // this.getNextComputerGuess();
  }

  getNextComputerGuess = () => {
    // if (this.state.winCondition !== null) return;
    // debugger;
    const g = getComputerGuessAndState(this.state);

    this.setState({
      bestNextGuess: g.bestNextGuess,
      previousGuesses: g.previousGuesses,
      colorOrColorsUsedToFillTemplate: g.colorOrColorsUsedToFillTemplate,
      colorsTriedThusFar: g.colorsTriedThusFar
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
    }, () => this.getNextComputerGuess());
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

    this.setState({
      colorOptions,
      colorTracker,
      turns: initializedEmptyTurns,
      templates: initialTemplate
    }, () => this.state.humanPlayerTurn && this.getNextComputerGuess());
  }

  render() {
    const { colorOptions, secretCode, turns, codeSize, winCondition, currentRound, displayColorTracker, colorTracker, bestNextGuess } = this.state;

    console.log('-------Board State-------', this.state);
    return (
      <div className={styles.container}>
        {displayColorTracker && <div className={styles.colorTracker}><ColorTracker colorTrackerData={colorTracker} codeSize={codeSize} bestNextGuess={bestNextGuess} /></div>}

        <div className={displayColorTracker ? styles.boardRight : styles.boardCenter} >
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
            {winCondition === null && <button onClick={this.submitComputerGuess}>Next Computer Guess</button>}
            {winCondition && <h1>The computer wins!</h1>}
            {winCondition === false && <h1>The computer loses!</h1>}
            {winCondition !== null && <button onClick={this.nextRound}>Click for next round</button>}
          </div>}
        </div>
      </div>
    );
  }
}

export default Board;