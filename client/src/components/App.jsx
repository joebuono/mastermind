import React from 'react';
import Board from './board/Board.jsx';
import ColorTracker from './colorTracker/ColorTracker.jsx';
import styles from './styles/app.module.css';

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.colorTracker}>
        <ColorTracker />
      </div>
      <div className={styles.board}>
        <Board />
      </div>
    </div>
  );
}

export default App;