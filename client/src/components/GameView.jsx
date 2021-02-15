import React, { Component } from 'react';
// import PlayerBoard from './board/PlayerBoard.jsx';
// import ComputerBoard from './board/ComputerBoard.jsx';
// import ColorTracker from './colorTracker/ColorTracker.jsx';
// import styles from './styles/gameView.module.css';
import Board from './board/Board.jsx';

// This will also keep track of and display score info, current round, etc


// Buttons for pop-up modal videos on:
// Basic tutorial (maybe strategy too, or how to use suggested next guess)
// *** How I built it *** (in deep technical detail, CAR framework), get a nice microphone for this

class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      humanStarts: true,
      difficulty: 'hard',
      playerScore: 0,
      computerScore: 0,
      codeSize: 5,
      round: 1,
      roundLimit: 3,
      turnsPerRound: 10,
      gameOver: false
    };
    // this.modifyDisplayedColorTracker = this.modifyDisplayedColorTracker.bind(this);
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
    const { playerScore, computerScore, codeSize, round, humanStarts, difficulty, turnsPerRound } = this.state;
    console.log('Rendering from GameView');
    return (
      <div>
        <div>
          Player Points: {playerScore} Computer Points: {computerScore} Round: {round}
        </div>
        {/* {displayColorTracker && <div className={styles.colorTracker}><ColorTracker colorTrackerData={colorTrackerData} codeSize={codeSize} /></div>} */}
        <Board codeSize={codeSize} updateScore={this.updateScore} nextRound={this.nextRound} humanStarts={humanStarts} difficulty={difficulty} turnsPerRound={turnsPerRound} />
        {/* <div className={displayColorTracker ? styles.boardRight : styles.boardCenter}>{humanPlayerTurn ? 
        <PlayerBoard goToNextRound={this.goToNextRound} updateScore={this.updateScore} codeSize={codeSize} /> 
        : 
        <ComputerBoard goToNextRound={this.goToNextRound} modifyDisplayedColorTracker={this.modifyDisplayedColorTracker} updateScore={this.updateScore} codeSize={codeSize} />}</div> */}
      </div>
    );
  }
}

export default GameView;