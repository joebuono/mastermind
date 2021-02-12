import React, { Component } from 'react';
import styles from '../styles/board.module.css';
import Colors from './Colors.jsx';
import SecretCode from './SecretCode.jsx';
import Turns from './Turns.jsx';
import MakeCode from './MakeCode.jsx';
import ColorTracker from '../colorTracker/ColorTracker.jsx';
import getComputerGuessAndState from '../../frontendLogic/getComputerGuessAndState.js';
import submitGuess from '../../frontendLogic/submitGuess.js';

// Solver algorithm functions (do we need to use require, or can we use import syntax?)
const { initializeGame } = require('../../solverAlgorithm/globalLogic');

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
      role: 1, // alterating between who plays code-maker and code-breaker

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

  submitPlayerGuess = () => {
    const currentGuess = this.getCurrentGuess();
    if (currentGuess.includes('x')) {
      console.log('incomplete guess');
      return;
    };

    console.log('clicked submit player guess');
    const stateCopy = Object.assign({}, this.state);
    stateCopy.bestNextGuess = currentGuess;
    // refactor this functionality later
    stateCopy.colorsTriedThusFar = [];
    for (let color of currentGuess) {
      if (!stateCopy.colorsTriedThusFar.includes(color)) {
        stateCopy.colorsTriedThusFar.push(color);
      }
    }
    stateCopy.colorOrColorsUsedToFillTemplate = Array.from(new Set(stateCopy.bestNextGuess));
    stateCopy.templates = [['x', 'x', 'x', 'x']];
    
    const s = submitGuess(stateCopy);

    // What state do we want back?
    this.setState({
      turns: s.turns,
      priorRounds: s.priorRounds,
      templates: s.templates,
      colorTracker: s.colorTracker
    }, this.checkWinCondition);
  }

  updateCurrentGuess = (colorToAddToGuess) => {
    // debugger;
    if (this.state.winCondition !== null) return;

    console.log('clicked color:', colorToAddToGuess);
    let currentGuess = [...this.getCurrentGuess()];

    // add color to guess
    for (let i = 0; i < currentGuess.length; i++) {
      if (currentGuess[i] === 'x') {
        currentGuess[i] = colorToAddToGuess;
        break;
      }
    }

    // update turns with current guess
    let copyOfTurns = [...this.state.turns];
    copyOfTurns[this.state.currentRound - 1].guess = currentGuess;
    this.setState({
      turns: copyOfTurns
    });
  }

  // This needs to only work for the current guess
  removeColorFromGuess = (colorIndex) => () => {
    // remove color from current guess
    let currentGuess = this.getCurrentGuess();
    currentGuess[colorIndex] = 'x';
    // update turns with current guess
    let copyOfTurns = [...this.state.turns];
    copyOfTurns[this.state.currentRound - 1].guess = currentGuess;
    this.setState({
      turns: copyOfTurns
    });
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

  // I really have to think about how to generalize this functionality for both computer and human guesses
  submitComputerGuess = () => {
    console.log('clicked submit computer guess');

    const s = submitGuess(this.state);

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
    // if (this.state.humanPlayerTurn) debugger;
    console.log('STATE inside getNextComputerGuess:', this.state);
    if (!this.state.templates) {
      console.log('templates are undefined');
      console.log('templates:', this.state.templates);
    }
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

  // Is this still necessary?
  nextRound = () => {
    this.props.goToNextRound();
  }

  startNewRound = () => {
    console.log('inside startNewRound');
    // we don't need the secretCode to be automatically generated
    // that's only for testing purposes
    const { codeSize, humanPlayerTurn } = this.state;
    let [colorOptions, colorTracker, secretCode] = initializeGame(codeSize);
 
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

    let newSecretCode = humanPlayerTurn ? secretCode : this.state.secretCode;

    this.setState({
      secretCode: newSecretCode,
      colorOptions,
      colorTracker,
      turns: initializedEmptyTurns,
      templates: initialTemplate,
      bestNextGuess: [],
      colorsTriedThusFar: [],
      previousGuesses: new Set(),
      priorRounds: {}, // is this really necessary, or can we write a function that converts this.state.turns into the object we need?
      colorOrColorsUsedToFillTemplate: [],
      currentRound: 1, // change to currentTurn
      winCondition: null
    }, this.getNextComputerGuess);
  }

  switchRoles = () => {
    console.log('inside switchRoles');
    // debugger;
    // toggle who is playing: human or computer
    // also keep track of round in state so that we can increment round every two roles
    if (this.state.role) {
      this.setState({
        humanPlayerTurn: !this.state.humanPlayerTurn,
        role: 0
      }, this.startNewRound);
    } else {
      // increment round in gameview
      console.log('Round Over! (from switchRoles)');
    }
  }

  componentDidMount = () => {
    this.startNewRound();
  }

  render() {
    const { colorOptions, secretCode, turns, codeSize, winCondition, currentRound, displayColorTracker, colorTracker, bestNextGuess, humanPlayerTurn, totalRounds } = this.state;

    return (
      <div className={styles.container}>
        {displayColorTracker && <div className={styles.colorTracker}><ColorTracker colorTrackerData={colorTracker} codeSize={codeSize} bestNextGuess={bestNextGuess} /></div>}

        <div className={displayColorTracker ? styles.boardRight : styles.boardCenter} >
          {!humanPlayerTurn && !secretCode.length ? <MakeCode setSecretCode={this.setSecretCode} codeSize={codeSize} colorOptions={colorOptions} /> 
          :         
          <div className={styles.boardContainer}>
            <div className={styles.secretCode}>
              <SecretCode secretCode={secretCode} currentTurn={winCondition === null ? currentRound : currentRound - 1} />
            </div>
            <div className={styles.turns}>
              {/* There has to be a better way of doing this other than default to an anonymous function, right? */}
              <Turns turns={turns} codeSize={codeSize} turnIndex={totalRounds - currentRound} submitPlayerGuess={humanPlayerTurn ? this.submitPlayerGuess : () => {}} removeColorFromGuess={humanPlayerTurn ? this.removeColorFromGuess : () => {}} />
            </div>
            <div className={styles.colors}>
              <Colors colors={colorOptions} updateCurrentGuess={humanPlayerTurn ? this.updateCurrentGuess : () => {}} />
            </div>
            {!humanPlayerTurn && winCondition === null && <button onClick={this.submitComputerGuess}>Next Computer Guess</button>}
            {winCondition && <h1>{humanPlayerTurn ? 'You win!' : 'The computer wins'}</h1>}
            {winCondition === false && <h1>{humanPlayerTurn ? 'You lose' : 'The computer loses!'}</h1>}
            {winCondition !== null && <button onClick={this.switchRoles}>Click to switch roles</button>}
          </div>}
        </div>
      </div>
    );
  }
}

export default Board;