import styles from './styles/setupOptions.module.css';

export default function SetupOptions({options, selected, setOption}) {
  return (
    <div className={styles.container}>
      {options.map((option, index) => <div key={index} className={`${option === selected ? styles.selected : styles.option} ${!index && styles.first} ${options.length - 1 === index && styles.last}`} onClick={() => setOption(option)}>{option}</div>)}
    </div>
  );
};