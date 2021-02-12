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
      role: 0, // alterating between who plays code-maker and code-breaker

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

  getCurrentGuess = () => {
    return [...this.state.turns][this.state.currentRound - 1].guess;
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
    console.log('clicked submit computer guess');

    const s = submitComputerGuess(this.state);

    // What state do we want back?
    this.setState({
      turns: s.turns,
      priorRounds: s.priorRounds,
      templates: s.templates,
      colorTracker: s.colorTracker
    }, this.checkWinCondition);
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

  checkWinCondition = () => {
    const { codeSize, currentRound, totalRounds, humanPlayerTurn } = this.state;
    console.log('inside checkWinCondition');
    const blackPegs = [...this.state.turns][this.state.currentRound - 1].bwPegs[0];
    const nextRound = currentRound + 1
    
    // not sure about the conditionals and state yet...
    let updatedWinCondition = null;
    const whoScored = humanPlayerTurn ? 'computer' : 'player';
    let pointsScored = 0;
    if (blackPegs === codeSize) {
      updatedWinCondition = true;
      pointsScored += currentRound;
    } else if (nextRound > totalRounds) {
      updatedWinCondition = false;
      pointsScored += nextRound; // plus one for the bonus
    }

    this.setState({
      currentRound: nextRound,
      winCondition: updatedWinCondition
    }, () => updatedWinCondition === null && this.getNextComputerGuess());
  }

  setSecretCode = (playerSelectedSecretCode) => {
    this.setState({
      secretCode: playerSelectedSecretCode
    }, this.getNextComputerGuess);
  }

  nextRound = () => {
    this.props.goToNextRound();
  }

  startNewRound = () => {
    // we don't need the secretCode to be automatically generated
    // that's only for testing purposes
    const { codeSize, humanPlayerTurn } = this.state;
    let [colorOptions, colorTracker] = initializeGame(codeSize);
 
    const initializedEmptyTurns = [];

    const emptyGuess = new Array(codeSize).fill('x');
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
    }, () => humanPlayerTurn && this.getNextComputerGuess());
  }

  switchRoles = () => {
    // toggle who is playing: human or computer
    // also keep track of round in state so that we can increment round every two roles
  }

  componentDidMount = () => {
    this.startNewRound();
  }

  render() {
    const { colorOptions, secretCode, turns, codeSize, winCondition, currentRound, displayColorTracker, colorTracker, bestNextGuess } = this.state;

    if (winCondition !== null) {
      console.log('HEYYYYY!', this.state);
    }
    // console.log('-------Board State-------', this.state);
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