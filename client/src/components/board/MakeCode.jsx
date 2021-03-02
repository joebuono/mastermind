import React, { useState } from 'react';
import Colors from './Colors';
import styles from '../styles/makeCode.module.css';
import { generateSecretCode } from '../../solverAlgorithm/globalLogic.js';
import { useSpring, animated } from 'react-spring';

const MakeCode = ({codeSize, colorOptions, setSecretCode}) => {
  const [secretCode, setSecretCodeHook] = useState(new Array(codeSize).fill('x'));
  
  // Fade in animation
  const spring = useSpring({opacity: 1, from: {opacity: 0}});

  const updateSecretCode = (colorToAddToGuess) => {
    const updatedSecretCode = [...secretCode];
    for (let i = 0; i < updatedSecretCode.length; i++) {
      if (updatedSecretCode[i] === 'x') {
        updatedSecretCode[i] = colorToAddToGuess;
        break;
      }
    }

    setSecretCodeHook(updatedSecretCode);
  };

  const removeColorFromGuess = (colorIndex) => () => {
    // remove color from current guess
    const updatedSecretCode = [...secretCode];
    updatedSecretCode[colorIndex] = 'x';
    setSecretCodeHook(updatedSecretCode);
  };

  const submitSecretCode = () => {
    if (!secretCode.includes('x')) {
      // send up secretCode to ComputerBoard component
      setSecretCode(secretCode);
    } else {
      console.log('incomplete code');
    }
  };

  const generateRandomCode = () => {
    const randomCode = generateSecretCode(codeSize);
    setSecretCodeHook(randomCode);
  }

  const mql = window.matchMedia('(max-width: 600px)');
  let mobileView = mql.matches;

  return (
    <animated.div style={spring}>
      <div className={styles.bigContainer}>
        <div className={styles.codemaker}>Codemaker</div>
        <div className={styles.container}>
          <div className={styles.secretCode}>
            <Colors colors={secretCode} removeColorFromGuess={removeColorFromGuess} />
          </div>
          <div className={styles.colorOptions}>
            {!mobileView || colorOptions.length === 6 ? <Colors colors={colorOptions} updateCurrentGuess={updateSecretCode}/> : 
            <div>
            <Colors colors={colorOptions.slice(0, colorOptions.length / 2)} updateCurrentGuess={updateSecretCode}/>
            <Colors colors={colorOptions.slice(colorOptions.length / 2)} updateCurrentGuess={updateSecretCode}/>
            </div>}
          </div>
          <div className={styles.buttons}>
            <div className={secretCode.includes('x') ? styles.incompleteCode : styles.submitCode} onClick={submitSecretCode}>Submit Code</div>
            <div className={styles.randomCode} onClick={generateRandomCode}>Random Code</div>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default MakeCode;