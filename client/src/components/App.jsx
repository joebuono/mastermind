import React, { Component } from 'react';
import Board from './board/Board.jsx';
import ComputerBoard from './board/ComputerBoard.jsx';
import ColorTracker from './colorTracker/ColorTracker.jsx';
import styles from './styles/app.module.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      humanPlayerTurn: false
    };
  }

  render() {
    const { humanPlayerTurn } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.colorTracker}>
          <ColorTracker />
        </div>
        <div className={styles.board}>
          {humanPlayerTurn ? <Board /> : <ComputerBoard />}
        </div>
      </div>
    );
  }
}

export default App;