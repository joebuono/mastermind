import React, { useState } from 'react';
import SetupOptions from './SetupOptions';
import styles from './styles/initGame.module.css';
import { useSpring, animated } from 'react-spring';

// *** CONSTANTS *** //
const codeSizeOptions = [4, 5];
const roundsOptions = [1, 3, 5];
const attemptsOptions = [6, 8, 10];
const difficultyOptions = ['Naive', 'Optimal'];
const whoStartsOptions = ['Me', 'Computer'];

type Props = {
  codeSize: number,
  rounds: number,
  attempts: number,
  difficulty: string,
  whoStarts: string,
  initializeGame: any
}

const InitGame = (props: Props) => {
  const [codeSize, setCodeSize] = useState(props.codeSize);
  const [rounds, setRounds] = useState(props.rounds);
  const [attempts, setAttempts] = useState(props.attempts);
  const [difficulty, setDifficulty] = useState(props.difficulty);
  const [whoStarts, setWhoStarts] = useState(props.whoStarts);

  const spring = useSpring({opacity: 1, from: {opacity: 0}});

  return (
    <animated.div style={spring}>
      <div className={styles.title}>Game Setup</div>
      <div className={styles.container}>
        <div className={styles.left}>Code Size</div>
        <div className={styles.right}><SetupOptions options={codeSizeOptions} selected={codeSize} setOption={setCodeSize} /></div>
        <div className={styles.left}>Rounds</div>
        <div className={styles.right}><SetupOptions options={roundsOptions} selected={rounds} setOption={setRounds} /></div>
        <div className={styles.left}>Attempts</div>
        <div className={styles.right}><SetupOptions options={attemptsOptions} selected={attempts} setOption={setAttempts} /></div>
        <div className={styles.left}>Algorithm</div>
        <div className={styles.right}><SetupOptions options={difficultyOptions} selected={difficulty} setOption={setDifficulty} /></div>
        <div className={styles.left}>Who starts</div>
        <div className={styles.right}><SetupOptions options={whoStartsOptions} selected={whoStarts} setOption={setWhoStarts} /></div>
        <div className={styles.startGame} onClick={() => props.initializeGame(codeSize, rounds, attempts, difficulty, whoStarts)}>Start Game</div>
      </div>
    </animated.div>
  );
};

export default InitGame;