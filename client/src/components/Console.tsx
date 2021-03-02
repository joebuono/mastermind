import React, { MouseEventHandler, useState } from 'react';
import styles from './styles/console.module.css';
import ScoreIncrement from './ScoreIncrement';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

type Props = {
  gameViewState: any,
  whoseTurn: boolean,
  role: number,
  currentRound: number,
  roundOver: boolean,
  displayColorTracker: boolean,
  toggleColorTracker: MouseEventHandler,
  submitComputerGuess: MouseEventHandler, 
  switchRoles: MouseEventHandler,
  restartGame: MouseEventHandler
}

export default function Console({gameViewState, whoseTurn, role, currentRound, roundOver, displayColorTracker, toggleColorTracker, submitComputerGuess, switchRoles, restartGame}: Props) {
  const { round, roundLimit, playerScore, computerScore, playerName, turnsPerRound } = gameViewState;
  const [options, toggleOptions] = useState(false);
  const [visible, setVisible] = useState(false);

  const videoPlayer: any = React.createRef();
  const handleVideoClose = () => {
    var iframeSrc = videoPlayer.current.src;
		videoPlayer.current.src = iframeSrc;
  }

  const gameOver = round === roundLimit && role === 0 && roundOver;
  const pointsScored = currentRound <= turnsPerRound ? currentRound - 1 : currentRound;

  let winner;
  if (gameOver) {
    if (playerScore > computerScore) {
      winner = `${playerName} win!`;
    } else if (computerScore > playerScore) {
      winner = 'The computer wins';
    } else {
      winner = 'It\'s a tie';
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.round}>Round {round} of {roundLimit}</div>
      <div className={styles.scores}>
        <div className={styles.score}>{roundOver && !whoseTurn ? <ScoreIncrement previousScore={playerScore - (currentRound - 1)} updatedScore={playerScore}/> : playerScore}</div>
        <div className={styles.score}>{roundOver && whoseTurn ? <ScoreIncrement previousScore={computerScore - (currentRound - 1)} updatedScore={computerScore}/> : computerScore}</div>
      </div>
      <div className={styles.names}>
        <div className={`${styles.name} ${whoseTurn && styles.codebreaker}`}>{playerName}</div>
        <div className={`${styles.name} ${!whoseTurn && styles.codebreaker}`}>Computer</div>
      </div>
      {(!whoseTurn && !roundOver) && <div className={`${styles.nextComputerGuess} ${currentRound === 1 && styles.glowing}`} onClick={submitComputerGuess}>Next Computer Guess</div>}
      {(roundOver && !gameOver) && 
      <div>
        <div className={styles.whoScored}>{whoseTurn ? 'The computer': playerName} scored <br></br>{pointsScored} points</div>
        <div className={`${styles.switchRoles} ${styles.glowing}`} onClick={switchRoles}>Switch Turns</div>
      </div>}
      {gameOver && 
      <div className={styles.gameOver} onClick={restartGame}>
        <div>Game Over</div>
        <div>{winner}</div>
        <div className={styles.playAgain}>Play again?</div>
      </div>}
      <div className={`${styles.toggleOptions} ${options && styles.underline}`} onClick={() => toggleOptions(!options)}>{options ? 'Hide options' : 'Options'}</div>
      {options &&
      <div className={styles.options}>
        <div className={styles.option} onClick={toggleColorTracker}>{displayColorTracker ? 'Hide' : 'Show'} Color Tracker</div>
        <div className={styles.option} onClick={restartGame}>Restart Game</div>
        <div className={styles.option} onClick={() => setVisible(true)}>Tutorial</div>
        <Rodal visible={visible} onClose={() => {handleVideoClose(); setVisible(false)}} customStyles={{ height: '75%', width: '75%'}}>
          <iframe ref={videoPlayer} title="Tutorial" width="100%" height="100%" src="https://www.youtube.com/embed/jD2qdPCD_eo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Rodal>
      </div>}
    </div>
  );
};