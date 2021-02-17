import React from 'react';
import styles from './styles/console.module.css';

const Console = ({gameViewState, whoseTurn, role, roundOver, displayColorTracker, toggleColorTracker, submitComputerGuess, switchRoles, restartGame}) => {
  const { round, roundLimit, playerScore, computerScore, playerName } = gameViewState;

  const gameOver = round === roundLimit && role === 0 && roundOver;

  let winner;
  if (gameOver) {
    if (playerScore > computerScore) {
      winner = `${playerName} wins!`;
    } else if (computerScore > playerScore) {
      winner = 'The computer wins.';
    } else {
      winner = 'It\'s a tie!';
    }
  }
  // next round or switch turns
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
      {(!whoseTurn && !roundOver) && <div className={styles.nextComputerGuess} onClick={submitComputerGuess}>Next Guess</div>}
      {(roundOver && !gameOver) && <div className={styles.switchRoles} onClick={switchRoles}>Switch Turns</div>}
      {gameOver && <div onClick={restartGame}>Game Over! {winner} Play again?</div>}
    </div>
  );
};

export default Console;