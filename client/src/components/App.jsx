import React, { useState } from 'react';
import GameView from './GameView.jsx';
// import {Route, BrowserRouter as Router, Link} from 'react-router-dom';
import styles from './styles/app.module.css';
// import Particles from 'react-particles-js';

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
const App = () => {
  const [nav, setNav] = useState(''); // set to empty string once finished developing/testing
  // React was complaining about a "useless constructor"
  return (
    <div>
      {nav === '' && 
      <div className={styles.container}>
        <div className={styles.title}>Mastermind</div>
        <ul>
          <li onClick={() => setNav('game')}>Play Game</li>
          <li>Tutorial</li>
          <li>Inside the<br></br>Algorithm</li>
        </ul>
      </div>
      }
      {nav === 'game' && <GameView />}
      {/* <Particles className={styles.particles} params={particlesOptions} /> */}
    </div>
  );
}

export default App;