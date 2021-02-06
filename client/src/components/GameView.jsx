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
      humanPlayerTurn: false,
      displayColorTracker: true,
      colorTrackerData: {},
      playerScore: 0,
      computerScore: 0
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
    console.log('--------------------- inside Update Score ---------------------');
    let whoScored = codeBreaker === 'player' ? 'computerScore' : 'playerScore';
    console.log('whoScored:', whoScored);
    console.log('pointsScored', pointsScoredInRound);
    this.setState({
      [whoScored]: this.state[whoScored] + pointsScoredInRound
    });
  }

  render() {
    const { humanPlayerTurn, displayColorTracker, colorTrackerData, playerScore, computerScore } = this.state;
    console.log(`Player Points: ${playerScore}`);
    console.log(`Computer Points: ${computerScore}`);
    return (
      <div className={styles.container}>
        <div>
          Player Points: {playerScore} Computer Points: {computerScore}
        </div>
        {displayColorTracker && <div className={styles.colorTracker}><ColorTracker colorTrackerData={colorTrackerData}/></div>}
        <div className={displayColorTracker ? styles.boardRight : styles.boardCenter}>{humanPlayerTurn ? 
        <PlayerBoard goToNextRound={this.goToNextRound} updateScore={this.updateScore} /> 
        : 
        <ComputerBoard goToNextRound={this.goToNextRound} modifyDisplayedColorTracker={this.modifyDisplayedColorTracker} updateScore={this.updateScore} />}</div>
      </div>
    );
  }
}

export default GameView;