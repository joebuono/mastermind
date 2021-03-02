import styles from '../styles/color.module.css';

type Props = {
  color: string,
  updateCurrentGuess?: any,
  removeColorFromGuess?: any
}

export default function Color({color, updateCurrentGuess = () => {}, removeColorFromGuess = () => {}}: Props) {
  const classes = `${styles.circle} ${styles[color]}`;

  return (
    <div className={classes} onClick={() => updateCurrentGuess(color)} onDoubleClick={removeColorFromGuess}></div>
  );
};