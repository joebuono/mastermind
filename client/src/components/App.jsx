import React, { useState } from 'react';
import GameView from './GameView.jsx';
// import {Route, BrowserRouter as Router, Link} from 'react-router-dom';
import styles from './styles/app.module.css';
import Colors from './board/Colors.jsx';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

// This will eventually contain user data, and other pages that the user can navigate between (e.g., tutorial, statistics/ranking, etc)
const App = () => {
  const [nav, setNav] = useState(''); // set to empty string once finished developing/testing
  const [visible, setVisible] = useState(false);
  // React was complaining about a "useless constructor"
  // https://youtu.be/jD2qdPCD_eo

  const videoPlayer = React.createRef();
  const handleVideoClose = () => {
    var iframeSrc = videoPlayer.current.src;
		videoPlayer.current.src = iframeSrc;
  }

  return (
    <div>
      {nav === '' && 
      <div className={styles.container}>
        <div className={`${styles.title} ${styles.fadeIn}`}>Mastermind</div>
        <div className={`${styles.colors} ${styles.fadeIn}`}><Colors colors={['r', 'b', 'g', 'y', 'o', 'p']}></Colors></div>
        <ul className={styles.fadeInSlow}>
          <li onClick={() => setNav('game')}>Play Game</li>
          <li onClick={() => setVisible(true)}>Tutorial <span>5-minute video</span></li>
          <li className={`${styles.algo} ${styles.glowing}`}>Inside the<br></br>Algorithm <span>Recruiters, click here!</span></li>
        </ul>
        <Rodal visible={visible} onClose={() => {handleVideoClose(); setVisible(false)}} customStyles={{ height: '75%', width: '75%'}}>
          <iframe ref={videoPlayer} title="Tutorial" width="100%" height="100%" src="https://www.youtube.com/embed/jD2qdPCD_eo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Rodal>
      </div>
      }
      {nav === 'game' && <GameView />}
    </div>
  );
};

export default App;