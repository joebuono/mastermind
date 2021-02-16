import React from 'react';
import styles from './styles/console.module.css';

const Console = ({gameViewState, whoseTurn, roundOver, displayColorTracker, toggleColorTracker, submitComputerGuess}) => {
  const { round, roundLimit, playerScore, computerScore, playerName, gameOver } = gameViewState;
  console.log(roundOver, gameOver);

  return (
    <div className={styles.container}>
      <div className={styles.round}>Round {round} of {roundLimit}</div>
      <div className={styles.scores}>
        <div className={styles.score}>{playerScore}</div>
        <div className={styles.score}>{computerScore}</div>
      </div>
      <div className={styles.names}>
        <div className={`${styles.name} ${whoseTurn && styles.codebreaker}`}>{playerName}</div>
        <div className={`${styles.name} ${!whoseTurn && styles.codebreaker}`}>Computer</div>
      </div>
      <div className={styles.toggleColorTracker} onClick={toggleColorTracker}>{displayColorTracker ? 'Hide' : 'Show'} Color Tracker</div>
      {!whoseTurn && <div className={styles.nextComputerGuess} onClick={submitComputerGuess}>Next Guess</div>}
    </div>
  );
};

export default Console;