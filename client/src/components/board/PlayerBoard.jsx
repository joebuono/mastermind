import React, { Component } from 'react';
import styles from '../styles/board.module.css';
import Colors from './Colors.jsx';
import SecretCode from './SecretCode.jsx';
import Turns from './Turns.jsx';
import { initializeGame } from '../../solverAlgorithm/globalLogic';
import { getBlackAndWhitePegs } from '../../solverAlgorithm/filterPermutations';

class PlayerBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorOptions: [], // 'n', 'w' for codeSize 5
      secretCode: [],
      turns: [],
      totalRounds: 10, // later on, we'll have to make the board dynamically size according to the number of rounds
      currentRound: 1,
      codeSize: this.props.codeSize, 
      colorTracker: {},
      winCondition: null
    };
    this.updateCurrentGuess = this.updateCurrentGuess.bind(this);
    this.submitGuess = this.submitGuess.bind(this);
  }

  getCurrentGuess() {
    return [...this.state.turns][this.state.currentRound - 1].guess;
  }

  updateCurrentGuess(colorToAddToGuess) {
    if (this.state.winCondition !== null) return;

    console.log('clicked color:', colorToAddToGuess);
    let currentGuess = this.getCurrentGuess();

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

  submitGuess = () => {
    console.log('clicked submit guess');
    if (this.state.winCondition !== null) return;

    let currentGuess = this.getCurrentGuess();
    // check if the guess is completely filled (no x's)
    if (!currentGuess.includes('x')) {
      console.log('checking the guess!');
      const updatedBWPegs = getBlackAndWhitePegs(currentGuess, this.state.secretCode);
      console.log(updatedBWPegs);

      // update current guess with updatedBWPegs
      const copyOfTurns = [...this.state.turns];
      copyOfTurns[this.state.currentRound - 1].bwPegs = updatedBWPegs;

      // check win and lose condition
      const nextRound = this.state.currentRound + 1;

      const updatedWinCondition = this.checkWinCondition(nextRound, updatedBWPegs);

      this.setState({
        turns: copyOfTurns,
        currentRound: nextRound,
        winCondition: updatedWinCondition,
        // colorTracker
      });

    } else {
      console.log('hey get outta here with that incomplete guess!')
    }
    //  let { currentGuess, secretCode, bwPegs, currentRound } = this.state;
    //  let newBWPegs = getBlackAndWhitePegs(currentGuess, secretCode);
    //  console.log(bwPegs);
    //  // check win condition here

    //  let updatedBWPegs = [...bwPegs];
    //  updatedBWPegs[currentRound - 1] = newBWPegs;

        // - setState colorTracker
  }

  checkWinCondition(nextRound, bwPegs) {
    let updatedWinCondition = null;

    // check win condition
    if (bwPegs[0] === this.state.codeSize) {
      console.log('YOU WIN!');
      updatedWinCondition = true;
      this.props.updateScore('player', this.state.currentRound);
    }

    // check lose condition
    if (nextRound > this.state.totalRounds) {
      console.log('You lose. Play again?');
      updatedWinCondition = false;
    }

    return updatedWinCondition;
  }

  nextRound = () => {
    this.props.goToNextRound();
  }

  componentDidMount() {
    let [colorOptions, colorTracker, secretCode] = initializeGame(this.state.codeSize);
 
    const initializedEmptyTurns = [];

    // initialize turns to empty
    const emptyGuess = new Array(this.state.codeSize).fill('x');
    for (let i = 0; i < 10; i++) {
      initializedEmptyTurns.push({
        guess: [...emptyGuess],
        bwPegs: [0, 0]
      });
    }

    this.setState({
      colorOptions,
      secretCode,
      colorTracker,
      turns: initializedEmptyTurns
    });
  }

  render() {
    const { colorOptions, secretCode, turns, codeSize, winCondition, currentRound, totalRounds } = this.state;

    return (
      <div className={styles.boardContainer}>
        <div className={styles.secretCode}>
          <SecretCode secretCode={winCondition === null ? new Array(codeSize).fill('x'): secretCode} />
        </div>
        <div className={styles.turns}>
          <Turns turns={turns} codeSize={codeSize} turnIndex={totalRounds - currentRound}/>
        </div>
        <div className={styles.colors}>
          <Colors colors={colorOptions} updateCurrentGuess={this.updateCurrentGuess} />
        </div>
        {winCondition === null && <button onClick={this.submitGuess}>Submit guess</button>}
        {winCondition && <h1>You Win!</h1>}
        {winCondition === false && <h1>You lose</h1>}
        {winCondition !== null && <button onClick={this.nextRound}>Click for next round</button>}
      </div>
    );
  }
}

export default PlayerBoard;