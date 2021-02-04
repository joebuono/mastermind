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
      colorTrackerData: {}
    };
  }

  render() {
    const { humanPlayerTurn, displayColorTracker, colorTrackerData } = this.state;
    const boardStyle = displayColorTracker ? styles.boardRight : styles.boardCenter;

    return (
      <div className={styles.container}>
        {displayColorTracker && <div className={styles.colorTracker}><ColorTracker colorTrackerData={colorTrackerData}/></div>}
        <div className={boardStyle}>{humanPlayerTurn ? <PlayerBoard /> : <ComputerBoard />}</div>
      </div>
    );
  }
}

export default GameView;