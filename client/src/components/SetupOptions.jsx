import React from 'react';
import styles from './styles/setupOptions.module.css';

const SetupOptions = ({options, selected, setOption}) => {
  return (
    <div className={styles.container}>
      {options.map((option, index) => <div key={index} className={`${styles.option} ${option === selected && styles.selected} ${!index && styles.first} ${options.length - 1 === index && styles.last}`} onClick={() => setOption(option)}>{option}</div>)}
    </div>
  );
};

export default SetupOptions;