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
      initGame: false, // set to true once finished developing/testing
      humanStarts: true,
      difficulty: 'hard',
      playerScore: 0,
      computerScore: 0,
      codeSize: 4,
      round: 1,
      roundLimit: 3,
      turnsPerRound: 10,
      gameOver: false
    };
    // this.modifyDisplayedColorTracker = this.modifyDisplayedColorTracker.bind(this);
  }

  initializeGame = (codeSize, rounds, attempts, difficulty) => {
    // set state to all the options selected, and set initGame to false
    // Note: difficulty is passed in as Naive or Optimal
    console.log('inside initializeGame');
    console.log(codeSize, rounds, attempts, difficulty);

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
    const { round, roundLimit } = this.state;
    if (round > roundLimit) {
      this.setState({
        gameOver: true
      });
    } else {
      this.setState({
        round: round + 1
      });
    }
  }

  updateScore = (codeBreaker, pointsScoredInRound) => {
    let whoScored = codeBreaker + 'Score';
    this.setState({
      [whoScored]: this.state[whoScored] + pointsScoredInRound
    });
  }

  render() {
    const { playerScore, computerScore, codeSize, round, humanStarts, difficulty, turnsPerRound, initGame } = this.state;
    console.log('Rendering from GameView');
    return (
      <div>
        {initGame ? <InitGame initializeGame={this.initializeGame} /> : 
        <div>
          <div>
            Player Points: {playerScore} Computer Points: {computerScore} Round: {round}
          </div>
          <Board codeSize={codeSize} updateScore={this.updateScore} nextRound={this.nextRound} humanStarts={humanStarts} difficulty={difficulty} turnsPerRound={turnsPerRound} />
        </div>
      }
      </div>
    );
  }
}

export default GameView;