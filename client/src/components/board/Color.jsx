import styles from '../styles/color.module.css';

export default function Color({color, updateCurrentGuess = () => {}, removeColorFromGuess = () => {}}) {
  const classes = `${styles.circle} ${styles[color]}`;

  return (
    <div className={classes} onClick={() => updateCurrentGuess(color)} onDoubleClick={removeColorFromGuess}></div>
  );
};