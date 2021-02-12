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
      humanPlayerTurn: false,
      displayColorTracker: true,
      playerScore: 0,
      computerScore: 0,
      codeSize: 5
    };
    // this.modifyDisplayedColorTracker = this.modifyDisplayedColorTracker.bind(this);
  }

  modifyDisplayedColorTracker = (updatedColorTrackerData) => {
    this.setState({
      colorTrackerData: updatedColorTrackerData
    });
  }

  goToNextRound = () => {
    this.setState({
      humanPlayerTurn: !this.state.humanPlayerTurn,
      displayColorTracker: !this.state.displayColorTracker
    });
  }

  updateScore = (codeBreaker, pointsScoredInRound) => {
    let whoScored = codeBreaker + 'Score';
    this.setState({
      [whoScored]: this.state[whoScored] + pointsScoredInRound
    });
  }

  render() {
    const { playerScore, computerScore, codeSize } = this.state;
    console.log('Rendering from GameView');
    return (
      <div>
        <div>
          Player Points: {playerScore} Computer Points: {computerScore}
        </div>
        {/* {displayColorTracker && <div className={styles.colorTracker}><ColorTracker colorTrackerData={colorTrackerData} codeSize={codeSize} /></div>} */}
        <Board codeSize={codeSize} updateScore={this.updateScore} />
        {/* <div className={displayColorTracker ? styles.boardRight : styles.boardCenter}>{humanPlayerTurn ? 
        <PlayerBoard goToNextRound={this.goToNextRound} updateScore={this.updateScore} codeSize={codeSize} /> 
        : 
        <ComputerBoard goToNextRound={this.goToNextRound} modifyDisplayedColorTracker={this.modifyDisplayedColorTracker} updateScore={this.updateScore} codeSize={codeSize} />}</div> */}
      </div>
    );
  }
}

export default GameView;