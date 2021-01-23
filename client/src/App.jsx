import React from 'react';
import Board from './Board.jsx';
import ColorTracker from './ColorTracker.jsx';

function App() {
  return (
    <div className="App">
      Mastermind
      <Board></Board>
      <ColorTracker></ColorTracker>
    </div>
  );
}

export default App;
