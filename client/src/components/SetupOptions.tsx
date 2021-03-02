import styles from './styles/setupOptions.module.css';

type Props = {
  options: (string|number)[],
  selected: string | number,
  setOption: any // address this later
}

export default function SetupOptions({options, selected, setOption}: Props) {
  return (
    <div className={styles.container}>
      {options.map((option: string | number, index: number) => <div key={index} className={`${option === selected ? styles.selected : styles.option} ${!index && styles.first} ${options.length - 1 === index && styles.last}`} onClick={() => setOption(option)}>{option}</div>)}
    </div>
  );
};