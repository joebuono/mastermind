import React, { useState } from 'react';
import SetupOptions from './SetupOptions.jsx';
import styles from './styles/initGame.module.css';

const codeSizeOptions = [4, 5];
const roundsOptions = [1, 3, 5];
const attemptsOptions = [6, 8, 10];
const difficultyOptions = ['Naive', 'Optimal'];


const InitGame = ({initializeGame}) => {
  const [codeSize, setCodeSize] = useState(4);
  const [rounds, setRounds] = useState(3);
  const [attempts, setAttempts] = useState(10);
  const [difficulty, setDifficulty] = useState('Naive');

  return (
    <div>
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
        <div className={styles.center} onClick={() => initializeGame(codeSize, rounds, attempts, difficulty)}>Start Game</div>
      </div>
    </div>
  );
};

export default InitGame;