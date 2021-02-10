import React, { Component } from 'react';
import PlayerBoard from './board/PlayerBoard.jsx';
import ComputerBoard from './board/ComputerBoard.jsx';
import ColorTracker from './colorTracker/ColorTracker.jsx';
import styles from './styles/gameView.module.css';

// This will also keep track of and display score info, current round, etc

class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      humanPlayerTurn: true,
      displayColorTracker: false,
      colorTrackerData: {},
      playerScore: 0,
      computerScore: 0,
      codeSize: 4
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
    let whoScored = codeBreaker === 'player' ? 'computerScore' : 'playerScore';
    this.setState({
      [whoScored]: this.state[whoScored] + pointsScoredInRound
    });
  }

  render() {
    const { humanPlayerTurn, displayColorTracker, colorTrackerData, playerScore, computerScore, codeSize } = this.state;

    return (
      <div className={styles.container}>
        <div>
          Player Points: {playerScore} Computer Points: {computerScore}
        </div>
        {displayColorTracker && <div className={styles.colorTracker}><ColorTracker colorTrackerData={colorTrackerData} codeSize={codeSize} /></div>}
        <div className={displayColorTracker ? styles.boardRight : styles.boardCenter}>{humanPlayerTurn ? 
        <PlayerBoard goToNextRound={this.goToNextRound} updateScore={this.updateScore} codeSize={codeSize} /> 
        : 
        <ComputerBoard goToNextRound={this.goToNextRound} modifyDisplayedColorTracker={this.modifyDisplayedColorTracker} updateScore={this.updateScore} codeSize={codeSize} />}</div>
      </div>
    );
  }
}

export default GameView;