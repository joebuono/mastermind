import React from 'react';
import Board from './board/Board.jsx';
import ColorTracker from './colorTracker/ColorTracker.jsx';

function App() {
  return (
    <div className="App">
      <ColorTracker></ColorTracker>
      <Board></Board>
    </div>
  );
}

export default App;
