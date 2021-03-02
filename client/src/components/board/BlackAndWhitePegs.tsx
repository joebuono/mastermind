import styles from '../styles/blackAndWhitePegs.module.css';

const convert = (pegs: number[], codeSize: number) => {
  let converted = [...new Array(pegs[0]).fill('black'), ...new Array(pegs[1]).fill('white')];
  while (converted.length < codeSize) {
    converted.push('empty');
  }
  return converted;
};

type Props = {
  bwPegs: number[],
  codeSize: number
}

export default function BlackAndWhitePegs({bwPegs, codeSize}: Props) {
  const pegs = convert(bwPegs, codeSize);
  return (
    <div className={styles.grid}>
      <div className={`${styles.upperLeft} ${styles.peg} ${styles[pegs[0]]}`}></div> 
      <div className={`${styles.upperRight} ${styles.peg} ${styles[pegs[1]]}`}></div>
      <div className={`${styles.bottomLeft} ${styles.peg} ${styles[pegs[2]]}`}></div>
      <div className={`${styles.bottomRight} ${styles.peg} ${styles[pegs[3]]}`}></div>
      <div className={`${styles.middle} ${styles.peg} ${codeSize === 5 ? styles[pegs[4]] : ''}`}></div>
    </div>
  );
};