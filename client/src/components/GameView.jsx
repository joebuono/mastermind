import React, { Component } from 'react';
// import PlayerBoard from './board/PlayerBoard.jsx';
// import ComputerBoard from './board/ComputerBoard.jsx';
// import ColorTracker from './colorTracker/ColorTracker.jsx';
// import styles from './styles/gameView.module.css';
import Board from './board/Board.jsx';
import InitGame from './InitGame.jsx';

// This will also keep track of and display score info, current round, etc


// Buttons for pop-up modal videos on:
// Basic tutorial (maybe strategy too, or how to use suggested next guess)
// *** How I built it *** (in deep technical detail, CAR framework), get a nice microphone for this

class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initGame: true, // set to true once finished developing/testing
      humanStarts: false,
      difficulty: 'hard',
      playerName: 'Player',
      playerScore: 0,
      computerScore: 0,
      codeSize: 4,
      round: 1,
      roundLimit: 3,
      turnsPerRound: 10
    };
    // this.modifyDisplayedColorTracker = this.modifyDisplayedColorTracker.bind(this);
  }

  initializeGame = (codeSize, rounds, attempts, difficulty) => {
    // set state to all the options selected, and set initGame to false
    // Note: difficulty is passed in as Naive or Optimal

    // perhaps randomize (flip a coin, essentially) for who starts
    this.setState({
      codeSize,
      roundLimit: rounds,
      turnsPerRound: attempts,
      difficulty: difficulty === 'Naive' ? 'easy' : 'hard',
      initGame: false
    });
  }

  modifyDisplayedColorTracker = (updatedColorTrackerData) => {
    this.setState({
      colorTrackerData: updatedColorTrackerData
    });
  }

  nextRound = () => {
    this.setState({
      round: this.state.round + 1
    });
  }

  updateScore = (codeBreaker, pointsScoredInRound) => {
    let whoScored = codeBreaker + 'Score';
    this.setState({
      [whoScored]: this.state[whoScored] + pointsScoredInRound
    });
  }

  restartGame = () => {
    this.setState({
      initGame: true,
      playerScore: 0,
      computerScore: 0
    });
  }

  render() {
    const { codeSize, humanStarts, difficulty, turnsPerRound, initGame, roundLimit } = this.state;
    console.log('Rendering from GameView');
    return (
      <div>
        {initGame ? <InitGame initializeGame={this.initializeGame} codeSize={codeSize} rounds={roundLimit} attempts={turnsPerRound} difficulty={difficulty === 'easy' ? 'Naive' : 'Optimal'} /> : 
        <div>
          {/* Figure out a better way to give the Console component access to GameView state than passing a clone of the GameView state */}
          <Board codeSize={codeSize} updateScore={this.updateScore} nextRound={this.nextRound} humanStarts={humanStarts} difficulty={difficulty} turnsPerRound={turnsPerRound} gameViewState={Object.assign({}, this.state)} restartGame={this.restartGame}/>
        </div>
      }
      </div>
    );
  }
}

export default GameView;