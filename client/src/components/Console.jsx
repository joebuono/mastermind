import React, { useState } from 'react';
import styles from './styles/console.module.css';
import ScoreIncrement from './ScoreIncrement.jsx';

const Console = ({gameViewState, whoseTurn, role, currentRound, roundOver, displayColorTracker, toggleColorTracker, submitComputerGuess, switchRoles, restartGame}) => {
  const { round, roundLimit, playerScore, computerScore, playerName, turnsPerRound } = gameViewState;
  const [options, toggleOptions] = useState(false);

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
  // next round or switch turns
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
        <div className={styles.toggleColorTracker} onClick={toggleColorTracker}>{displayColorTracker ? 'Hide' : 'Show'} Color Tracker</div>
        <div className={styles.restartGame} onClick={restartGame}>Restart Game</div>
      </div>
      }
    </div>
  );
};

export default Console;