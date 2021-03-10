import React, { Component } from 'react';
import styles from '../styles/board.module.css';
import Colors from './Colors';
import SecretCode from './SecretCode';
import Turns from './Turns';
import MakeCode from './MakeCode.jsx';
import ColorTracker from '../colorTracker/ColorTracker';
import Console from '../Console.tsx';
import getComputerGuessAndState from '../../frontendLogic/getComputerGuessAndState.js';
import submitGuess from '../../frontendLogic/submitGuess.js';

const { initializeGame } = require('../../solverAlgorithm/globalLogic');

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeSize: this.props.codeSize, 
      difficulty: this.props.difficulty,
      totalRounds: this.props.turnsPerRound,
      humanPlayerTurn: this.props.humanStarts,
      makeSecretCode: !this.props.humanStarts,
      role: 1, // alterating between who plays code-maker and code-breaker
      turns: [],
      secretCode: [],
      colorOptions: [],
      currentRound: 1,
      winCondition: null,
      displayColorTracker: true,
    
      // computer state needed for calculating bestNextGuess and updating colorTracker
      bestNextGuess: [],
      colorTracker: {},
      templates: [],
      colorsTriedThusFar: [],
      previousGuesses: new Set(),
      priorRounds: {},
      colorOrColorsUsedToFillTemplate: []
    };
  }

  submitPlayerGuess = () => {
    const currentGuess = this.getCurrentGuess();

    /* This section is to accomodate for how getNextComputerGuess sets state */
    const stateCopy = Object.assign({}, this.state);
    stateCopy.bestNextGuess = currentGuess;
    stateCopy.colorsTriedThusFar = [];
    stateCopy.previousGuesses = new Set();

    for (let i = 0; i < stateCopy.currentRound; i++) {
      stateCopy.previousGuesses.add(`${stateCopy.turns[i].guess}`);
      for (let color of stateCopy.turns[i].guess) {
        if (!stateCopy.colorsTriedThusFar.includes(color)) {
          stateCopy.colorsTriedThusFar.push(color);
        }
      }
    }

    stateCopy.colorOrColorsUsedToFillTemplate = Array.from(new Set(stateCopy.bestNextGuess));

    const s = submitGuess(stateCopy);

    this.setState({
      turns: s.turns,
      priorRounds: s.priorRounds,
      templates: s.templates,
      colorTracker: s.colorTracker,
      colorsTriedThusFar: stateCopy.colorsTriedThusFar
    }, this.checkWinCondition);
  }

  updateCurrentGuess = (colorToAddToGuess) => {
    if (this.state.winCondition !== null) return;

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

  submitComputerGuess = () => {
    const s = submitGuess(this.state);

    this.setState({
      turns: s.turns,
      priorRounds: s.priorRounds,
      templates: s.templates,
      colorTracker: s.colorTracker
    }, this.checkWinCondition);
  }

  getNextComputerGuess = () => {
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
    const blackPegs = [...this.state.turns][this.state.currentRound - 1].bwPegs[0];
    const nextRound = currentRound + 1
    
    let updatedWinCondition = null;
    const whoScored = humanPlayerTurn ? 'computer' : 'player';
    if (blackPegs === codeSize) {
      updatedWinCondition = true;
      this.props.updateScore(whoScored, currentRound);
    } else if (nextRound > totalRounds) {
      updatedWinCondition = false;
      this.props.updateScore(whoScored, nextRound); // plus one for the bonus
    }

    this.setState({
      currentRound: nextRound,
      winCondition: updatedWinCondition
    }, () => updatedWinCondition === null && this.getNextComputerGuess());
  }

  setSecretCode = (playerSelectedSecretCode) => {
    this.setState({
      secretCode: playerSelectedSecretCode,
      makeSecretCode: false
    }, this.getNextComputerGuess);
  }

  startNewRound = () => {
    const { codeSize, humanPlayerTurn, totalRounds } = this.state;
    let [colorOptions, colorTracker, secretCode] = initializeGame(codeSize);
 
    const initializedEmptyTurns = [];

    const emptyGuess = new Array(codeSize).fill('x');
    // initialize turns to empty
    for (let i = 0; i < totalRounds; i++) {
      initializedEmptyTurns.push({
        guess: [...emptyGuess],
        bwPegs: [0, 0]
      });
    }

    const initialTemplate = [emptyGuess];

    this.setState({
      secretCode,
      colorOptions,
      colorTracker,
      turns: initializedEmptyTurns,
      templates: initialTemplate,
      bestNextGuess: [],
      colorsTriedThusFar: [],
      previousGuesses: new Set(),
      priorRounds: {},
      colorOrColorsUsedToFillTemplate: [],
      currentRound: 1, // change to currentTurn
      winCondition: null
    }, () => humanPlayerTurn && this.getNextComputerGuess());
  }

  switchRoles = () => {
    const toggleCodeBreaker = !this.state.humanPlayerTurn;
    // toggle who is playing: human or computer
    if (this.state.role) {
      this.setState({
        humanPlayerTurn: toggleCodeBreaker,
        makeSecretCode: !toggleCodeBreaker,
        role: 0
      }, this.startNewRound);
    } else {
      // increment round in game view
      this.props.nextRound();
      this.setState({
        humanPlayerTurn: toggleCodeBreaker,
        makeSecretCode: !this.props.humanStarts,
        role: 1
      }, this.startNewRound);
    }
  }

  toggleColorTracker = () => {
    this.setState({
      displayColorTracker: !this.state.displayColorTracker
    });
  }

  componentDidMount = () => {
    this.startNewRound();
  }

  render() {
    const { colorOptions, secretCode, turns, codeSize, winCondition, currentRound, displayColorTracker, colorTracker, bestNextGuess, humanPlayerTurn, totalRounds, makeSecretCode, role } = this.state;
    const mql = window.matchMedia('(max-width: 600px)');
    let mobileView = mql.matches;
    
    return !mobileView ? 
      <div className={styles.container}>
        {(!humanPlayerTurn && makeSecretCode) && <div className={styles.makeCode}><MakeCode setSecretCode={this.setSecretCode} codeSize={codeSize} colorOptions={colorOptions} /></div>}
        {!makeSecretCode && <div className={displayColorTracker ? styles.consoleCenter : styles.consoleLeft}>
          <Console gameViewState={this.props.gameViewState} whoseTurn={humanPlayerTurn} role={role} currentRound={currentRound} roundOver={winCondition !== null} displayColorTracker={displayColorTracker} winCondition={winCondition} toggleColorTracker={this.toggleColorTracker} submitComputerGuess={this.submitComputerGuess} switchRoles={this.switchRoles} restartGame={this.props.restartGame}/>
        </div>}
        {(displayColorTracker && !makeSecretCode) && <div className={styles.colorTracker}><ColorTracker colorTrackerData={colorTracker} codeSize={codeSize} bestNextGuess={bestNextGuess} humanPlayerTurn={humanPlayerTurn} /></div>}  
        <div className={displayColorTracker ? styles.boardRight : styles.boardCenter}>   
          {!makeSecretCode &&
            <div className={`${styles.boardContainer} ${styles.fadeIn}`}>
              <div className={styles.secretCode}>
                <SecretCode secretCode={secretCode} currentTurn={winCondition === null ? currentRound : currentRound - 1} showSecretCode={!humanPlayerTurn || winCondition !== null} />
              </div>
              <div className={styles.turns}>
                <Turns turns={turns} codeSize={codeSize} turnIndex={totalRounds - currentRound} submitPlayerGuess={humanPlayerTurn ? this.submitPlayerGuess : () => {}} removeColorFromGuess={humanPlayerTurn ? this.removeColorFromGuess : () => {}} />
              </div>
              <div className={styles.colorOptions}>
                <Colors colors={colorOptions} updateCurrentGuess={humanPlayerTurn ? this.updateCurrentGuess : () => {}} />
              </div>
            </div>}
        </div>
      </div> 
      : 
    
    <div className={styles.mobileContainer}>
      {(!humanPlayerTurn && makeSecretCode) && <div className={styles.makeCode}><MakeCode setSecretCode={this.setSecretCode} codeSize={codeSize} colorOptions={colorOptions} /></div>}
      <div className={displayColorTracker ? styles.boardRight : styles.boardCenter}>   
        {!makeSecretCode &&
          <div className={`${styles.boardContainerMobile} ${styles.fadeIn}`}>
            <div className={styles.secretCode}>
              <SecretCode secretCode={secretCode} currentTurn={winCondition === null ? currentRound : currentRound - 1} showSecretCode={!humanPlayerTurn || winCondition !== null} />
            </div>
            <div className={styles.turns}>
              <Turns turns={turns} codeSize={codeSize} turnIndex={totalRounds - currentRound} submitPlayerGuess={humanPlayerTurn ? this.submitPlayerGuess : () => {}} removeColorFromGuess={humanPlayerTurn ? this.removeColorFromGuess : () => {}} />
            </div>
            <div className={styles.colorOptions}>
              <Colors colors={colorOptions} updateCurrentGuess={humanPlayerTurn ? this.updateCurrentGuess : () => {}} />
            </div>
          </div>}
      </div>
      {!makeSecretCode && <div className={styles.consoleMobile}>
        <Console gameViewState={this.props.gameViewState} whoseTurn={humanPlayerTurn} role={role} currentRound={currentRound} roundOver={winCondition !== null} displayColorTracker={displayColorTracker} winCondition={winCondition} toggleColorTracker={this.toggleColorTracker} submitComputerGuess={this.submitComputerGuess} switchRoles={this.switchRoles} restartGame={this.props.restartGame}/>
      </div>}
      {(displayColorTracker && !makeSecretCode) && <div className={styles.colorTracker}><ColorTracker colorTrackerData={colorTracker} codeSize={codeSize} bestNextGuess={bestNextGuess} humanPlayerTurn={humanPlayerTurn} /></div>}  
    </div>;
  }
}

export default Board;