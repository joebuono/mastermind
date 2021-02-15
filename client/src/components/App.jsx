import React, { Component } from 'react';
import GameView from './GameView.jsx';
// import Particles from 'react-particles-js';
// import styles from './styles/app.module.css';


// Maybe make a brain filled with these particles! That's the AI
// const particlesOptions = {
//   particles: {
//     number: {
//       value: 50,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     }
//   }
// };

// This will eventually contain user data, and other pages that the user can navigate between (e.g., tutorial, statistics/ranking, etc)
class App extends Component {
  // React was complaining about a "useless constructor"

  render() {
    return (
      <div>
        {/* <Particles className={styles.particles} params={particlesOptions} /> */}
        <GameView />
      </div>
    )
  }
}

export default App;