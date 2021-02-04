import React, { Component } from 'react';
import Board from './board/Board.jsx';
import ComputerBoard from './board/ComputerBoard.jsx';
import styles from './styles/gameView.module.css';
import ColorTracker from './colorTracker/ColorTracker.jsx';

// This can also keep track of and display score info and current round

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
        <div className={boardStyle}>{humanPlayerTurn ? <Board /> : <ComputerBoard />}</div>
      </div>
    );
  }
}

export default GameView;