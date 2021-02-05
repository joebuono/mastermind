import React, { Component } from 'react';
import GameView from './GameView.jsx';


// This will eventually contain user data, and other pages that the user can navigate between (e.g., tutorial, statistics/ranking, etc)
class App extends Component {
  // React was complaining about a "useless constructor"

  render() {
    return (
      <div>
        <GameView />
      </div>
    )
  }
}

export default App;