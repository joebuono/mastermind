import React, { useState } from 'react';
import GameView from './GameView';
import styles from './styles/app.module.css';
import Colors from './board/Colors';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

const App = () => {
  const [nav, setNav] = useState(''); // set to empty string once finished developing/testing
  const [tutorial, setTutorial] = useState(false);
  const [intro, setIntro] = useState(false);

  const tutorialVideo: any = React.createRef();
  const handleTutorialClose = () => {
    var iframeSrc = tutorialVideo.current.src;
		tutorialVideo.current.src = iframeSrc;
  };

  const introVideo: any = React.createRef();
  const handleIntroClose = () => {
    var iframeSrc = introVideo.current.src;
		introVideo.current.src = iframeSrc;
  };

  return (
    <div>
      {nav === '' && 
      <div className={styles.container}>
        <div className={`${styles.title} ${styles.fadeIn}`}>Mastermind</div>
        <div className={`${styles.colors} ${styles.fadeIn}`}><Colors colors={['r', 'b', 'g', 'y', 'o', 'p']}></Colors></div>
        <ul className={styles.fadeInSlow}>
          <li onClick={() => setNav('game')}>Play Game</li>
          <li onClick={() => setTutorial(true)}>Tutorial <span>5-minute video</span></li>
          <li onClick={() => setIntro(true)} className={`${styles.algo} ${styles.glowing}`}>Inside the<br></br>Algorithm <span>Recruiters, click here!</span></li>
        </ul>
        <Rodal visible={tutorial} onClose={() => {handleTutorialClose(); setTutorial(false)}} customStyles={{ height: '75%', width: '75%'}}>
          <iframe ref={tutorialVideo} title="Tutorial" width="100%" height="100%" src="https://www.youtube.com/embed/jD2qdPCD_eo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Rodal>
        <Rodal visible={intro} onClose={() => {handleIntroClose(); setIntro(false)}} customStyles={{ height: '75%', width: '75%'}}>
          <iframe ref={introVideo} title="Intro" width="100%" height="100%" src="https://www.youtube.com/embed/W-fWm3MUWow" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Rodal>
      </div>}
      {nav === 'game' && <GameView />}
    </div>
  );
};

export default App;