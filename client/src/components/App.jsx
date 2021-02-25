import React, { useState } from 'react';
import GameView from './GameView.jsx';
// import {Route, BrowserRouter as Router, Link} from 'react-router-dom';
import styles from './styles/app.module.css';
import Colors from './board/Colors.jsx';

// This will eventually contain user data, and other pages that the user can navigate between (e.g., tutorial, statistics/ranking, etc)
const App = () => {
  const [nav, setNav] = useState(''); // set to empty string once finished developing/testing
  // React was complaining about a "useless constructor"
  return (
    <div>
      {nav === '' && 
      <div className={styles.container}>
        <div className={styles.title}>Mastermind</div>
        <div className={styles.colors}><Colors colors={['r', 'b', 'g', 'y', 'o', 'p']}></Colors></div>
        <ul>
          <li onClick={() => setNav('game')}>Play Game</li>
          <li className={`${styles.tutorial} ${styles.glowing}`}>Tutorial <span>2-minute video</span></li>
          <li>Inside the<br></br>Algorithm <span>3-minute video</span></li>
        </ul>
      </div>
      }
      {nav === 'game' && <GameView />}
    </div>
  );
};

export default App;